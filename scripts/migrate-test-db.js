// Applies pending migrations to the isolated test database (.env.test)
// before the Jest suite runs. Kept as a tiny script rather than a new
// dependency (e.g. dotenv-cli) since dotenv is already installed.
const path = require("path");
const { spawnSync } = require("child_process");

require("dotenv").config({ path: path.join(__dirname, "..", ".env.test"), override: true });

const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
