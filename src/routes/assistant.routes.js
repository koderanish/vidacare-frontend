const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const validate = require("../middleware/validate");
const { chatSchema } = require("../validators/assistant.validator");
const controller = require("../controllers/assistant.controller");

router.use(authenticate, requireActiveStatus);
router.post("/chat", validate(chatSchema), controller.chat);

module.exports = router;
