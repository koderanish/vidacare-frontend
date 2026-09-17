const { PrismaClient } = require("@prisma/client");
const env = require("./env");

const prisma = new PrismaClient({
  log: env.isProduction ? ["error", "warn"] : ["warn", "error"],
});

module.exports = prisma;
