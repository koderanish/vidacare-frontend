const asyncHandler = require("../middleware/asyncHandler");
const { ok, created, paginated } = require("../utils/response");
const resourceService = require("../services/resource.service");

exports.list = asyncHandler(async (req, res) => {
  const actor = req.user;
  const query = { ...req.query };
  // Non-admins only ever see published content, regardless of what they ask for.
  if (!actor || actor.role !== "ADMIN") query.status = "PUBLISHED";
  const { items, pagination } = await resourceService.listResources(query);
  paginated(res, items, pagination, "Resources retrieved successfully");
});

exports.getById = asyncHandler(async (req, res) => {
  ok(res, await resourceService.getResourceById(req.params.id), "Resource retrieved successfully");
});

exports.create = asyncHandler(async (req, res) => {
  created(res, await resourceService.createResource(req.body, req.user), "Resource created successfully");
});

exports.update = asyncHandler(async (req, res) => {
  ok(res, await resourceService.updateResource(req.params.id, req.body, req.user), "Resource updated successfully");
});

exports.publish = asyncHandler(async (req, res) => {
  ok(res, await resourceService.setPublishStatus(req.params.id, "PUBLISHED", req.user), "Resource published");
});

exports.unpublish = asyncHandler(async (req, res) => {
  ok(res, await resourceService.setPublishStatus(req.params.id, "UNPUBLISHED", req.user), "Resource unpublished");
});

exports.remove = asyncHandler(async (req, res) => {
  await resourceService.deleteResource(req.params.id, req.user);
  ok(res, null, "Resource deleted successfully");
});
