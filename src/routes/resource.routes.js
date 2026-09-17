const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireActiveStatus = require("../middleware/requireActiveStatus");
const requireRole = require("../middleware/requireRole");
const validate = require("../middleware/validate");
const {
  createResourceSchema,
  updateResourceSchema,
  listResourcesQuerySchema,
} = require("../validators/resource.validator");
const { idParamSchema } = require("../validators/common.validator");
const controller = require("../controllers/resource.controller");

// Listing/reading published resources is available to any authenticated,
// active user (all four roles read health content). Writing is admin-only.
router.use(authenticate, requireActiveStatus);

router.get("/", validate(listResourcesQuerySchema, "query"), controller.list);
router.get("/:id", validate(idParamSchema, "params"), controller.getById);

router.post("/", requireRole("ADMIN"), validate(createResourceSchema), controller.create);
router.patch(
  "/:id",
  requireRole("ADMIN"),
  validate(idParamSchema, "params"),
  validate(updateResourceSchema),
  controller.update
);
router.patch("/:id/publish", requireRole("ADMIN"), validate(idParamSchema, "params"), controller.publish);
router.patch("/:id/unpublish", requireRole("ADMIN"), validate(idParamSchema, "params"), controller.unpublish);
router.delete("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), controller.remove);

module.exports = router;
