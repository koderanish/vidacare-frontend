const asyncHandler = require("../middleware/asyncHandler");
const { ok, created, paginated } = require("../utils/response");
const ApiError = require("../utils/apiError");
const journalService = require("../services/journal.service");
const policyService = require("../services/policy.service");
const { CAPABILITIES } = require("../config/constants");

exports.create = asyncHandler(async (req, res) => {
  const actor = req.user;
  if (actor.role !== "PATIENT") throw ApiError.forbidden("Only patients may create their own journal entries");
  const ownProfile = await policyService.resolveOwnPatientProfileId(actor);
  if (ownProfile !== req.body.patientId) throw ApiError.forbidden("You may only journal for yourself");

  created(res, await journalService.createEntry(req.body, actor), "Journal entry created successfully");
});

exports.listForPatient = asyncHandler(async (req, res) => {
  await policyService.assertPatientAccess(req.user, req.params.patientId, CAPABILITIES.VIEW_JOURNAL);
  const { items, pagination } = await journalService.listEntriesForPatient(req.params.patientId, req.query);
  paginated(res, items, pagination, "Journal entries retrieved successfully");
});

exports.getById = asyncHandler(async (req, res) => {
  const entry = await journalService.getEntryById(req.params.id);
  await policyService.assertPatientAccess(req.user, entry.patientId, CAPABILITIES.VIEW_JOURNAL);
  ok(res, entry, "Journal entry retrieved successfully");
});

async function assertOwnEntry(actor, entry) {
  if (actor.role !== "PATIENT") throw ApiError.forbidden("Only the patient may edit their own journal entries");
  const ownProfile = await policyService.resolveOwnPatientProfileId(actor);
  if (ownProfile !== entry.patientId) throw ApiError.forbidden("You may only edit your own journal entries");
}

exports.update = asyncHandler(async (req, res) => {
  const entry = await journalService.getEntryById(req.params.id);
  await assertOwnEntry(req.user, entry);
  ok(res, await journalService.updateEntry(req.params.id, req.body, req.user), "Journal entry updated successfully");
});

exports.remove = asyncHandler(async (req, res) => {
  const entry = await journalService.getEntryById(req.params.id);
  await assertOwnEntry(req.user, entry);
  await journalService.deleteEntry(req.params.id, req.user);
  ok(res, null, "Journal entry deleted successfully");
});
