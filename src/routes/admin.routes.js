const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const validate = require("../middleware/validate");
const { idParamSchema } = require("../validators/common.validator");
const {
  listUsersQuerySchema,
  updateUserStatusSchema,
  updateUserSchema,
  approveVerificationSchema,
  rejectVerificationSchema,
  alertSettingsSchema,
} = require("../validators/admin.validator");
const { caregiverPermissionsSchema } = require("../validators/assignment.validator");
const controller = require("../controllers/admin.controller");

router.use(authenticate, requireActiveStatus, requireRole("ADMIN"));

router.get("/dashboard/stats", controller.stats);
router.get("/dashboard/charts/patient-activity", controller.patientActivityChart);
router.get("/dashboard/charts/registrations", controller.registrationChart);
router.get("/dashboard/activity", controller.recentActivity);

router.get("/users", validate(listUsersQuerySchema, "query"), controller.listUsers);
router.get("/users/:id", validate(idParamSchema, "params"), controller.getUser);
router.patch("/users/:id", validate(idParamSchema, "params"), validate(updateUserSchema), controller.updateUser);
router.patch(
  "/users/:id/status",
  validate(idParamSchema, "params"),
  validate(updateUserStatusSchema),
  controller.updateUserStatus
);

router.get("/verifications", controller.listVerifications);
router.get("/verifications/:id", validate(idParamSchema, "params"), controller.getVerification);
router.post(
  "/verifications/:id/approve",
  validate(idParamSchema, "params"),
  validate(approveVerificationSchema),
  controller.approveVerification
);
router.post(
  "/verifications/:id/reject",
  validate(idParamSchema, "params"),
  validate(rejectVerificationSchema),
  controller.rejectVerification
);

router.get("/alert-settings", controller.getAlertSettings);
router.put("/alert-settings", validate(alertSettingsSchema), controller.updateAlertSettings);

router.post("/patients/:patientId/doctors/:doctorId", controller.assignDoctor);
router.delete("/patients/:patientId/doctors/:doctorId", controller.removeDoctor);
router.post("/patients/:patientId/caregivers/:caregiverId", controller.assignCaregiver);
router.delete("/patients/:patientId/caregivers/:caregiverId", controller.removeCaregiver);
router.patch(
  "/patients/:patientId/caregiver-permissions",
  validate(caregiverPermissionsSchema),
  controller.updateCaregiverPermissions
);

module.exports = router;
