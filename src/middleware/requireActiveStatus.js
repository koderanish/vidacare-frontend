const ApiError = require("../utils/apiError");

const STATUS_MESSAGES = {
  PENDING: {
    code: "ACCOUNT_PENDING_VERIFICATION",
    message: "Your account is pending admin verification. You will gain access once approved.",
  },
  REJECTED: {
    code: "ACCOUNT_REJECTED",
    message: "Your account application was rejected. Contact support for details.",
  },
  SUSPENDED: {
    code: "ACCOUNT_SUSPENDED",
    message: "Your account has been suspended. Contact an administrator.",
  },
};

// Blocks any non-ACTIVE account from protected functionality. Applied after
// `authenticate` on every route except auth/self endpoints, so a PENDING
// doctor or caregiver can still log in and see their own status but nothing
// else.
function requireActiveStatus(req, res, next) {
  if (!req.user) return next(ApiError.unauthorized());
  if (req.user.status === "ACTIVE") return next();

  const info = STATUS_MESSAGES[req.user.status] || {
    code: "FORBIDDEN",
    message: "Your account cannot access this resource.",
  };
  return next(new (require("../utils/apiError"))(403, info.message, { code: info.code }));
}

module.exports = requireActiveStatus;
