const { z } = require("zod");

const medicationInput = z.object({
  name: z.string().trim().min(1).max(160),
  dosage: z.string().trim().min(1).max(80),
  frequency: z.string().trim().min(1).max(80),
  durationDays: z.coerce.number().int().min(1).max(3650).optional(),
  instructions: z.string().trim().max(500).optional(),
});

const createTreatmentPlanSchema = z.object({
  patientId: z.string().uuid(),
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  medications: z.array(medicationInput).max(30).default([]),
});

const updateTreatmentPlanSchema = z.object({
  title: z.string().trim().min(2).max(160).optional(),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "ARCHIVED"]).optional(),
  endDate: z.coerce.date().optional(),
  adherencePercent: z.coerce.number().int().min(0).max(100).optional(),
  markReviewed: z.coerce.boolean().optional(),
});

const addMedicationSchema = medicationInput;

const updateMedicationSchema = medicationInput.partial();

module.exports = {
  createTreatmentPlanSchema,
  updateTreatmentPlanSchema,
  addMedicationSchema,
  updateMedicationSchema,
};
