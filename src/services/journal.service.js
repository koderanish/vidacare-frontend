const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");
const { logActivity } = require("./activity.service");

async function createEntry(input, actor) {
  const entry = await prisma.journalEntry.create({
    data: {
      patientId: input.patientId,
      mood: input.mood,
      painLevel: input.painLevel,
      symptoms: input.symptoms || [],
      notes: input.notes,
      entryDate: input.entryDate || new Date(),
    },
  });

  await logActivity({
    actorUserId: actor.id,
    action: "JOURNAL_ENTRY_CREATED",
    entityType: "JournalEntry",
    entityId: entry.id,
    summary: "Journal entry created",
  });

  return entry;
}

async function listEntriesForPatient(patientId, query) {
  const { page, limit, skip } = parsePagination(query);
  const where = { patientId };
  if (query.mood) where.mood = query.mood;
  if (query.from || query.to) {
    where.entryDate = {};
    if (query.from) where.entryDate.gte = query.from;
    if (query.to) where.entryDate.lte = query.to;
  }
  if (query.q) {
    where.OR = [
      { notes: { contains: query.q, mode: "insensitive" } },
      { symptoms: { has: query.q } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.journalEntry.findMany({ where, skip, take: limit, orderBy: { entryDate: "desc" } }),
    prisma.journalEntry.count({ where }),
  ]);

  return { items, pagination: buildPagination(page, limit, total) };
}

async function getEntryById(id) {
  const entry = await prisma.journalEntry.findUnique({ where: { id } });
  if (!entry) throw ApiError.notFound("Journal entry not found");
  return entry;
}

async function updateEntry(id, patch, actor) {
  await getEntryById(id);
  const entry = await prisma.journalEntry.update({ where: { id }, data: patch });

  await logActivity({
    actorUserId: actor.id,
    action: "JOURNAL_ENTRY_UPDATED",
    entityType: "JournalEntry",
    entityId: id,
    summary: "Journal entry updated",
  });

  return entry;
}

async function deleteEntry(id, actor) {
  await getEntryById(id);
  await prisma.journalEntry.delete({ where: { id } });

  await logActivity({
    actorUserId: actor.id,
    action: "JOURNAL_ENTRY_DELETED",
    entityType: "JournalEntry",
    entityId: id,
    summary: "Journal entry deleted",
  });
}

module.exports = { createEntry, listEntriesForPatient, getEntryById, updateEntry, deleteEntry };
