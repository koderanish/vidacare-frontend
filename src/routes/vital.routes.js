const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const validate = require("../middleware/validate");
const { createVitalSchema, updateVitalSchema, listVitalsQuerySchema } = require("../validators/vital.validator");
const { idParamSchema } = require("../validators/common.validator");
const controller = require("../controllers/vital.controller");

router.use(authenticate, requireActiveStatus);

router.post("/", validate(createVitalSchema), controller.create);
router.get("/patient/:patientId", validate(listVitalsQuerySchema, "query"), controller.listForPatient);
router.get("/patient/:patientId/latest", controller.latestForPatient);
router.get("/patient/:patientId/trends", controller.trendsForPatient);
router.patch("/:id", validate(idParamSchema, "params"), validate(updateVitalSchema), controller.update);
router.delete("/:id", validate(idParamSchema, "params"), controller.remove);

module.exports = router;
