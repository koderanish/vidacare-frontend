const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { hashPassword, comparePassword } = require("../utils/password");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const { generateRawToken, hashToken } = require("../utils/tokens");
const { generatePatientCode } = require("../utils/patientCode");
const { sendMail } = require("../utils/mailer");
const { logActivity } = require("./activity.service");
const env = require("../config/env");

const EMAIL_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1h
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30d, mirrors JWT_REFRESH_EXPIRES_IN default

function publicUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

async function issueTokenPair(user) {
  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshTokenRaw = signRefreshToken({ sub: user.id });

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshTokenRaw),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    },
  });

  return { accessToken, refreshToken: refreshTokenRaw };
}

async function createEmailVerificationToken(userId) {
  const raw = generateRawToken();
  await prisma.emailVerificationToken.create({
    data: { userId, tokenHash: hashToken(raw), expiresAt: new Date(Date.now() + EMAIL_TOKEN_TTL_MS) },
  });
  return raw;
}

async function registerPatient(input) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw ApiError.conflict("An account with this email already exists");

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        email: input.email,
        passwordHash,
        fullName: input.fullName,
        phone: input.phone,
        role: "PATIENT",
        status: "PENDING", // becomes ACTIVE once email is verified
      },
    });

    let patientCode = generatePatientCode();
    // Extremely unlikely collision; retry a few times rather than fail hard.
    for (let attempt = 0; attempt < 5; attempt++) {
      const clash = await tx.patientProfile.findUnique({ where: { patientCode } });
      if (!clash) break;
      patientCode = generatePatientCode();
    }

    await tx.patientProfile.create({
      data: {
        userId: created.id,
        patientCode,
        dateOfBirth: input.dateOfBirth,
        gender: input.gender || "UNSPECIFIED",
        emergencyContactName: input.emergencyContactName,
        emergencyContactPhone: input.emergencyContactPhone,
      },
    });

    return created;
  });

  const rawToken = await createEmailVerificationToken(user.id);
  await sendMail({
    to: user.email,
    subject: "Verify your VidaCare account",
    body: `Welcome to VidaCare. Verify your email with this token: ${rawToken}`,
  });

  await logActivity({
    actorUserId: user.id,
    action: "USER_REGISTERED",
    entityType: "User",
    entityId: user.id,
    summary: `Patient ${user.fullName} registered`,
  });

  return {
    user: publicUser(user),
    devVerificationToken: env.isProduction ? undefined : rawToken,
  };
}

async function registerProvisional(role, input) {
  // Shared by doctor and caregiver signup: both create a PENDING user plus a
  // VerificationRequest for admin review. Neither can access protected
  // functionality until an admin approves them.
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw ApiError.conflict("An account with this email already exists");

  if (role === "DOCTOR") {
    const licenseClash = await prisma.doctorProfile.findUnique({
      where: { licenseNumber: input.licenseNumber },
    });
    if (licenseClash) throw ApiError.conflict("This license number is already registered");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        email: input.email,
        passwordHash,
        fullName: input.fullName,
        phone: input.phone,
        role,
        status: "PENDING",
      },
    });

    if (role === "DOCTOR") {
      await tx.doctorProfile.create({
        data: {
          userId: created.id,
          specialization: input.specialization,
          licenseNumber: input.licenseNumber,
          hospital: input.hospital,
          yearsOfExperience: input.yearsOfExperience || 0,
        },
      });
    } else {
      await tx.caregiverProfile.create({
        data: {
          userId: created.id,
          caregiverType: input.caregiverType,
          yearsOfExperience: input.yearsOfExperience || 0,
          relationshipNotes: input.relationshipNotes,
        },
      });
    }

    await tx.verificationRequest.create({
      data: {
        userId: created.id,
        role,
        status: "PENDING",
        documentType: input.documentType,
        documentReference: input.documentReference,
        issuingBody: input.issuingBody,
        notes: input.notes,
      },
    });

    return created;
  });

  const rawToken = await createEmailVerificationToken(user.id);
  await sendMail({
    to: user.email,
    subject: "Verify your VidaCare account",
    body: `Verify your email with this token: ${rawToken}. Your account also requires admin approval before you can sign in to ${role.toLowerCase()} features.`,
  });

  await logActivity({
    actorUserId: user.id,
    action: "USER_REGISTERED",
    entityType: "User",
    entityId: user.id,
    summary: `${role === "DOCTOR" ? "Doctor" : "Caregiver"} ${user.fullName} applied and is pending verification`,
  });

  return {
    user: publicUser(user),
    devVerificationToken: env.isProduction ? undefined : rawToken,
  };
}

