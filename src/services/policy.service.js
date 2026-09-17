const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { CAPABILITIES, CAREGIVER_PERMISSION_COLUMN } = require("../config/constants");

/**
 * Central authorization gate for all patient-scoped resources.
 *
 * Role alone is never sufficient: a DOCTOR must be actively assigned to the
 * specific patient, and a CAREGIVER must additionally have the matching
 * permission flag set on their assignment. This function is the single
 * place that implements that rule — every route/service touching patient
 * data (vitals, journal, treatment, care team, ...) must call it instead of
 * re-deriving access locally.
 *
 * @param {object} actor - req.user (already authenticated + ACTIVE)
 * @param {string} patientId - PatientProfile.id being accessed
 * @param {string} capability - one of CAPABILITIES
 * @throws {ApiError} 403 if access is not allowed, 404 if patient missing
 * @returns {Promise<object>} the PatientProfile row, for convenience
 */
async function assertPatientAccess(actor, patientId, capability) {
  const patient = await prisma.patientProfile.findUnique({ where: { id: patientId } });
  if (!patient) {
    throw ApiError.notFound("Patient not found");
  }

  if (actor.role === "ADMIN") {
    return patient;
  }

  if (actor.role === "PATIENT") {
    if (patient.userId === actor.id) return patient;
    throw ApiError.forbidden("You may only access your own records");
  }

  if (actor.role === "DOCTOR") {
    const assignment = await prisma.patientDoctorAssignment.findFirst({
      where: { patientId, doctorId: actor.id, status: "ACTIVE" },
    });
    if (assignment) return patient;
    throw ApiError.forbidden("You are not the assigned doctor for this patient");
  }

  if (actor.role === "CAREGIVER") {
    const assignment = await prisma.patientCaregiverAssignment.findFirst({
      where: { patientId, caregiverId: actor.id, status: "ACTIVE" },
    });
    if (!assignment) {
      throw ApiError.forbidden("You are not the assigned caregiver for this patient");
    }
    const column = CAREGIVER_PERMISSION_COLUMN[capability];
    if (column && assignment[column] === false) {
      throw ApiError.forbidden("Your caregiver permissions do not allow this action");
    }
    return patient;
  }

  throw ApiError.forbidden();
}

/**
 * Returns true/false instead of throwing — useful when a route needs to
 * shape a response differently depending on access rather than reject it
 * outright (e.g. "list only patients I can see").
 */
async function canAccessPatient(actor, patientId, capability) {
  try {
    await assertPatientAccess(actor, patientId, capability);
    return true;
  } catch {
    return false;
  }
}

/** Resolves the current actor's own PatientProfile.id, or null. */
async function resolveOwnPatientProfileId(actor) {
  if (actor.role !== "PATIENT") return null;
  const profile = await prisma.patientProfile.findUnique({ where: { userId: actor.id } });
  return profile?.id || null;
}

/** Asserts a treatment plan may be edited: only currently-assigned doctors, or admin. */
async function assertCanEditTreatmentPlan(actor, patientId) {
  if (actor.role === "ADMIN") return;
  if (actor.role !== "DOCTOR") {
    throw ApiError.forbidden("Only an assigned doctor can edit treatment plans");
  }
  await assertPatientAccess(actor, patientId, CAPABILITIES.EDIT_TREATMENT);
}

module.exports = {
  assertPatientAccess,
  canAccessPatient,
  resolveOwnPatientProfileId,
  assertCanEditTreatmentPlan,
};
