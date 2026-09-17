const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const validate = require("../middleware/validate");
const { listNotificationsQuerySchema } = require("../validators/notification.validator");
const { idParamSchema } = require("../validators/common.validator");
const controller = require("../controllers/notification.controller");

router.use(authenticate, requireActiveStatus);

router.get("/", validate(listNotificationsQuerySchema, "query"), controller.list);
router.patch("/read-all", controller.markAllRead);
router.patch("/:id/read", validate(idParamSchema, "params"), controller.markRead);
router.delete("/:id", validate(idParamSchema, "params"), controller.remove);

module.exports = router;
