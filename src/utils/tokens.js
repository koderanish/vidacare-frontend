const crypto = require("crypto");

// Generates a random opaque token for email verification / password reset /
// refresh tokens. Only the SHA-256 hash is stored in the database; the raw
// value is returned to the caller (and, in dev mode, logged/returned) so a
// leaked database never exposes usable tokens.
function generateRawToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(rawToken) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

module.exports = { generateRawToken, hashToken };
