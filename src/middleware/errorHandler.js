const ApiError = require("../utils/apiError");
const env = require("../config/env");

function notFound(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

// Centralized error handler. Recognizes ApiError, Prisma known-request
// errors (unique constraint, record not found, FK violation), and falls
// back to a generic 500 without leaking internals in production.
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      ...(err.errors ? { errors: err.errors } : {}),
    });
  }

  if (err && err.code && typeof err.code === "string" && err.code.startsWith("P")) {
    // Prisma error codes: https://www.prisma.io/docs/orm/reference/error-reference
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: `A record with this ${(err.meta?.target || []).join(", ") || "value"} already exists`,
        code: "CONFLICT",
      });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ success: false, message: "Record not found", code: "NOT_FOUND" });
    }
    if (err.code === "P2003") {
      return res.status(400).json({
        success: false,
        message: "This operation references a record that does not exist",
        code: "VALIDATION_ERROR",
      });
    }
  }

  if (err && err.message && err.message.startsWith("CORS:")) {
    return res.status(403).json({ success: false, message: err.message, code: "FORBIDDEN" });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: env.isProduction ? "Internal server error" : err.message || "Internal server error",
    code: "INTERNAL_ERROR",
  });
}

module.exports = { notFound, errorHandler };
