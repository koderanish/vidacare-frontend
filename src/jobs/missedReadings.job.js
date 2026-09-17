const cron = require("node-cron");
const prisma = require("../config/db");
const alertService = require("../services/alert.service");
const { logActivity } = require("../services/activity.service");
const env = require("../config/env");

// Runs once daily (03:00 server time). For every patient whose most recent
// vital (of any type) is older than the configured threshold — or who has
// never recorded one — creates a MISSED_READING alert. No queue/worker
// infrastructure: a single in-process cron job is sufficient for a
// prototype's data volume.
async function sweepMissedReadings() {
  const settings = await alertService.getSettings();
  const thresholdHours = settings.missedReadingHours || env.missedReadingHours;
  const cutoff = new Date(Date.now() - thresholdHours * 60 * 60 * 1000);

  const patients = await prisma.patientProfile.findMany({ select: { id: true } });
  let createdCount = 0;

  for (const patient of patients) {
    const latest = await prisma.vital.findFirst({
      where: { patientId: patient.id },
      orderBy: { recordedAt: "desc" },
      select: { recordedAt: true },
    });
    const isMissed = !latest || latest.recordedAt < cutoff;
    if (isMissed) {
      const alert = await alertService.createMissedReadingAlert(patient.id);
      if (alert) createdCount += 1;
    }
  }

  if (createdCount > 0) {
    await logActivity({
      action: "MISSED_READING_SWEEP",
      entityType: "System",
      summary: `Missed-reading sweep created ${createdCount} alert(s)`,
    });
  }

  return createdCount;
}

function startMissedReadingJob() {
  // 03:00 every day.
  cron.schedule("0 3 * * *", () => {
    sweepMissedReadings().catch((err) => console.error("Missed-reading sweep failed:", err));
  });
  console.log("Missed-reading job scheduled: daily at 03:00");
}

module.exports = { startMissedReadingJob, sweepMissedReadings };
