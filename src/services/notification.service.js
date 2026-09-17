const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { parsePagination, buildPagination } = require("../utils/pagination");

async function listForUser(userId, query) {
  const { page, limit, skip } = parsePagination(query);
  const where = { recipientUserId: userId };
  if (query.unreadOnly) where.readAt = null;

  const [items, total, unreadCount] = await Promise.all([
    prisma.notification.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.notification.count({ where }),
    prisma.notification.count({ where: { recipientUserId: userId, readAt: null } }),
  ]);

  return { items, pagination: buildPagination(page, limit, total), unreadCount };
}

async function markRead(id, userId) {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.recipientUserId !== userId) {
    throw ApiError.notFound("Notification not found");
  }
  return prisma.notification.update({ where: { id }, data: { readAt: new Date() } });
}

async function markAllRead(userId) {
  await prisma.notification.updateMany({
    where: { recipientUserId: userId, readAt: null },
    data: { readAt: new Date() },
  });
  return { marked: true };
}

async function remove(id, userId) {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.recipientUserId !== userId) {
    throw ApiError.notFound("Notification not found");
  }
  await prisma.notification.delete({ where: { id } });
}

module.exports = { listForUser, markRead, markAllRead, remove };
