const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");
const { logActivity } = require("./activity.service");
const alertService = require("./alert.service");

const DEFAULT_UNITS = {
  BLOOD_PRESSURE: "mmHg",
  HEART_RATE: "bpm",
  SPO2: "%",
  BLOOD_SUGAR: "mg/dL",
  WEIGHT: "kg",
};

async function createVital(input, actor) {
  const unit = input.unit || DEFAULT_UNITS[input.type];

  const vital = await prisma.vital.create({
    data: {
      patientId: input.patientId,
      type: input.type,
      valuePrimary: input.valuePrimary,
      valueSecondary: input.valueSecondary,
      unit,
      source: input.source || "MANUAL",
      recordedAt: input.recordedAt || new Date(),
      notes: input.notes,
      createdById: actor.id,
    },
  });

  const alerts = await alertService.evaluateVitalForAlerts(vital);

  await logActivity({
    actorUserId: actor.id,
    action: "VITAL_RECORDED",
    entityType: "Vital",
    entityId: vital.id,
    summary: `${input.type.replace("_", " ")} reading recorded`,
  });

  return { vital, alertsCreated: alerts };
}

async function listVitalsForPatient(patientId, query) {
  const { page, limit, skip } = parsePagination(query, { defaultLimit: 50, maxLimit: 200 });
  const where = { patientId };
  if (query.type) where.type = query.type;
  if (query.from || query.to) {
    where.recordedAt = {};
    if (query.from) where.recordedAt.gte = query.from;
    if (query.to) where.recordedAt.lte = query.to;
  }

  const [items, total] = await Promise.all([
    prisma.vital.findMany({ where, skip, take: limit, orderBy: { recordedAt: "desc" } }),
    prisma.vital.count({ where }),
  ]);

  return { items, pagination: buildPagination(page, limit, total) };
}

// One most-recent reading per vital type, for the profile summary cards.
async function getLatestVitals(patientId) {
  const types = ["BLOOD_PRESSURE", "HEART_RATE", "SPO2", "BLOOD_SUGAR", "WEIGHT"];
  const results = await Promise.all(
    types.map((type) =>
      prisma.vital.findFirst({ where: { patientId, type }, orderBy: { recordedAt: "desc" } })
    )
  );
  return types.reduce((acc, type, idx) => {
    acc[type] = results[idx] || null;
    return acc;
  }, {});
}

// Daily-bucketed trend points for chart rendering (avg per day per type).
async function getVitalTrends(patientId, { type, days = 7 }) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const where = { patientId, recordedAt: { gte: since } };
  if (type) where.type = type;

  const rows = await prisma.vital.findMany({ where, orderBy: { recordedAt: "asc" } });

  const buckets = new Map();
  for (const row of rows) {
    const day = row.recordedAt.toISOString().slice(0, 10);
    const key = `${row.type}|${day}`;
    if (!buckets.has(key)) buckets.set(key, { type: row.type, date: day, primarySum: 0, secondarySum: 0, count: 0 });
    const bucket = buckets.get(key);
    bucket.primarySum += row.valuePrimary;
    bucket.secondarySum += row.valueSecondary || 0;
    bucket.count += 1;
  }

  return Array.from(buckets.values()).map((b) => ({
    type: b.type,
    date: b.date,
    valuePrimary: Math.round((b.primarySum / b.count) * 10) / 10,
    valueSecondary: b.secondarySum ? Math.round((b.secondarySum / b.count) * 10) / 10 : null,
  }));
}

async function getVitalById(id) {
  const vital = await prisma.vital.findUnique({ where: { id } });
  if (!vital) throw ApiError.notFound("Vital not found");
  return vital;
}

async function updateVital(id, patch, actor) {
  await getVitalById(id);
  const vital = await prisma.vital.update({ where: { id }, data: patch });

  await logActivity({
    actorUserId: actor.id,
    action: "VITAL_UPDATED",
    entityType: "Vital",
    entityId: id,
    summary: "Vital reading updated",
  });

  return vital;
}

async function deleteVital(id, actor) {
  await getVitalById(id);
  await prisma.vital.delete({ where: { id } });

  await logActivity({
    actorUserId: actor.id,
    action: "VITAL_DELETED",
    entityType: "Vital",
    entityId: id,
    summary: "Vital reading deleted",
  });
}

module.exports = {
  createVital,
  listVitalsForPatient,
  getLatestVitals,
  getVitalTrends,
  getVitalById,
  updateVital,
  deleteVital,
  DEFAULT_UNITS,
};
