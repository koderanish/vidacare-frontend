const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");

function baseInclude() {
  return {
    user: true,
    doctorAssignments: { where: { status: "ACTIVE" }, include: { doctor: true } },
    caregiverAssignments: { where: { status: "ACTIVE" }, include: { caregiver: true } },
  };
}

async function listPatients(query, scope = {}) {
  const { page, limit, skip } = parsePagination(query);
  const where = { ...scope };
  if (query.q) {
    where.user = { is: { OR: [
      { fullName: { contains: query.q, mode: "insensitive" } },
      { email: { contains: query.q, mode: "insensitive" } },
    ] } };
  }
  if (query.status) where.user = { ...(where.user || {}), is: { ...(where.user?.is || {}), status: query.status } };

  const [items, total] = await Promise.all([
    prisma.patientProfile.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" }, include: baseInclude() }),
    prisma.patientProfile.count({ where }),
  ]);

  return { items, pagination: buildPagination(page, limit, total) };
}

async function getPatientById(id) {
  const patient = await prisma.patientProfile.findUnique({ where: { id }, include: baseInclude() });
  if (!patient) throw ApiError.notFound("Patient not found");
  return patient;
}

async function getPatientByUserId(userId) {
  const patient = await prisma.patientProfile.findUnique({ where: { userId }, include: baseInclude() });
  if (!patient) throw ApiError.notFound("Patient profile not found");
  return patient;
}

async function updatePatientProfile(id, patch) {
  await getPatientById(id);
  return prisma.patientProfile.update({ where: { id }, data: patch });
}

/** Patient IDs a doctor currently has active assignments for. */
async function patientIdsForDoctor(doctorId) {
  const rows = await prisma.patientDoctorAssignment.findMany({
    where: { doctorId, status: "ACTIVE" },
    select: { patientId: true },
  });
  return rows.map((r) => r.patientId);
}

/** Patient IDs a caregiver currently has active assignments for. */
async function patientIdsForCaregiver(caregiverId) {
  const rows = await prisma.patientCaregiverAssignment.findMany({
    where: { caregiverId, status: "ACTIVE" },
    select: { patientId: true },
  });
  return rows.map((r) => r.patientId);
}

module.exports = {
  listPatients,
  getPatientById,
  getPatientByUserId,
  updatePatientProfile,
  patientIdsForDoctor,
  patientIdsForCaregiver,
};
