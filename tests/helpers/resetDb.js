const prisma = require("../../src/config/db");

// Wipes all application tables between test runs/suites. Uses TRUNCATE ...
// CASCADE for speed and to avoid hand-maintaining FK deletion order. Test-DB
// only — never call this against a real database.
async function resetDb() {
  const tables = [
    "refresh_tokens",
    "email_verification_tokens",
    "password_reset_tokens",
    "activity_log",
    "user_status_changes",
    "notifications",
    "alerts",
    "alert_settings",
    "treatment_plan_events",
    "medications",
    "treatment_plans",
    "journal_entries",
    "vitals",
    "patient_caregiver_assignments",
    "patient_doctor_assignments",
    "verification_requests",
    "health_resources",
    "caregiver_profiles",
    "doctor_profiles",
    "patient_profiles",
    "users",
  ];
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables.map((t) => `"${t}"`).join(", ")} CASCADE`);
}

module.exports = { resetDb };
