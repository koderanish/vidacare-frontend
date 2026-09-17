class ApiError extends Error {
  constructor(statusCode, message, { code, errors } = {}) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || "ERROR";
    this.errors = errors || undefined;
    Error.captureStackTrace?.(this, ApiError);
  }

  static badRequest(message, opts) {
    return new ApiError(400, message, opts);
  }
  static unauthorized(message = "Authentication required", opts) {
    return new ApiError(401, message, { code: "UNAUTHENTICATED", ...opts });
  }
  static forbidden(message = "You do not have access to this resource", opts) {
    return new ApiError(403, message, { code: "FORBIDDEN", ...opts });
  }
  static notFound(message = "Resource not found", opts) {
    return new ApiError(404, message, { code: "NOT_FOUND", ...opts });
  }
  static conflict(message, opts) {
    return new ApiError(409, message, { code: "CONFLICT", ...opts });
  }
  static unprocessable(message = "Validation failed", opts) {
    return new ApiError(422, message, { code: "VALIDATION_ERROR", ...opts });
  }
  static internal(message = "Internal server error", opts) {
    return new ApiError(500, message, { code: "INTERNAL_ERROR", ...opts });
  }
}

module.exports = ApiError;
