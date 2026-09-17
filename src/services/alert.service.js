const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");
const { logActivity } = require("./activity.service");

let settingsCache = null;

// Alert thresholds are configurable (via /api/admin/alert-settings) but
// change rarely, so we cache the singleton row in-process and invalidate on
// write. This avoids a settings lookup on every vital insert while keeping
// prototype scope (no Redis).
async function getSettings() {
  if (settingsCache) return settingsCache;
  let settings = await prisma.alertSettings.findFirst();
  if (!settings) {
    settings = await prisma.alertSettings.create({ data: {} });
  }
  settingsCache = settings;
  return settings;
}

async function updateSettings(patch, actor) {
  const current = await getSettings();
  const updated = await prisma.alertSettings.update({
    where: { id: current.id },
    data: { ...patch, updatedById: actor.id },
  });
  settingsCache = updated;
  await logActivity({
    actorUserId: actor.id,
    action: "ALERT_SETTINGS_UPDATED",
    entityType: "AlertSettings",
    entityId: updated.id,
    summary: "Alert thresholds were updated",
  });
  return updated;
}

async function notifyCareTeam(patientId, alert) {
  const patient = await prisma.patientProfile.findUnique({ where: { id: patientId } });
  const recipients = [patient.userId];

  const [doctorAssignment, caregiverAssignment] = await Promise.all([
    prisma.patientDoctorAssignment.findFirst({ where: { patientId, status: "ACTIVE" } }),
    prisma.patientCaregiverAssignment.findFirst({ where: { patientId, status: "ACTIVE" } }),
  ]);
  if (doctorAssignment) recipients.push(doctorAssignment.doctorId);
  if (caregiverAssignment && caregiverAssignment.canReceiveAlerts) recipients.push(caregiverAssignment.caregiverId);

  await prisma.notification.createMany({
    data: recipients.map((recipientUserId) => ({
      recipientUserId,
      type: "HEALTH_ALERT",
      title: alert.title,
      body: alert.message,
      entityType: "Alert",
      entityId: alert.id,
    })),
  });
}

/**
 * Evaluates a newly-created vital against configured thresholds and creates
 * a prototype monitoring alert if crossed. These are explicitly NOT medical
 * diagnoses — see alert copy and docs/ASSUMPTIONS.md.
 */
async function evaluateVitalForAlerts(vital) {
  const settings = await getSettings();
  const candidates = [];

  if (vital.type === "BLOOD_PRESSURE") {
    if (vital.valuePrimary > settings.systolicMax || (vital.valueSecondary ?? 0) > settings.diastolicMax) {
      candidates.push({
        type: "HIGH_BLOOD_PRESSURE",
        title: "High Blood Pressure",
        message: `Reading ${vital.valuePrimary}/${vital.valueSecondary} mmHg exceeded the configured threshold.`,
        severity: "HIGH",
        thresholdDescription: `Above ${settings.systolicMax}/${settings.diastolicMax} mmHg`,
      });
    }
  } else if (vital.type === "SPO2") {
    if (vital.valuePrimary < settings.spo2Min) {
      candidates.push({
        type: "LOW_SPO2",
        title: "Low SpO2",
        message: `SpO2 reading of ${vital.valuePrimary}% fell below the configured threshold.`,
        severity: "HIGH",
        thresholdDescription: `Below ${settings.spo2Min}%`,
      });
    }
  } else if (vital.type === "BLOOD_SUGAR") {
    if (vital.valuePrimary > settings.bloodSugarMax) {
      candidates.push({
        type: "ELEVATED_BLOOD_SUGAR",
        title: "Elevated Blood Sugar",
        message: `Blood sugar reading of ${vital.valuePrimary} mg/dL exceeded the configured threshold.`,
        severity: "MEDIUM",
        thresholdDescription: `Above ${settings.bloodSugarMax} mg/dL`,
      });
    }
  } else if (vital.type === "HEART_RATE") {
    if (vital.valuePrimary < settings.heartRateMin || vital.valuePrimary > settings.heartRateMax) {
      candidates.push({
        type: "ABNORMAL_HEART_RATE",
        title: "Abnormal Heart Rate",
        message: `Heart rate reading of ${vital.valuePrimary} bpm is outside the configured range.`,
        severity: "MEDIUM",
        thresholdDescription: `Outside ${settings.heartRateMin}-${settings.heartRateMax} bpm`,
      });
    }
  }

  const created = [];
  for (const candidate of candidates) {
    const alert = await prisma.alert.create({
      data: { patientId: vital.patientId, vitalId: vital.id, status: "OPEN", ...candidate },
    });
    await notifyCareTeam(vital.patientId, alert);
    created.push(alert);
  }
  return created;
}

/** Creates a MISSED_READING alert for a patient with no recent vitals. Idempotent per open alert. */
async function createMissedReadingAlert(patientId) {
  const existingOpen = await prisma.alert.findFirst({
    where: { patientId, type: "MISSED_READING", status: "OPEN" },
  });
  if (existingOpen) return null;

  const settings = await getSettings();
  const alert = await prisma.alert.create({
    data: {
      patientId,
      type: "MISSED_READING",
      title: "Missed Health Reading",
      message: `No vital readings submitted in the last ${settings.missedReadingHours} hours.`,
      severity: "MEDIUM",
      status: "OPEN",
      thresholdDescription: `No reading for ${settings.missedReadingHours}h`,
    },
  });
  await notifyCareTeam(patientId, alert);
  return alert;
}

async function listAlerts(query, scope = {}) {
  const { page, limit, skip } = parsePagination(query);
  const where = { ...scope };
  if (query.status) where.status = query.status;
  if (query.severity) where.severity = query.severity;
  if (query.patientId) where.patientId = query.patientId;

  const [items, total] = await Promise.all([
    prisma.alert.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { patient: { include: { user: true } }, vital: true },
    }),
    prisma.alert.count({ where }),
  ]);

  return { items, pagination: buildPagination(page, limit, total) };
}

async function getAlertById(id) {
  const alert = await prisma.alert.findUnique({
    where: { id },
    include: { patient: { include: { user: true } }, vital: true, reviewedBy: true },
  });
  if (!alert) throw ApiError.notFound("Alert not found");
  return alert;
}

async function reviewAlert(id, actor) {
  const alert = await getAlertById(id);
  if (alert.status === "RESOLVED") throw ApiError.badRequest("Alert is already resolved");

  const updated = await prisma.alert.update({
    where: { id },
    data: { status: "REVIEWED", reviewedById: actor.id, reviewedAt: new Date() },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "ALERT_REVIEWED",
    entityType: "Alert",
    entityId: id,
    summary: `Alert "${alert.title}" marked as reviewed`,
  });

  return updated;
}

async function resolveAlert(id, actor) {
  const alert = await getAlertById(id);

  const updated = await prisma.alert.update({
    where: { id },
    data: {
      status: "RESOLVED",
      resolvedAt: new Date(),
      reviewedById: alert.reviewedById || actor.id,
      reviewedAt: alert.reviewedAt || new Date(),
    },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "ALERT_RESOLVED",
    entityType: "Alert",
    entityId: id,
    summary: `Alert "${alert.title}" marked as resolved`,
  });

  return updated;
}

module.exports = {
  getSettings,
  updateSettings,
  evaluateVitalForAlerts,
  createMissedReadingAlert,
  listAlerts,
  getAlertById,
  reviewAlert,
  resolveAlert,
};
