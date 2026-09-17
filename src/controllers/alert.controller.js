const asyncHandler = require("../middleware/asyncHandler");
const { ok, paginated } = require("../utils/response");
const alertService = require("../services/alert.service");
const patientService = require("../services/patient.service");
const policyService = require("../services/policy.service");
const { CAPABILITIES } = require("../config/constants");

// GET /api/alerts — scoped like patients: admin sees all, doctor/caregiver
// see alerts only for their assigned patients, patient sees only their own.
exports.list = asyncHandler(async (req, res) => {
  const actor = req.user;
  let scope = {};

  if (actor.role === "DOCTOR") {
    scope = { patientId: { in: await patientService.patientIdsForDoctor(actor.id) } };
  } else if (actor.role === "CAREGIVER") {
    scope = { patientId: { in: await patientService.patientIdsForCaregiver(actor.id) } };
  } else if (actor.role === "PATIENT") {
    const self = await patientService.getPatientByUserId(actor.id);
    scope = { patientId: self.id };
  }

  const { items, pagination } = await alertService.listAlerts(req.query, scope);
  paginated(res, items, pagination, "Alerts retrieved successfully");
});

exports.getById = asyncHandler(async (req, res) => {
  const alert = await alertService.getAlertById(req.params.id);
  await policyService.assertPatientAccess(req.user, alert.patientId, CAPABILITIES.RECEIVE_ALERTS);
  ok(res, alert, "Alert retrieved successfully");
});

exports.review = asyncHandler(async (req, res) => {
  const alert = await alertService.getAlertById(req.params.id);
  await policyService.assertPatientAccess(req.user, alert.patientId, CAPABILITIES.RECEIVE_ALERTS);
  ok(res, await alertService.reviewAlert(req.params.id, req.user), "Alert marked as reviewed");
});

exports.resolve = asyncHandler(async (req, res) => {
  const alert = await alertService.getAlertById(req.params.id);
  await policyService.assertPatientAccess(req.user, alert.patientId, CAPABILITIES.RECEIVE_ALERTS);
  ok(res, await alertService.resolveAlert(req.params.id, req.user), "Alert marked as resolved");
});
