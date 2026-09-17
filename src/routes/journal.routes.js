const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const validate = require("../middleware/validate");
const { createJournalSchema, updateJournalSchema, listJournalQuerySchema } = require("../validators/journal.validator");
const { idParamSchema } = require("../validators/common.validator");
const controller = require("../controllers/journal.controller");

router.use(authenticate, requireActiveStatus);

router.post("/", validate(createJournalSchema), controller.create);
router.get("/patient/:patientId", validate(listJournalQuerySchema, "query"), controller.listForPatient);
router.get("/:id", validate(idParamSchema, "params"), controller.getById);
router.patch("/:id", validate(idParamSchema, "params"), validate(updateJournalSchema), controller.update);
router.delete("/:id", validate(idParamSchema, "params"), controller.remove);

module.exports = router;
