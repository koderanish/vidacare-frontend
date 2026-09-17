const router = require("express").Router();
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authController = require("../controllers/auth.controller");
const {
  registerPatientSchema,
  registerDoctorSchema,
  registerCaregiverSchema,
  loginSchema,
  refreshSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validators/auth.validator");

router.post("/register/patient", validate(registerPatientSchema), authController.registerPatient);
router.post("/register/doctor", validate(registerDoctorSchema), authController.registerDoctor);
router.post("/register/caregiver", validate(registerCaregiverSchema), authController.registerCaregiver);

router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", validate(refreshSchema), authController.refresh);
router.post("/logout", authController.logout);

router.post("/verify-email", validate(verifyEmailSchema), authController.verifyEmail);
router.post("/resend-verification", validate(resendVerificationSchema), authController.resendVerification);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);

router.get("/me", authenticate, authController.me);

module.exports = router;
