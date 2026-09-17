const prisma = require("../config/db");
const { hashPassword } = require("../utils/password");
const env = require("../config/env");

// Creates the single initial admin account from env vars if one does not
// already exist. This is the ONLY way an ADMIN account is ever created —
// there is no public admin signup endpoint anywhere in the API.
async function ensureAdmin() {
  const existing = await prisma.user.findUnique({ where: { email: env.adminSeed.email } });
  if (existing) {
    console.log(`Admin already exists: ${env.adminSeed.email}`);
    return existing;
  }

  const passwordHash = await hashPassword(env.adminSeed.password);
  const admin = await prisma.user.create({
    data: {
      email: env.adminSeed.email,
      passwordHash,
      fullName: env.adminSeed.name,
      role: "ADMIN",
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
    },
  });

  console.log(`Created admin account: ${admin.email}`);
  return admin;
}

if (require.main === module) {
  ensureAdmin()
    .then(() => prisma.$disconnect())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { ensureAdmin };
