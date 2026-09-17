const asyncHandler = require("../middleware/asyncHandler");
const { ok, created } = require("../utils/response");
const authService = require("../services/auth.service");

exports.registerPatient = asyncHandler(async (req, res) => {
  const result = await authService.registerPatient(req.body);
  created(res, result, "Patient account created. Check your email to verify your address.");
});

exports.registerDoctor = asyncHandler(async (req, res) => {
  const result = await authService.registerDoctor(req.body);
  created(res, result, "Doctor application submitted. An administrator will review it shortly.");
});

exports.registerCaregiver = asyncHandler(async (req, res) => {
  const result = await authService.registerCaregiver(req.body);
  created(res, result, "Caregiver application submitted. An administrator will review it shortly.");
});

exports.login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  ok(res, result, "Login successful");
});

exports.refresh = asyncHandler(async (req, res) => {
  const result = await authService.refresh(req.body);
  ok(res, result, "Token refreshed");
});

exports.logout = asyncHandler(async (req, res) => {
  await authService.logout(req.body);
  ok(res, null, "Logged out successfully");
});

exports.verifyEmail = asyncHandler(async (req, res) => {
  const result = await authService.verifyEmail(req.body);
  ok(res, result, "Email verified successfully");
});

exports.resendVerification = asyncHandler(async (req, res) => {
  const result = await authService.resendVerification(req.body);
  ok(res, result, "If an account exists for this email, a verification link has been sent");
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body);
  ok(res, result, "If an account exists for this email, a reset link has been sent");
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.body);
  ok(res, result, "Password reset successfully");
});

exports.me = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  ok(res, user, "Current user retrieved");
});
