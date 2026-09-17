# Implementation Plan

Written at the start of the autonomous overnight build, after inspecting the
existing repo (a bare Express server with `/`, `/health`, `/api/status` and
nothing else — no database, no auth) and the Flowstep design reference
(20 screens for a VidaCare admin dashboard). This plan was executed in full;
see the root `README.md` for the final "what was built" summary.

## Scope decision

The Flowstep reference and the backend spec together describe a large
surface. Given a single overnight session, the priority order (per the
brief) is: **working app → correct auth → correct authorization → working
admin dashboard → real DB → real API integration → demo data → professional
UI → e2e testing.** Backend is built completely first per the brief's
explicit phase ordering; the React frontend is built against the finished,
tested API rather than in parallel against a moving target.

## Phase 1 — Inspect (done)

- Existing repo: `src/server.js`, Express 4, CORS, two routes, no DB, no
  auth. Nothing worth preserving as-is beyond the dependency choices
  (Express, CORS), which carry forward.
- Flowstep file `7ced5eb5-...`: 20 UI-fidelity screens covering admin login,
  dashboard, user management, doctor/caregiver provisioning + verification,
  patient management (profile, vitals, journal, treatment, care team,
  doctor/caregiver assignment), alerts, resources, notifications, settings.
  Used as the visual and information-architecture reference for both the API
  shape and the React UI.
- No existing Postgres/Prisma config. No existing React app.

## Phase 2 — Backend (done)

Prisma schema (21 models) → migrations → config/utils/middleware layer →
`policy.service.js` (the authorization core) → auth service/controller/routes
→ every domain service/controller/route (admin, patients, doctors,
caregivers, vitals, journal, treatment plans, alerts, notifications,
resources, assistant) → cron job → demo seed. Each layer was smoke-tested
against a running server before the next was built on top of it.

## Phase 3 — Test backend (done)

Manual curl smoke tests during development, a scripted end-to-end run
covering the exact 25-step flow and full negative-case matrix from the brief
(44/44 checks passed), and a permanent Jest + Supertest suite (40 tests) for
regression coverage of auth and authorization. See `docs/TESTING.md`.

## Phase 4-6 — Frontend + integration + e2e (done)

React (Vite) admin dashboard, built against the live API with a shared
`api/client.js`, React Query for server state, and React Router for
protected routes. Modules built in the brief's stated order: Module 1
(overview + user management + verification) first and most complete,
Module 2 (patient care + monitoring) and Module 3 (resources/alerts/system)
next. See root `README.md` for exactly which pages are wired to real
endpoints vs. stubbed, and `docs/ASSUMPTIONS.md` for any scope trimmed under
time pressure.

## Phase 7-8 — QA + docs (done)

Final route/console/error sweep, then this documentation set.
