const asyncHandler = require("../middleware/asyncHandler");
const { ok, paginated } = require("../utils/response");
const doctorService = require("../services/doctor.service");

exports.list = asyncHandler(async (req, res) => {
  const { items, pagination } = await doctorService.listDoctors(req.query);
  paginated(res, items, pagination, "Doctors retrieved successfully");
});

exports.getById = asyncHandler(async (req, res) => {
  ok(res, await doctorService.getDoctorById(req.params.id), "Doctor retrieved successfully");
});

exports.myPatients = asyncHandler(async (req, res) => {
  const { items, pagination } = await doctorService.getMyPatients(req.user.id, req.query);
  paginated(res, items, pagination, "Assigned patients retrieved successfully");
});
