const { z } = require("zod");

const CATEGORIES = [
  "HEART_HEALTH",
  "DIABETES",
  "MENTAL_WELLNESS",
  "NUTRITION",
  "EXERCISE",
  "MEDICATION",
  "GENERAL_HEALTH",
];

const createResourceSchema = z.object({
  title: z.string().trim().min(2).max(200),
  category: z.enum(CATEGORIES),
  description: z.string().trim().min(2).max(500),
  content: z.string().trim().min(2),
  authorName: z.string().trim().min(2).max(120),
  coverImageUrl: z.string().trim().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED"]).default("DRAFT"),
});

const updateResourceSchema = createResourceSchema.partial();

const listResourcesQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  category: z.enum(CATEGORIES).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED"]).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

module.exports = { CATEGORIES, createResourceSchema, updateResourceSchema, listResourcesQuerySchema };
