const bcrypt = require("bcryptjs");
const env = require("../config/env");

async function hashPassword(plain) {
  return bcrypt.hash(plain, env.bcryptSaltRounds);
}

async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

// At least 8 chars, one uppercase, one lowercase, one number.
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function isStrongPassword(plain) {
  return PASSWORD_REGEX.test(plain);
}

module.exports = { hashPassword, comparePassword, isStrongPassword, PASSWORD_REGEX };
