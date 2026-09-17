const prisma = require("../config/db");
const { ensureAdmin } = require("./admin.seed");
const { seedDemoData } = require("./demoData");

async function main() {
  console.log("=== VidaCare demo seed ===\n");

  await ensureAdmin();

  const existingPatients = await prisma.patientProfile.count();
  if (existingPatients > 0) {
    console.log(
      `\nDatabase already has ${existingPatients} patient(s). Skipping demo data seed to avoid duplicates.`
    );
    console.log("To reseed from scratch: npx prisma migrate reset (drops and recreates the database), then npm run seed.");
    return;
  }

  await seedDemoData();
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
