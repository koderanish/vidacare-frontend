const asyncHandler = require("../middleware/asyncHandler");
const { ok, created } = require("../utils/response");
const ApiError = require("../utils/apiError");
const prisma = require("../config/db");
const treatmentService = require("../services/treatment.service");
const policyService = require("../services/policy.service");
const { CAPABILITIES } = require("../config/constants");

exports.create = asyncHandler(async (req, res) => {
  if (req.user.role !== "DOCTOR") throw ApiError.forbidden("Only a doctor may create a treatment plan");
  await policyService.assertPatientAccess(req.user, req.body.patientId, CAPABILITIES.EDIT_TREATMENT);
  created(res, await treatmentService.createPlan(req.body, req.user), "Treatment plan created successfully");
});

exports.listForPatient = asyncHandler(async (req, res) => {
  await policyService.assertPatientAccess(req.user, req.params.patientId, CAPABILITIES.VIEW_TREATMENT);
  ok(res, await treatmentService.listPlansForPatient(req.params.patientId), "Treatment plans retrieved successfully");
});

exports.getById = asyncHandler(async (req, res) => {
  const plan = await treatmentService.getPlanById(req.params.id);
  await policyService.assertPatientAccess(req.user, plan.patientId, CAPABILITIES.VIEW_TREATMENT);
  ok(res, plan, "Treatment plan retrieved successfully");
});

exports.update = asyncHandler(async (req, res) => {
  const plan = await treatmentService.getPlanById(req.params.id);
  await policyService.assertCanEditTreatmentPlan(req.user, plan.patientId);
  ok(res, await treatmentService.updatePlan(req.params.id, req.body, req.user), "Treatment plan updated successfully");
});

exports.addMedication = asyncHandler(async (req, res) => {
  const plan = await treatmentService.getPlanById(req.params.id);
  await policyService.assertCanEditTreatmentPlan(req.user, plan.patientId);
  created(res, await treatmentService.addMedication(req.params.id, req.body, req.user), "Medication added successfully");
});

exports.updateMedication = asyncHandler(async (req, res) => {
  const medication = await prisma.medication.findUnique({ where: { id: req.params.medId } });
  if (!medication) throw ApiError.notFound("Medication not found");
  const plan = await treatmentService.getPlanById(medication.treatmentPlanId);
  await policyService.assertCanEditTreatmentPlan(req.user, plan.patientId);
  ok(res, await treatmentService.updateMedication(req.params.medId, req.body, req.user), "Medication updated successfully");
});

exports.deleteMedication = asyncHandler(async (req, res) => {
  const medication = await prisma.medication.findUnique({ where: { id: req.params.medId } });
  if (!medication) throw ApiError.notFound("Medication not found");
  const plan = await treatmentService.getPlanById(medication.treatmentPlanId);
  await policyService.assertCanEditTreatmentPlan(req.user, plan.patientId);
  await treatmentService.deleteMedication(req.params.medId, req.user);
  ok(res, null, "Medication removed successfully");
});
