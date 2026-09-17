const { z } = require("zod");
const { PASSWORD_REGEX } = require("../utils/password");

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(PASSWORD_REGEX, "Password must include an uppercase letter, a lowercase letter, and a number");

const email = z.string().trim().toLowerCase().email("Enter a valid email address");
const phone = z.string().trim().min(7).max(20).optional();

const registerPatientSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email,
  password,
  phone,
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "UNSPECIFIED"]).optional(),
  emergencyContactName: z.string().trim().max(120).optional(),
  emergencyContactPhone: z.string().trim().max(20).optional(),
});

const registerDoctorSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email,
  password,
  phone: z.string().trim().min(7).max(20),
  specialization: z.string().trim().min(2).max(120),
  licenseNumber: z.string().trim().min(3).max(60),
  hospital: z.string().trim().min(2).max(160),
  yearsOfExperience: z.coerce.number().int().min(0).max(70).default(0),
  documentType: z.string().trim().max(120).optional(),
  documentReference: z.string().trim().max(160).optional(),
  issuingBody: z.string().trim().max(160).optional(),
  notes: z.string().trim().max(2000).optional(),
});

const registerCaregiverSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email,
  password,
  phone: z.string().trim().min(7).max(20),
  caregiverType: z.enum(["FAMILY_MEMBER", "PROFESSIONAL_CAREGIVER", "LEGAL_GUARDIAN", "OTHER"]),
  yearsOfExperience: z.coerce.number().int().min(0).max(70).default(0),
  relationshipNotes: z.string().trim().max(2000).optional(),
  documentType: z.string().trim().max(120).optional(),
  documentReference: z.string().trim().max(160).optional(),
  issuingBody: z.string().trim().max(160).optional(),
  notes: z.string().trim().max(2000).optional(),
});

const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

const verifyEmailSchema = z.object({
  token: z.string().min(10),
});

const resendVerificationSchema = z.object({ email });

const forgotPasswordSchema = z.object({ email });

const resetPasswordSchema = z.object({
  token: z.string().min(10),
  password,
});

module.exports = {
  registerPatientSchema,
  registerDoctorSchema,
  registerCaregiverSchema,
  loginSchema,
  refreshSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
