const prisma = require("../config/db");
const ApiError = require("../utils/apiError");
const { verifyAccessToken } = require("../utils/jwt");

// Populates req.user from a valid Bearer access token. Does NOT check
// account status — that is requireActiveStatus's job, applied selectively
// so that PENDING users can still hit /auth/me and read-only "my status"
// endpoints.
async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
      throw ApiError.unauthorized("Missing or malformed Authorization header");
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      throw ApiError.unauthorized("Invalid or expired access token");
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw ApiError.unauthorized("User no longer exists");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticate;
