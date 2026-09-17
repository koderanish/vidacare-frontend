const asyncHandler = require("../middleware/asyncHandler");
const { ok, paginated } = require("../utils/response");
const notificationService = require("../services/notification.service");

exports.list = asyncHandler(async (req, res) => {
  const { items, pagination, unreadCount } = await notificationService.listForUser(req.user.id, req.query);
  paginated(res, items, { ...pagination, unreadCount }, "Notifications retrieved successfully");
});

exports.markRead = asyncHandler(async (req, res) => {
  ok(res, await notificationService.markRead(req.params.id, req.user.id), "Notification marked as read");
});

exports.markAllRead = asyncHandler(async (req, res) => {
  ok(res, await notificationService.markAllRead(req.user.id), "All notifications marked as read");
});

exports.remove = asyncHandler(async (req, res) => {
  await notificationService.remove(req.params.id, req.user.id);
  ok(res, null, "Notification deleted successfully");
});
