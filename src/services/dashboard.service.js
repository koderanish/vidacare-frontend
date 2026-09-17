const prisma = require("../config/db");

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function getStats() {
  const thirtyDaysAgo = daysAgo(30);

  const [
    totalPatients,
    totalDoctors,
    totalCaregivers,
    pendingDoctorVerifications,
    pendingCaregiverVerifications,
    activeAlerts,
    activeTreatmentPlans,
    newUsers,
  ] = await Promise.all([
    prisma.patientProfile.count(),
    prisma.user.count({ where: { role: "DOCTOR", status: "ACTIVE" } }),
    prisma.user.count({ where: { role: "CAREGIVER", status: "ACTIVE" } }),
    prisma.verificationRequest.count({ where: { role: "DOCTOR", status: "PENDING" } }),
    prisma.verificationRequest.count({ where: { role: "CAREGIVER", status: "PENDING" } }),
    prisma.alert.count({ where: { status: "OPEN" } }),
    prisma.treatmentPlan.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
  ]);

  return {
    totalPatients,
    totalDoctors,
    totalCaregivers,
    pendingDoctorVerifications,
    pendingCaregiverVerifications,
    activeAlerts,
    activeTreatmentPlans,
    newUsers,
  };
}

// 7 daily points: count of vitals recorded per day (a simple proxy for
// "patient activity" that the dashboard chart can render directly).
async function getPatientActivityChart() {
  const since = daysAgo(6);
  const rows = await prisma.vital.findMany({
    where: { recordedAt: { gte: since } },
    select: { recordedAt: true },
  });

  const buckets = new Map();
  for (let i = 0; i < 7; i++) {
    const d = daysAgo(6 - i);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }
  for (const row of rows) {
    const key = row.recordedAt.toISOString().slice(0, 10);
    if (buckets.has(key)) buckets.set(key, buckets.get(key) + 1);
  }

  return Array.from(buckets.entries()).map(([date, count]) => ({ date, count }));
}

// 6 monthly points: user registrations per month.
async function getRegistrationChart() {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() });
  }

  const start = new Date(months[0].year, months[0].month, 1);
  const users = await prisma.user.findMany({ where: { createdAt: { gte: start } }, select: { createdAt: true } });

  const counts = months.map(() => 0);
  for (const u of users) {
    const idx = months.findIndex(
      (m) => m.year === u.createdAt.getFullYear() && m.month === u.createdAt.getMonth()
    );
    if (idx >= 0) counts[idx] += 1;
  }

  return months.map((m, idx) => ({
    label: new Date(m.year, m.month, 1).toLocaleString("en-US", { month: "short", year: "numeric" }),
    count: counts[idx],
  }));
}

async function getRecentActivity(limit = 10) {
  return prisma.activityLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { actor: { select: { id: true, fullName: true, role: true } } },
  });
}

module.exports = { getStats, getPatientActivityChart, getRegistrationChart, getRecentActivity };
