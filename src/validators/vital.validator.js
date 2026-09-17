const { z } = require("zod");

const VITAL_TYPES = ["BLOOD_PRESSURE", "HEART_RATE", "SPO2", "BLOOD_SUGAR", "WEIGHT"];

const createVitalSchema = z
  .object({
    patientId: z.string().uuid(),
    type: z.enum(VITAL_TYPES),
    valuePrimary: z.coerce.number(),
    valueSecondary: z.coerce.number().optional(),
    unit: z.string().trim().min(1).max(20).optional(),
    source: z.enum(["MANUAL", "DEMO_DEVICE"]).default("MANUAL"),
    recordedAt: z.coerce.date().optional(),
    notes: z.string().trim().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "BLOOD_PRESSURE" && data.valueSecondary === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["valueSecondary"],
        message: "Diastolic value is required for blood pressure readings",
      });
    }
  });

const updateVitalSchema = z.object({
  valuePrimary: z.coerce.number().optional(),
  valueSecondary: z.coerce.number().optional(),
  unit: z.string().trim().min(1).max(20).optional(),
  recordedAt: z.coerce.date().optional(),
  notes: z.string().trim().max(500).optional(),
});

const listVitalsQuerySchema = z.object({
  type: z.enum(VITAL_TYPES).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(200).optional(),
});

module.exports = { VITAL_TYPES, createVitalSchema, updateVitalSchema, listVitalsQuerySchema };
