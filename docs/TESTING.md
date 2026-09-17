# Testing

## Automated: Jest + Supertest

```bash
npm test
```

This runs `pretest` (`node scripts/migrate-test-db.js`, applying migrations
to the isolated test database) then the suite via `jest --runInBand --silent`.

**Setup required once**, before the first run — create the test database:

```bash
psql -U <your-pg-user> -d postgres -c "CREATE DATABASE vidacare_test_db OWNER <your-pg-user>;"
```

and a `.env.test` file (same shape as `.env.example`, pointed at
`vidacare_test_db` instead of your dev database). `tests/setup.js` loads it
automatically before the app is required, so tests never touch dev/demo
data. `tests/helpers/resetDb.js` truncates all tables at the start of each
test file.

### Coverage

- **`tests/auth.test.js`** (13 tests) — patient/doctor/caregiver signup,
  duplicate email, weak password rejection, login while PENDING, wrong
  password, email verification (including reuse rejection), duplicate
  license number, admin-has-no-public-signup, refresh token rotation +
  reuse rejection, logout revocation.
- **`tests/authorization.test.js`** (27 tests) — the highest-risk surface:
  - Patient can access own data, cannot access another patient's.
  - **Doctor with an unrelated assignment is rejected** — the explicit proof
    that role alone (`DOCTOR`) is not sufficient; only an active
    `PatientDoctorAssignment` grants access.
  - Same proof for caregivers, plus **per-assignment permission flags**
    (a caregiver with `canViewJournal: false` is blocked from that one
    resource while still allowed vitals).
  - Admin bypasses assignment checks (by design).
  - Non-admins (`doctor`, `caregiver`, `patient`) are all blocked from every
    admin-only route.
  - Unauthenticated requests (missing token, garbage token) → 401.
  - SUSPENDED/REJECTED accounts blocked at login with the correct `code`.
  - Malformed IDs and nonexistent records return 4xx, never 500.

Total: **40/40 passing.**

## Manual / scripted end-to-end verification

During development, a full 25-step happy-path flow (admin login → dashboard
→ search users → open a patient → vitals/journal/treatment/care-team →
approve doctor → approve caregiver → assign doctor → assign caregiver →
create/publish resource → resolve alert → notifications → logout) plus the
complete negative-case matrix from the build brief (cross-patient access,
unassigned doctor/caregiver, pending accounts, non-admin on admin routes,
invalid JWT, invalid body, duplicate email, invalid/nonexistent IDs) was run
against a live server and a freshly seeded database: **44/44 checks passed.**
This is the scenario the Jest suite now covers permanently in
`authorization.test.js` and `auth.test.js`; the scripted version was a
one-off verification tool, not part of the committed test suite.

## Manual exploration

```bash
npm run dev       # backend on :3000
npm run seed       # once, against your dev database
```

Then use `docs/API.md` (curl examples) or import `docs/postman_collection.json`
into Postman/Insomnia, logging in as one of the accounts in
`docs/DEMO_CREDENTIALS.md`.
