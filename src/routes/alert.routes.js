const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const validate = require("../middleware/validate");
const { listAlertsQuerySchema, reviewAlertSchema } = require("../validators/alert.validator");
const { idParamSchema } = require("../validators/common.validator");
const controller = require("../controllers/alert.controller");

router.use(authenticate, requireActiveStatus);

router.get("/", validate(listAlertsQuerySchema, "query"), controller.list);
router.get("/:id", validate(idParamSchema, "params"), controller.getById);
router.patch("/:id/review", validate(idParamSchema, "params"), validate(reviewAlertSchema), controller.review);
router.patch("/:id/resolve", validate(idParamSchema, "params"), validate(reviewAlertSchema), controller.resolve);

module.exports = router;
