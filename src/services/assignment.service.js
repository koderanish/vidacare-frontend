const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { logActivity } = require("./activity.service");

async function requirePatient(patientId) {
  const patient = await prisma.patientProfile.findUnique({ where: { id: patientId }, include: { user: true } });
  if (!patient) throw ApiError.notFound("Patient not found");
  return patient;
}

async function requireActiveDoctor(doctorId) {
  const doctor = await prisma.user.findUnique({ where: { id: doctorId } });
  if (!doctor || doctor.role !== "DOCTOR") throw ApiError.notFound("Doctor not found");
  if (doctor.status !== "ACTIVE") throw ApiError.badRequest("Doctor account is not active");
  return doctor;
}

async function requireActiveCaregiver(caregiverId) {
  const caregiver = await prisma.user.findUnique({ where: { id: caregiverId } });
  if (!caregiver || caregiver.role !== "CAREGIVER") throw ApiError.notFound("Caregiver not found");
  if (caregiver.status !== "ACTIVE") throw ApiError.badRequest("Caregiver account is not active");
  return caregiver;
}

// Assigns a doctor, ending any previous active assignment first (so the
// unique-active-per-patient invariant enforced by the partial index always
// holds — see prisma/migrations/*_partial_unique_active_assignments).
async function assignDoctor(patientId, doctorId, actor) {
  const patient = await requirePatient(patientId);
  const doctor = await requireActiveDoctor(doctorId);

  const result = await prisma.$transaction(async (tx) => {
    const previous = await tx.patientDoctorAssignment.findFirst({
      where: { patientId, status: "ACTIVE" },
    });
    if (previous) {
      if (previous.doctorId === doctorId) return previous; // already assigned
      await tx.patientDoctorAssignment.update({
        where: { id: previous.id },
        data: { status: "ENDED", endedAt: new Date() },
      });
    }
    return tx.patientDoctorAssignment.create({
      data: { patientId, doctorId, assignedById: actor.id },
    });
  });

  await prisma.notification.create({
    data: {
      recipientUserId: doctorId,
      type: "ASSIGNMENT",
      title: "New patient assigned",
      body: `You have been assigned to patient ${patient.patientCode}.`,
      entityType: "Patient",
      entityId: patientId,
    },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "DOCTOR_ASSIGNED",
    entityType: "Patient",
    entityId: patientId,
    summary: `Dr. ${doctor.fullName} assigned to patient ${patient.patientCode}`,
  });

  return result;
}

async function removeDoctor(patientId, actor) {
  await requirePatient(patientId);
  const active = await prisma.patientDoctorAssignment.findFirst({ where: { patientId, status: "ACTIVE" } });
  if (!active) throw ApiError.notFound("No active doctor assignment for this patient");

  const updated = await prisma.patientDoctorAssignment.update({
    where: { id: active.id },
    data: { status: "ENDED", endedAt: new Date() },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "DOCTOR_REMOVED",
    entityType: "Patient",
    entityId: patientId,
    summary: "Doctor assignment ended",
  });

  return updated;
}

async function assignCaregiver(patientId, caregiverId, actor, permissions = {}) {
  const patient = await requirePatient(patientId);
  const caregiver = await requireActiveCaregiver(caregiverId);

  const result = await prisma.$transaction(async (tx) => {
    const previous = await tx.patientCaregiverAssignment.findFirst({
      where: { patientId, status: "ACTIVE" },
    });
    if (previous) {
      await tx.patientCaregiverAssignment.update({
        where: { id: previous.id },
        data: { status: "ENDED", endedAt: new Date() },
      });
    }
    return tx.patientCaregiverAssignment.create({
      data: { patientId, caregiverId, assignedById: actor.id, ...permissions },
    });
  });

  await prisma.notification.create({
    data: {
      recipientUserId: caregiverId,
      type: "ASSIGNMENT",
      title: "New patient assigned",
      body: `You have been assigned to patient ${patient.patientCode}.`,
      entityType: "Patient",
      entityId: patientId,
    },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "CAREGIVER_ASSIGNED",
    entityType: "Patient",
    entityId: patientId,
    summary: `${caregiver.fullName} assigned as caregiver to patient ${patient.patientCode}`,
  });

  return result;
}

async function removeCaregiver(patientId, actor) {
  await requirePatient(patientId);
  const active = await prisma.patientCaregiverAssignment.findFirst({ where: { patientId, status: "ACTIVE" } });
  if (!active) throw ApiError.notFound("No active caregiver assignment for this patient");

  const updated = await prisma.patientCaregiverAssignment.update({
    where: { id: active.id },
    data: { status: "ENDED", endedAt: new Date() },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "CAREGIVER_REMOVED",
    entityType: "Patient",
    entityId: patientId,
    summary: "Caregiver assignment ended",
  });

  return updated;
}

async function updateCaregiverPermissions(patientId, permissions, actor) {
  const active = await prisma.patientCaregiverAssignment.findFirst({ where: { patientId, status: "ACTIVE" } });
  if (!active) throw ApiError.notFound("No active caregiver assignment for this patient");

  const updated = await prisma.patientCaregiverAssignment.update({
    where: { id: active.id },
    data: permissions,
  });

  await logActivity({
    actorUserId: actor.id,
    action: "CAREGIVER_PERMISSIONS_UPDATED",
    entityType: "Patient",
    entityId: patientId,
    summary: "Caregiver permissions updated",
  });

  return updated;
}

async function getCareTeam(patientId) {
  const patient = await requirePatient(patientId);
  const [doctorAssignment, caregiverAssignment] = await Promise.all([
    prisma.patientDoctorAssignment.findFirst({
      where: { patientId, status: "ACTIVE" },
      include: { doctor: { include: { doctorProfile: true } } },
    }),
    prisma.patientCaregiverAssignment.findFirst({
      where: { patientId, status: "ACTIVE" },
      include: { caregiver: { include: { caregiverProfile: true } } },
    }),
  ]);

  return {
    patient: { id: patient.id, patientCode: patient.patientCode, fullName: patient.user.fullName },
    doctor: doctorAssignment
      ? {
          assignmentId: doctorAssignment.id,
          assignedAt: doctorAssignment.assignedAt,
          user: doctorAssignment.doctor,
        }
      : null,
    caregiver: caregiverAssignment
      ? {
          assignmentId: caregiverAssignment.id,
          assignedAt: caregiverAssignment.assignedAt,
          permissions: {
            canViewProfile: caregiverAssignment.canViewProfile,
            canViewVitals: caregiverAssignment.canViewVitals,
            canViewJournal: caregiverAssignment.canViewJournal,
            canViewTreatment: caregiverAssignment.canViewTreatment,
            canReceiveAlerts: caregiverAssignment.canReceiveAlerts,
          },
          user: caregiverAssignment.caregiver,
        }
      : null,
  };
}

module.exports = {
  assignDoctor,
  removeDoctor,
  assignCaregiver,
  removeCaregiver,
  updateCaregiverPermissions,
  getCareTeam,
};
