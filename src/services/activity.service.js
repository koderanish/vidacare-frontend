const prisma = require("../config/db");

// Records an entry in the audit/activity trail. Never throws to the caller
// on failure — activity logging must not break the primary operation — but
// logs the failure loudly so it is visible in development.
async function logActivity({ actorUserId = null, action, entityType, entityId = null, summary }) {
  try {
    await prisma.activityLog.create({
      data: { actorUserId, action, entityType, entityId, summary },
    });
  } catch (err) {
    console.error("Failed to write activity log:", err.message);
  }
}

module.exports = { logActivity };
