const asyncHandler = require("../middleware/asyncHandler");
const { ok, paginated } = require("../utils/response");
const caregiverService = require("../services/caregiver.service");

exports.list = asyncHandler(async (req, res) => {
  const { items, pagination } = await caregiverService.listCaregivers(req.query);
  paginated(res, items, pagination, "Caregivers retrieved successfully");
});

exports.getById = asyncHandler(async (req, res) => {
  ok(res, await caregiverService.getCaregiverById(req.params.id), "Caregiver retrieved successfully");
});

exports.myPatients = asyncHandler(async (req, res) => {
  const { items, pagination } = await caregiverService.getMyPatients(req.user.id, req.query);
  paginated(res, items, pagination, "Assigned patients retrieved successfully");
});
