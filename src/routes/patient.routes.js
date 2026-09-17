const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const controller = require("../controllers/patient.controller");

router.use(authenticate, requireActiveStatus);

router.get("/me", controller.me);
router.patch("/me", controller.updateMe);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.get("/:id/care-team", controller.getCareTeam);

module.exports = router;
