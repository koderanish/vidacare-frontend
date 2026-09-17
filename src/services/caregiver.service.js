const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");

async function listCaregivers(query) {
  const { page, limit, skip } = parsePagination(query);
  const where = { role: "CAREGIVER" };
  if (query.status) where.status = query.status;
  if (query.q) {
    where.OR = [
      { fullName: { contains: query.q, mode: "insensitive" } },
      { email: { contains: query.q, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.user.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" }, include: { caregiverProfile: true } }),
    prisma.user.count({ where }),
  ]);

  return { items, pagination: buildPagination(page, limit, total) };
}

async function getCaregiverById(id) {
  const caregiver = await prisma.user.findUnique({
    where: { id },
    include: {
      caregiverProfile: true,
      assignedCaregiverFor: { where: { status: "ACTIVE" }, include: { patient: { include: { user: true } } } },
    },
  });
  if (!caregiver || caregiver.role !== "CAREGIVER") throw ApiError.notFound("Caregiver not found");
  return caregiver;
}

async function getMyPatients(caregiverId, query) {
  const { page, limit, skip } = parsePagination(query);
  const [items, total] = await Promise.all([
    prisma.patientCaregiverAssignment.findMany({
      where: { caregiverId, status: "ACTIVE" },
      skip,
      take: limit,
      orderBy: { assignedAt: "desc" },
      include: { patient: { include: { user: true } } },
    }),
    prisma.patientCaregiverAssignment.count({ where: { caregiverId, status: "ACTIVE" } }),
  ]);

  return { items: items.map((a) => a.patient), pagination: buildPagination(page, limit, total) };
}

module.exports = { listCaregivers, getCaregiverById, getMyPatients };
