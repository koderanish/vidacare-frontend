# Assumptions & Autonomous Decisions

This build ran overnight without the ability to ask follow-up questions.
Per the brief, ambiguous points were resolved with the most reasonable
engineering decision and documented here rather than blocking.

## Environment

- **PostgreSQL**: the system's Postgres 16 service required `sudo`
  credentials that were not available in this environment, and Docker
  Desktop's daemon socket was unreachable. Rather than block, a **rootless
  local Postgres cluster** was initialized under `.pgdata-local/` (gitignored)
  using the same `postgresql-16` binaries already on the system, listening on
  `127.0.0.1:5433`. This is a standard way to run Postgres without admin
  rights and is fully documented in the README's setup steps. On a machine
  where you already have a normal Postgres user/database, just point
  `DATABASE_URL` at it instead — nothing else changes.
- **No Docker Compose** was created for the same reason (Docker daemon
  unreachable) and because it wasn't strictly required — a local Postgres
  binary was sufficient and faster to iterate against. If your environment
  has a working Docker daemon, a `docker-compose.yml` for Postgres is a
  five-line addition; ask and it can be added.

## Technology choices (from the earlier requirements conversation)

- **ORM**: Prisma.
- **Language**: JavaScript (CommonJS), not TypeScript.
- **Validation**: Zod.
- **Email delivery**: stubbed — verification/reset emails are logged to the
  console, and in non-production `NODE_ENV`, the raw token is also returned
  in the API response (`devVerificationToken` / `devResetToken`) so the flow
  can be exercised end-to-end without an inbox. Swapping in a real provider
  means implementing `src/utils/mailer.js`'s one function.
- **Frontend**: a custom React app (not the `react-admin` library), matching
  the bespoke Flowstep visual reference rather than a generic admin template.

## Domain decisions

- **One active doctor + one active caregiver per patient.** Reassignment
  closes the previous assignment (`status: ENDED`, `endedAt` set) rather than
  deleting it, preserving history. Enforced at the database level with a
  **partial unique index** (`WHERE status = 'ACTIVE'`) in addition to
  application logic, since Prisma's schema language cannot express partial
  unique constraints — see `prisma/migrations/*_partial_unique_active_assignments`.
- **Caregiver permissions are per-assignment boolean columns**
  (`canViewProfile`, `canViewVitals`, `canViewJournal`, `canViewTreatment`,
  `canReceiveAlerts`), not a fixed role-wide set, matching the Flowstep
  caregiver-assignment screen's permission toggles.
- **Vitals** live in a single table with a `type` enum and
  `valuePrimary`/`valueSecondary` columns (blood pressure uses both; every
  other type uses only `valuePrimary`), rather than one table per vital type.
- **Alert thresholds are global**, stored in a singleton `alert_settings`
  row, editable by admins. Not per-patient — the Flowstep settings screen
  shows one shared configuration.
- **Missed-reading alerts** run via an in-process `node-cron` job (daily at
  03:00), not a queue/worker — appropriate for prototype data volume.
- **One ACTIVE treatment plan per patient**; creating a new plan archives the
  previous one. Plan history is a lightweight `treatment_plan_events` audit
  table, not full field-level versioning.
- **PENDING doctors/caregivers can log in** (so the frontend can show an
  "under review" screen using `/api/auth/me`), but every other protected
  route returns `403` with `code: ACCOUNT_PENDING_VERIFICATION`.
- **Doctor/caregiver "verification" is an admin review workflow only.** No
  real government or medical-board license verification is implemented or
  implied anywhere in the code, copy, or docs.
- **No file uploads anywhere.** Verification "documents" are metadata fields
  (document type, reference number, issuing body) and resource cover images
  are a URL string — matching "do not implement real file
  upload/device/wearable integrations" from the brief.
- **Demo seed data is clearly synthetic**: fictional names, a shared demo
  password, and every seeded record is reachable only through
  `npm run seed`, never auto-created by the app itself.

## Testing

- Jest + Supertest run against a **separate physical database**
  (`vidacare_test_db`, configured via `.env.test`), truncated between test
  files, so tests never touch or depend on demo data. See `docs/TESTING.md`.
- Test coverage focuses on **auth flows** and, as the highest-risk surface,
  **authorization** (role checks are proven insufficient on their own;
  assignment- and permission-based access is exercised directly).
