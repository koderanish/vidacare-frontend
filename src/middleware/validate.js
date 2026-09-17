const ApiError = require("../utils/apiError");

// Wraps a Zod schema. Validates and REPLACES req.body/query/params with the
// parsed (and coerced/defaulted) result so downstream code can trust shapes.
function validate(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return next(ApiError.unprocessable("Validation failed", { errors }));
    }
    req[source] = result.data;
    next();
  };
}

module.exports = validate;
