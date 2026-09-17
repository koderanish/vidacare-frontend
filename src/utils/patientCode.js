// Generates a human-readable patient code like "VC-10482". Not guaranteed
// globally unique on its own — callers should retry on a unique constraint
// violation, which is astronomically rare but not impossible.
function generatePatientCode() {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `VC-${n}`;
}

module.exports = { generatePatientCode };
