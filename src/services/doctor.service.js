const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");

async function listDoctors(query) {
  const { page, limit, skip } = parsePagination(query);
  const where = { role: "DOCTOR" };
  if (query.status) where.status = query.status;
  if (query.q) {
    where.OR = [
      { fullName: { contains: query.q, mode: "insensitive" } },
      { email: { contains: query.q, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.user.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" }, include: { doctorProfile: true } }),
    prisma.user.count({ where }),
  ]);

  return { items, pagination: buildPagination(page, limit, total) };
}

async function getDoctorById(id) {
  const doctor = await prisma.user.findUnique({
    where: { id },
    include: {
      doctorProfile: true,
      assignedDoctorFor: { where: { status: "ACTIVE" }, include: { patient: { include: { user: true } } } },
    },
  });
  if (!doctor || doctor.role !== "DOCTOR") throw ApiError.notFound("Doctor not found");
  return doctor;
}

async function getMyPatients(doctorId, query) {
  const { page, limit, skip } = parsePagination(query);
  const [items, total] = await Promise.all([
    prisma.patientDoctorAssignment.findMany({
      where: { doctorId, status: "ACTIVE" },
      skip,
      take: limit,
      orderBy: { assignedAt: "desc" },
      include: { patient: { include: { user: true } } },
    }),
    prisma.patientDoctorAssignment.count({ where: { doctorId, status: "ACTIVE" } }),
  ]);

  return { items: items.map((a) => a.patient), pagination: buildPagination(page, limit, total) };
}

module.exports = { listDoctors, getDoctorById, getMyPatients };
