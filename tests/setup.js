// Loaded before any test file via jest's setupFiles. Points the app at the
// isolated test database (.env.test) instead of the dev database, so tests
// never touch demo data. Must run before src/config/env.js is first
// required by anything (dotenv does not override already-set variables).
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.test") });
