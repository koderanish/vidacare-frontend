const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signAccessToken(payload) {
  return jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpiresIn });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret);
}

function signRefreshToken(payload) {
  // jti ensures two refresh tokens issued for the same user within the same
  // second (e.g. rapid re-login, two tabs) are never byte-identical — the
  // stored SHA-256 hash of the token must be unique per row.
  const jti = crypto.randomBytes(16).toString("hex");
  return jwt.sign({ ...payload, jti }, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwt.refreshSecret);
}

module.exports = { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken };
