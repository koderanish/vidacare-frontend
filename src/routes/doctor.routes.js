const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const requireRole = require("../middleware/requireRole");
const controller = require("../controllers/doctor.controller");

router.use(authenticate, requireActiveStatus);

router.get("/me/patients", requireRole("DOCTOR"), controller.myPatients);
router.get("/", controller.list);
router.get("/:id", controller.getById);

module.exports = router;
