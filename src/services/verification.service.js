const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");
const { logActivity } = require("./activity.service");
const { sendMail } = require("../utils/mailer");

async function listVerifications(query) {
  const { page, limit, skip } = parsePagination(query);
  const where = {};
  if (query.status) where.status = query.status;
  if (query.role) where.role = query.role;

  const [items, total] = await Promise.all([
    prisma.verificationRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { submittedAt: "desc" },
      include: {
        user: {
          include: { doctorProfile: true, caregiverProfile: true },
        },
      },
    }),
    prisma.verificationRequest.count({ where }),
  ]);

  return { items, pagination: buildPagination(page, limit, total) };
}

async function getVerificationById(id) {
  const record = await prisma.verificationRequest.findUnique({
    where: { id },
    include: { user: { include: { doctorProfile: true, caregiverProfile: true } } },
  });
  if (!record) throw ApiError.notFound("Verification request not found");
  return record;
}

async function approveVerification(id, { notes }, actor) {
  const record = await getVerificationById(id);
  if (record.status !== "PENDING") {
    throw ApiError.badRequest(`This request has already been ${record.status.toLowerCase()}`);
  }

  const updated = await prisma.$transaction(async (tx) => {
    const req = await tx.verificationRequest.update({
      where: { id },
      data: { status: "APPROVED", reviewedById: actor.id, reviewedAt: new Date(), decisionReason: notes },
    });
    await tx.user.update({ where: { id: record.userId }, data: { status: "ACTIVE" } });
    await tx.userStatusChange.create({
      data: {
        userId: record.userId,
        fromStatus: "PENDING",
        toStatus: "ACTIVE",
        reason: notes || "Verification approved",
        changedById: actor.id,
      },
    });
    await tx.notification.create({
      data: {
        recipientUserId: record.userId,
        type: "SYSTEM",
        title: "Your account has been approved",
        body: "An administrator approved your verification request. You now have full access.",
      },
    });
    return req;
  });

  await sendMail({
    to: record.user.email,
    subject: "Your VidaCare account has been approved",
    body: "You can now sign in and access your account.",
  });

  await logActivity({
    actorUserId: actor.id,
    action: "VERIFICATION_APPROVED",
    entityType: "VerificationRequest",
    entityId: id,
    summary: `${record.user.fullName} (${record.role}) was approved`,
  });

  return updated;
}

async function rejectVerification(id, { reason }, actor) {
  const record = await getVerificationById(id);
  if (record.status !== "PENDING") {
    throw ApiError.badRequest(`This request has already been ${record.status.toLowerCase()}`);
  }

  const updated = await prisma.$transaction(async (tx) => {
    const req = await tx.verificationRequest.update({
      where: { id },
      data: { status: "REJECTED", reviewedById: actor.id, reviewedAt: new Date(), decisionReason: reason },
    });
    await tx.user.update({ where: { id: record.userId }, data: { status: "REJECTED" } });
    await tx.userStatusChange.create({
      data: { userId: record.userId, fromStatus: "PENDING", toStatus: "REJECTED", reason, changedById: actor.id },
    });
    await tx.notification.create({
      data: {
        recipientUserId: record.userId,
        type: "SYSTEM",
        title: "Your account application was rejected",
        body: reason,
      },
    });
    return req;
  });

  await sendMail({
    to: record.user.email,
    subject: "Your VidaCare account application status",
    body: `Your application was rejected. Reason: ${reason}`,
  });

  await logActivity({
    actorUserId: actor.id,
    action: "VERIFICATION_REJECTED",
    entityType: "VerificationRequest",
    entityId: id,
    summary: `${record.user.fullName} (${record.role}) was rejected: ${reason}`,
  });

  return updated;
}

module.exports = { listVerifications, getVerificationById, approveVerification, rejectVerification };
