const asyncHandler = require("../middleware/asyncHandler");
const { ok, created, paginated } = require("../utils/response");
const ApiError = require("../utils/apiError");
const vitalService = require("../services/vital.service");
const policyService = require("../services/policy.service");
const { CAPABILITIES } = require("../config/constants");

exports.create = asyncHandler(async (req, res) => {
  const actor = req.user;
  // Patients can only ever write their own vitals. Admins may record on
  // behalf of a patient (e.g. demo seeding, manual correction).
  if (actor.role === "PATIENT") {
    await policyService.assertPatientAccess(actor, req.body.patientId, CAPABILITIES.VIEW_VITALS);
    const ownProfile = await policyService.resolveOwnPatientProfileId(actor);
    if (ownProfile !== req.body.patientId) {
      throw ApiError.forbidden("Patients may only record their own vitals");
    }
  } else if (actor.role !== "ADMIN") {
    throw ApiError.forbidden("Only the patient or an administrator may record vitals");
  }

  const result = await vitalService.createVital(req.body, actor);
  created(res, result, "Vital recorded successfully");
});

exports.listForPatient = asyncHandler(async (req, res) => {
  await policyService.assertPatientAccess(req.user, req.params.patientId, CAPABILITIES.VIEW_VITALS);
  const { items, pagination } = await vitalService.listVitalsForPatient(req.params.patientId, req.query);
  paginated(res, items, pagination, "Vitals retrieved successfully");
});

exports.latestForPatient = asyncHandler(async (req, res) => {
  await policyService.assertPatientAccess(req.user, req.params.patientId, CAPABILITIES.VIEW_VITALS);
  ok(res, await vitalService.getLatestVitals(req.params.patientId), "Latest vitals retrieved successfully");
});

exports.trendsForPatient = asyncHandler(async (req, res) => {
  await policyService.assertPatientAccess(req.user, req.params.patientId, CAPABILITIES.VIEW_VITALS);
  const days = req.query.days ? parseInt(req.query.days, 10) : 7;
  const trends = await vitalService.getVitalTrends(req.params.patientId, { type: req.query.type, days });
  ok(res, trends, "Vital trends retrieved successfully");
});

exports.update = asyncHandler(async (req, res) => {
  const vital = await vitalService.getVitalById(req.params.id);
  const actor = req.user;
  if (actor.role === "PATIENT") {
    const ownProfile = await policyService.resolveOwnPatientProfileId(actor);
    if (ownProfile !== vital.patientId) throw ApiError.forbidden("You may only edit your own vitals");
  } else if (actor.role !== "ADMIN") {
    throw ApiError.forbidden("Only the patient or an administrator may edit vitals");
  }
  ok(res, await vitalService.updateVital(req.params.id, req.body, actor), "Vital updated successfully");
});

exports.remove = asyncHandler(async (req, res) => {
  const vital = await vitalService.getVitalById(req.params.id);
  const actor = req.user;
  if (actor.role === "PATIENT") {
    const ownProfile = await policyService.resolveOwnPatientProfileId(actor);
    if (ownProfile !== vital.patientId) throw ApiError.forbidden("You may only delete your own vitals");
  } else if (actor.role !== "ADMIN") {
    throw ApiError.forbidden("Only the patient or an administrator may delete vitals");
  }
  await vitalService.deleteVital(req.params.id, actor);
  ok(res, null, "Vital deleted successfully");
});
