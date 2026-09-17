const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");
const { slugify } = require("../utils/slugify");
const { logActivity } = require("./activity.service");

async function uniqueSlug(title) {
  const base = slugify(title);
  let slug = base;
  let n = 1;
  // Small tables, small n — a loop is fine for a prototype.
  while (await prisma.healthResource.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${base}-${n}`;
  }
  return slug;
}

async function createResource(input, actor) {
  const slug = await uniqueSlug(input.title);
  const resource = await prisma.healthResource.create({
    data: {
      ...input,
      coverImageUrl: input.coverImageUrl || null,
      slug,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      createdById: actor.id,
    },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "RESOURCE_CREATED",
    entityType: "HealthResource",
    entityId: resource.id,
    summary: `Resource "${resource.title}" created`,
  });

  return resource;
}

async function listResources(query) {
  const { page, limit, skip } = parsePagination(query);
  const where = {};
  if (query.category) where.category = query.category;
  if (query.status) where.status = query.status;
  if (query.q) {
    where.OR = [
      { title: { contains: query.q, mode: "insensitive" } },
      { description: { contains: query.q, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.healthResource.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.healthResource.count({ where }),
  ]);

  return { items, pagination: buildPagination(page, limit, total) };
}

async function getResourceById(id) {
  const resource = await prisma.healthResource.findUnique({ where: { id } });
  if (!resource) throw ApiError.notFound("Resource not found");
  return resource;
}

async function updateResource(id, patch, actor) {
  await getResourceById(id);
  const data = { ...patch };
  if (patch.title) data.slug = await uniqueSlug(patch.title);
  if (patch.status === "PUBLISHED") data.publishedAt = new Date();

  const resource = await prisma.healthResource.update({ where: { id }, data });

  await logActivity({
    actorUserId: actor.id,
    action: "RESOURCE_UPDATED",
    entityType: "HealthResource",
    entityId: id,
    summary: `Resource "${resource.title}" updated`,
  });

  return resource;
}

async function setPublishStatus(id, status, actor) {
  const resource = await getResourceById(id);
  const updated = await prisma.healthResource.update({
    where: { id },
    data: { status, publishedAt: status === "PUBLISHED" ? new Date() : resource.publishedAt },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "RESOURCE_STATUS_CHANGED",
    entityType: "HealthResource",
    entityId: id,
    summary: `Resource "${resource.title}" set to ${status}`,
  });

  return updated;
}

async function deleteResource(id, actor) {
  const resource = await getResourceById(id);
  await prisma.healthResource.delete({ where: { id } });

  await logActivity({
    actorUserId: actor.id,
    action: "RESOURCE_DELETED",
    entityType: "HealthResource",
    entityId: id,
    summary: `Resource "${resource.title}" deleted`,
  });
}

module.exports = { createResource, listResources, getResourceById, updateResource, setPublishStatus, deleteResource };
