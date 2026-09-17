const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { logActivity } = require("./activity.service");

async function createPlan(input, actor) {
  // Business rule: one ACTIVE plan per patient. Archive any existing one first.
  const plan = await prisma.$transaction(async (tx) => {
    await tx.treatmentPlan.updateMany({
      where: { patientId: input.patientId, status: "ACTIVE" },
      data: { status: "ARCHIVED" },
    });

    const created = await tx.treatmentPlan.create({
      data: {
        patientId: input.patientId,
        doctorId: actor.id,
        title: input.title,
        description: input.description,
        startDate: input.startDate,
        endDate: input.endDate,
        status: "ACTIVE",
      },
    });

    if (input.medications?.length) {
      await tx.medication.createMany({
        data: input.medications.map((m, idx) => ({ ...m, treatmentPlanId: created.id, sortOrder: idx })),
      });
    }

    await tx.treatmentPlanEvent.create({
      data: {
        treatmentPlanId: created.id,
        actorUserId: actor.id,
        eventType: "PLAN_CREATED",
        description: `Plan created by ${actor.fullName}`,
      },
    });

    return created;
  });

  await logActivity({
    actorUserId: actor.id,
    action: "TREATMENT_PLAN_CREATED",
    entityType: "TreatmentPlan",
    entityId: plan.id,
    summary: `Treatment plan "${plan.title}" created`,
  });

  return getPlanById(plan.id);
}

async function getPlanById(id) {
  const plan = await prisma.treatmentPlan.findUnique({
    where: { id },
    include: {
      medications: { orderBy: { sortOrder: "asc" } },
      events: { orderBy: { createdAt: "desc" } },
      doctor: true,
    },
  });
  if (!plan) throw ApiError.notFound("Treatment plan not found");
  return plan;
}

async function listPlansForPatient(patientId) {
  return prisma.treatmentPlan.findMany({
    where: { patientId },
    include: { medications: { orderBy: { sortOrder: "asc" } }, doctor: true },
    orderBy: { createdAt: "desc" },
  });
}

async function updatePlan(id, patch, actor) {
  const plan = await getPlanById(id);

  const data = { ...patch };
  if (patch.markReviewed) {
    data.lastReviewedAt = new Date();
    delete data.markReviewed;
  }

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.treatmentPlan.update({ where: { id }, data });
    await tx.treatmentPlanEvent.create({
      data: {
        treatmentPlanId: id,
        actorUserId: actor.id,
        eventType: "PLAN_UPDATED",
        description: `Plan updated by ${actor.fullName}`,
      },
    });
    return result;
  });

  await logActivity({
    actorUserId: actor.id,
    action: "TREATMENT_PLAN_UPDATED",
    entityType: "TreatmentPlan",
    entityId: id,
    summary: `Treatment plan "${plan.title}" updated`,
  });

  return getPlanById(updated.id);
}

async function addMedication(planId, input, actor) {
  await getPlanById(planId);
  const count = await prisma.medication.count({ where: { treatmentPlanId: planId } });
  const medication = await prisma.medication.create({
    data: { ...input, treatmentPlanId: planId, sortOrder: count },
  });

  await prisma.treatmentPlanEvent.create({
    data: {
      treatmentPlanId: planId,
      actorUserId: actor.id,
      eventType: "MEDICATION_ADDED",
      description: `${input.name} added by ${actor.fullName}`,
    },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "MEDICATION_ADDED",
    entityType: "TreatmentPlan",
    entityId: planId,
    summary: `Medication "${input.name}" added`,
  });

  return medication;
}

async function updateMedication(medicationId, patch, actor) {
  const medication = await prisma.medication.findUnique({ where: { id: medicationId } });
  if (!medication) throw ApiError.notFound("Medication not found");

  const updated = await prisma.medication.update({ where: { id: medicationId }, data: patch });

  await prisma.treatmentPlanEvent.create({
    data: {
      treatmentPlanId: medication.treatmentPlanId,
      actorUserId: actor.id,
      eventType: "MEDICATION_UPDATED",
      description: `${medication.name} updated by ${actor.fullName}`,
    },
  });

  return updated;
}

async function deleteMedication(medicationId, actor) {
  const medication = await prisma.medication.findUnique({ where: { id: medicationId } });
  if (!medication) throw ApiError.notFound("Medication not found");

  await prisma.medication.delete({ where: { id: medicationId } });

  await prisma.treatmentPlanEvent.create({
    data: {
      treatmentPlanId: medication.treatmentPlanId,
      actorUserId: actor.id,
      eventType: "MEDICATION_REMOVED",
      description: `${medication.name} removed by ${actor.fullName}`,
    },
  });
}

module.exports = {
  createPlan,
  getPlanById,
  listPlansForPatient,
  updatePlan,
  addMedication,
  updateMedication,
  deleteMedication,
};
