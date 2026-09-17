const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/patients", require("./patient.routes"));
router.use("/doctors", require("./doctor.routes"));
router.use("/caregivers", require("./caregiver.routes"));
router.use("/vitals", require("./vital.routes"));
router.use("/journal", require("./journal.routes"));
router.use("/treatment-plans", require("./treatment.routes"));
router.use("/alerts", require("./alert.routes"));
router.use("/notifications", require("./notification.routes"));
router.use("/resources", require("./resource.routes"));
router.use("/assistant", require("./assistant.routes"));

module.exports = router;
