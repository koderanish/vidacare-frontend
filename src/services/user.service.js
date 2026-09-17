const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");
const { logActivity } = require("./activity.service");
const { publicUser } = require("./auth.service");

async function listUsers(query) {
  const { page, limit, skip } = parsePagination(query);
  const where = {};
  if (query.role) where.role = query.role;
  if (query.status) where.status = query.status;
  if (query.q) {
    where.OR = [
      { fullName: { contains: query.q, mode: "insensitive" } },
      { email: { contains: query.q, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { patientProfile: true, doctorProfile: true, caregiverProfile: true },
    }),
    prisma.user.count({ where }),
  ]);

  return { items: items.map(publicUser), pagination: buildPagination(page, limit, total) };
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      patientProfile: {
        include: {
          doctorAssignments: { where: { status: "ACTIVE" }, include: { doctor: true } },
          caregiverAssignments: { where: { status: "ACTIVE" }, include: { caregiver: true } },
        },
      },
      doctorProfile: true,
      caregiverProfile: true,
    },
  });
  if (!user) throw ApiError.notFound("User not found");
  return publicUser(user);
}

async function updateUser(id, patch) {
  const user = await prisma.user.update({ where: { id }, data: patch });
  return publicUser(user);
}

const VALID_TRANSITIONS = {
  PENDING: ["ACTIVE", "REJECTED"],
  ACTIVE: ["SUSPENDED"],
  REJECTED: ["PENDING"],
  SUSPENDED: ["ACTIVE"],
};

async function updateUserStatus(id, { status, reason }, actor) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw ApiError.notFound("User not found");

  if (user.role === "ADMIN") {
    throw ApiError.forbidden("Admin account status cannot be changed through this endpoint");
  }

  const allowed = VALID_TRANSITIONS[user.status] || [];
  if (user.status !== status && !allowed.includes(status)) {
    throw ApiError.badRequest(`Cannot transition account from ${user.status} to ${status}`);
  }

  const updated = await prisma.$transaction(async (tx) => {
    const u = await tx.user.update({ where: { id }, data: { status } });
    await tx.userStatusChange.create({
      data: { userId: id, fromStatus: user.status, toStatus: status, reason, changedById: actor.id },
    });
    await tx.notification.create({
      data: {
        recipientUserId: id,
        type: "SYSTEM",
        title: `Account status updated to ${status}`,
        body: reason || `Your account status was changed to ${status} by an administrator.`,
      },
    });
    return u;
  });

  await logActivity({
    actorUserId: actor.id,
    action: "USER_STATUS_CHANGED",
    entityType: "User",
    entityId: id,
    summary: `${user.fullName}'s status changed from ${user.status} to ${status}`,
  });

  return publicUser(updated);
}

module.exports = { listUsers, getUserById, updateUser, updateUserStatus };
