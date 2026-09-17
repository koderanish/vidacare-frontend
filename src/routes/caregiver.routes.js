const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const requireRole = require("../middleware/requireRole");
const controller = require("../controllers/caregiver.controller");

router.use(authenticate, requireActiveStatus);

router.get("/me/patients", requireRole("CAREGIVER"), controller.myPatients);
router.get("/", controller.list);
router.get("/:id", controller.getById);

module.exports = router;
