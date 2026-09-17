const asyncHandler = require("../middleware/asyncHandler");
const { ok, paginated } = require("../utils/response");
const dashboardService = require("../services/dashboard.service");
const userService = require("../services/user.service");
const verificationService = require("../services/verification.service");
const alertService = require("../services/alert.service");
const assignmentService = require("../services/assignment.service");

exports.stats = asyncHandler(async (req, res) => {
  ok(res, await dashboardService.getStats(), "Dashboard statistics retrieved");
});

exports.patientActivityChart = asyncHandler(async (req, res) => {
  ok(res, await dashboardService.getPatientActivityChart(), "Patient activity chart retrieved");
});

exports.registrationChart = asyncHandler(async (req, res) => {
  ok(res, await dashboardService.getRegistrationChart(), "Registration chart retrieved");
});

exports.recentActivity = asyncHandler(async (req, res) => {
  ok(res, await dashboardService.getRecentActivity(), "Recent activity retrieved");
});

exports.listUsers = asyncHandler(async (req, res) => {
  const { items, pagination } = await userService.listUsers(req.query);
  paginated(res, items, pagination, "Users retrieved successfully");
});

exports.getUser = asyncHandler(async (req, res) => {
  ok(res, await userService.getUserById(req.params.id), "User retrieved successfully");
});

exports.updateUser = asyncHandler(async (req, res) => {
  ok(res, await userService.updateUser(req.params.id, req.body), "User updated successfully");
});

exports.updateUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.updateUserStatus(req.params.id, req.body, req.user);
  ok(res, user, "User status updated successfully");
});

exports.listVerifications = asyncHandler(async (req, res) => {
  const { items, pagination } = await verificationService.listVerifications(req.query);
  paginated(res, items, pagination, "Verification requests retrieved successfully");
});

exports.getVerification = asyncHandler(async (req, res) => {
  ok(res, await verificationService.getVerificationById(req.params.id), "Verification request retrieved");
});

exports.approveVerification = asyncHandler(async (req, res) => {
  const result = await verificationService.approveVerification(req.params.id, req.body, req.user);
  ok(res, result, "Verification approved");
});

exports.rejectVerification = asyncHandler(async (req, res) => {
  const result = await verificationService.rejectVerification(req.params.id, req.body, req.user);
  ok(res, result, "Verification rejected");
});

exports.getAlertSettings = asyncHandler(async (req, res) => {
  ok(res, await alertService.getSettings(), "Alert settings retrieved");
});

exports.updateAlertSettings = asyncHandler(async (req, res) => {
  ok(res, await alertService.updateSettings(req.body, req.user), "Alert settings updated");
});

exports.assignDoctor = asyncHandler(async (req, res) => {
  const result = await assignmentService.assignDoctor(req.params.patientId, req.params.doctorId, req.user);
  ok(res, result, "Doctor assigned successfully");
});

exports.removeDoctor = asyncHandler(async (req, res) => {
  const result = await assignmentService.removeDoctor(req.params.patientId, req.user);
  ok(res, result, "Doctor assignment ended");
});

exports.assignCaregiver = asyncHandler(async (req, res) => {
  const result = await assignmentService.assignCaregiver(req.params.patientId, req.params.caregiverId, req.user);
  ok(res, result, "Caregiver assigned successfully");
});

exports.removeCaregiver = asyncHandler(async (req, res) => {
  const result = await assignmentService.removeCaregiver(req.params.patientId, req.user);
  ok(res, result, "Caregiver assignment ended");
});

exports.updateCaregiverPermissions = asyncHandler(async (req, res) => {
  const result = await assignmentService.updateCaregiverPermissions(req.params.patientId, req.body, req.user);
  ok(res, result, "Caregiver permissions updated");
});
