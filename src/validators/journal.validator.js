const { z } = require("zod");

const MOODS = ["CALM", "GOOD", "ANXIOUS", "SAD", "STRESSED", "ENERGETIC"];

const createJournalSchema = z.object({
  patientId: z.string().uuid(),
  mood: z.enum(MOODS),
  painLevel: z.coerce.number().int().min(0).max(10),
  symptoms: z.array(z.string().trim().min(1).max(60)).max(20).default([]),
  notes: z.string().trim().max(2000).optional(),
  entryDate: z.coerce.date().optional(),
});

const updateJournalSchema = z.object({
  mood: z.enum(MOODS).optional(),
  painLevel: z.coerce.number().int().min(0).max(10).optional(),
  symptoms: z.array(z.string().trim().min(1).max(60)).max(20).optional(),
  notes: z.string().trim().max(2000).optional(),
});

const listJournalQuerySchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  mood: z.enum(MOODS).optional(),
  q: z.string().trim().max(200).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

module.exports = { MOODS, createJournalSchema, updateJournalSchema, listJournalQuerySchema };
