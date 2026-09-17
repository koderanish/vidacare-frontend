const { z } = require("zod");

const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

const idParamSchema = z.object({
  id: z.string().uuid("Invalid id"),
});

module.exports = { paginationQuerySchema, idParamSchema };
