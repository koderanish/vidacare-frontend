const { z } = require("zod");

const listUsersQuerySchema = z.object({
  q: z.string().trim().max(160).optional(),
  role: z.enum(["PATIENT", "DOCTOR", "CAREGIVER", "ADMIN"]).optional(),
  status: z.enum(["PENDING", "ACTIVE", "REJECTED", "SUSPENDED"]).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

const updateUserStatusSchema = z.object({
  status: z.enum(["PENDING", "ACTIVE", "REJECTED", "SUSPENDED"]),
  reason: z.string().trim().max(500).optional(),
});

const updateUserSchema = z.object({
  fullName: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().min(7).max(20).optional(),
});

const approveVerificationSchema = z.object({
  notes: z.string().trim().max(1000).optional(),
});

const rejectVerificationSchema = z.object({
  reason: z.string().trim().min(3).max(1000),
});

const alertSettingsSchema = z.object({
  systolicMax: z.coerce.number().int().min(80).max(260).optional(),
  diastolicMax: z.coerce.number().int().min(40).max(180).optional(),
  spo2Min: z.coerce.number().int().min(50).max(100).optional(),
  bloodSugarMax: z.coerce.number().int().min(60).max(500).optional(),
  heartRateMin: z.coerce.number().int().min(20).max(150).optional(),
  heartRateMax: z.coerce.number().int().min(60).max(250).optional(),
  missedReadingHours: z.coerce.number().int().min(1).max(240).optional(),
});

module.exports = {
  listUsersQuerySchema,
  updateUserStatusSchema,
  updateUserSchema,
  approveVerificationSchema,
  rejectVerificationSchema,
  alertSettingsSchema,
};
