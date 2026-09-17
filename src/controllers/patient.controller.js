const asyncHandler = require("../middleware/asyncHandler");
const { ok, paginated } = require("../utils/response");
const ApiError = require("../utils/apiError");
const patientService = require("../services/patient.service");
const assignmentService = require("../services/assignment.service");
const policyService = require("../services/policy.service");
const { CAPABILITIES } = require("../config/constants");

// GET /api/patients — scoped by role: admin sees all, doctor/caregiver see
// only their assigned patients, patient sees only themselves.
exports.list = asyncHandler(async (req, res) => {
  const actor = req.user;
  let scope = {};

  if (actor.role === "ADMIN") {
    scope = {};
  } else if (actor.role === "DOCTOR") {
    const ids = await patientService.patientIdsForDoctor(actor.id);
    scope = { id: { in: ids } };
  } else if (actor.role === "CAREGIVER") {
    const ids = await patientService.patientIdsForCaregiver(actor.id);
    scope = { id: { in: ids } };
  } else if (actor.role === "PATIENT") {
    const self = await patientService.getPatientByUserId(actor.id);
    scope = { id: self.id };
  }

  const { items, pagination } = await patientService.listPatients(req.query, scope);
  paginated(res, items, pagination, "Patients retrieved successfully");
});

exports.getById = asyncHandler(async (req, res) => {
  await policyService.assertPatientAccess(req.user, req.params.id, CAPABILITIES.VIEW_PROFILE);
  ok(res, await patientService.getPatientById(req.params.id), "Patient retrieved successfully");
});

exports.getCareTeam = asyncHandler(async (req, res) => {
  await policyService.assertPatientAccess(req.user, req.params.id, CAPABILITIES.VIEW_PROFILE);
  ok(res, await assignmentService.getCareTeam(req.params.id), "Care team retrieved successfully");
});

exports.me = asyncHandler(async (req, res) => {
  if (req.user.role !== "PATIENT") throw ApiError.forbidden("Only patients have a patient profile");
  ok(res, await patientService.getPatientByUserId(req.user.id), "Profile retrieved successfully");
});

exports.updateMe = asyncHandler(async (req, res) => {
  if (req.user.role !== "PATIENT") throw ApiError.forbidden("Only patients have a patient profile");
  const self = await patientService.getPatientByUserId(req.user.id);
  ok(res, await patientService.updatePatientProfile(self.id, req.body), "Profile updated successfully");
});
