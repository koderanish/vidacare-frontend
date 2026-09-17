const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const validate = require("../middleware/validate");
const {
  createTreatmentPlanSchema,
  updateTreatmentPlanSchema,
  addMedicationSchema,
  updateMedicationSchema,
} = require("../validators/treatment.validator");
const { idParamSchema } = require("../validators/common.validator");
const controller = require("../controllers/treatment.controller");

router.use(authenticate, requireActiveStatus);

router.post("/", validate(createTreatmentPlanSchema), controller.create);
router.get("/patient/:patientId", controller.listForPatient);
router.get("/:id", validate(idParamSchema, "params"), controller.getById);
router.patch("/:id", validate(idParamSchema, "params"), validate(updateTreatmentPlanSchema), controller.update);
router.post("/:id/medications", validate(idParamSchema, "params"), validate(addMedicationSchema), controller.addMedication);
router.patch("/medications/:medId", validate(updateMedicationSchema), controller.updateMedication);
router.delete("/medications/:medId", controller.deleteMedication);

module.exports = router;