const registerDoctor = (input) => registerProvisional("DOCTOR", input);
const registerCaregiver = (input) => registerProvisional("CAREGIVER", input);

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(401, "Invalid email or password", { code: "INVALID_CREDENTIALS" });

  const match = await comparePassword(password, user.passwordHash);
  if (!match) throw new ApiError(401, "Invalid email or password", { code: "INVALID_CREDENTIALS" });

  if (user.status === "REJECTED") {
    throw new ApiError(403, "Your account application was rejected. Contact support for details.", {
      code: "ACCOUNT_REJECTED",
    });
  }
  if (user.status === "SUSPENDED") {
    throw new ApiError(403, "Your account has been suspended. Contact an administrator.", {
      code: "ACCOUNT_SUSPENDED",
    });
  }
  // PENDING users ARE allowed to log in (they need to see their own status),
  // but every protected route beyond /auth/me is blocked by requireActiveStatus.

  const tokens = await issueTokenPair(user);
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

  await logActivity({
    actorUserId: user.id,
    action: "USER_LOGIN",
    entityType: "User",
    entityId: user.id,
    summary: `${user.fullName} signed in`,
  });

  return { user: publicUser(user), ...tokens };
}

async function refresh({ refreshToken }) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }

  const tokenHash = hashToken(refreshToken);
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash } });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    throw ApiError.unauthorized("Refresh token is no longer valid");
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) throw ApiError.unauthorized("User no longer exists");

  // Rotate: revoke the used token, issue a fresh pair.
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  const tokens = await issueTokenPair(user);

  return { user: publicUser(user), ...tokens };
}

async function logout({ refreshToken }) {
  if (!refreshToken) return;
  const tokenHash = hashToken(refreshToken);
  await prisma.refreshToken.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

async function verifyEmail({ token }) {
  const tokenHash = hashToken(token);
  const record = await prisma.emailVerificationToken.findUnique({ where: { tokenHash } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    throw ApiError.badRequest("Verification link is invalid or has expired");
  }

  const user = await prisma.user.findUnique({ where: { id: record.userId } });
  if (!user) throw ApiError.notFound("User not found");

  await prisma.$transaction([
    prisma.emailVerificationToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifiedAt: new Date(),
        // Patients go straight to ACTIVE on verification. Doctors/caregivers
        // still need admin approval, so their status is left as-is.
        status: user.role === "PATIENT" ? "ACTIVE" : user.status,
      },
    }),
  ]);

  await logActivity({
    actorUserId: user.id,
    action: "EMAIL_VERIFIED",
    entityType: "User",
    entityId: user.id,
    summary: `${user.fullName} verified their email`,
  });

  return { verified: true, role: user.role };
}

async function resendVerification({ email }) {
  const user = await prisma.user.findUnique({ where: { email } });
  // Do not reveal whether the email exists.
  if (!user || user.emailVerifiedAt) {
    return { sent: true };
  }
  const rawToken = await createEmailVerificationToken(user.id);
  await sendMail({
    to: user.email,
    subject: "Verify your VidaCare account",
    body: `Verify your email with this token: ${rawToken}`,
  });
  return { sent: true, devVerificationToken: env.isProduction ? undefined : rawToken };
}

async function forgotPassword({ email }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { sent: true }; // do not reveal account existence

  const raw = generateRawToken();
  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash: hashToken(raw), expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
  });
  await sendMail({
    to: user.email,
    subject: "Reset your VidaCare password",
    body: `Reset your password with this token (valid 1 hour): ${raw}`,
  });

  return { sent: true, devResetToken: env.isProduction ? undefined : raw };
}

async function resetPassword({ token, password }) {
  const tokenHash = hashToken(token);
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    throw ApiError.badRequest("Reset link is invalid or has expired");
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash, mustChangePassword: false } }),
    // Invalidate all existing sessions on password reset.
    prisma.refreshToken.updateMany({
      where: { userId: record.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  await logActivity({
    actorUserId: record.userId,
    action: "PASSWORD_RESET",
    entityType: "User",
    entityId: record.userId,
    summary: "Password was reset",
  });

  return { reset: true };
}

async function getMe(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { patientProfile: true, doctorProfile: true, caregiverProfile: true },
  });
  if (!user) throw ApiError.notFound("User not found");
  return publicUser(user);
}

module.exports = {
  registerPatient,
  registerDoctor,
  registerCaregiver,
  login,
  refresh,
  logout,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
  publicUser,
};
