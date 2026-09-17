const { z } = require("zod");

const listAlertsQuerySchema = z.object({
  status: z.enum(["OPEN", "REVIEWED", "RESOLVED"]).optional(),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  patientId: z.string().uuid().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

const reviewAlertSchema = z.object({
  note: z.string().trim().max(500).optional(),
});

module.exports = { listAlertsQuerySchema, reviewAlertSchema };
