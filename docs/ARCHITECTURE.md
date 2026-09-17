# Architecture

## Request flow

```
HTTP request
  → route (src/routes/*.routes.js)
    → middleware: authenticate → requireActiveStatus → requireRole(...) → validate(schema)
      → controller (thin: parse req, call service, shape response)
        → service (business logic, Prisma calls, policy checks)
          → prisma (src/config/db.js)
            → PostgreSQL
```

Controllers never call Prisma directly and never contain business logic —
they parse the (already-validated) request, call exactly one service
function, and format the response with `utils/response.js`. All business
rules, transactions, and database access live in `src/services/*.service.js`.

## Authorization — the two axes

Every protected route passes through two independent checks before any
service logic runs, plus a third inside the service layer for patient data:

1. **Authentication** (`authenticate` middleware) — valid JWT, user exists.
2. **Account status** (`requireActiveStatus` middleware) — blocks
   PENDING/REJECTED/SUSPENDED accounts from everything except `/auth/me`
   and the auth routes themselves. Returns a distinct `code` per status
   (`ACCOUNT_PENDING_VERIFICATION`, etc.) so the frontend can render the
   right screen instead of a generic error.
3. **Role** (`requireRole(...)` middleware, where a route is role-specific,
   e.g. admin-only) — necessary but explicitly **not sufficient** for
   patient data.
4. **Resource/assignment access** (`policy.service.js`, called from inside
   controllers for every patient-scoped resource) — the actual guarantee
   that "a doctor can only access assigned patients." See below.

```js
// src/services/policy.service.js — the single place this rule is implemented
async function assertPatientAccess(actor, patientId, capability) {
  if (actor.role === "ADMIN") return patient;
  if (actor.role === "PATIENT") return patient.userId === actor.id ? patient : throw 403;
  if (actor.role === "DOCTOR") return hasActiveAssignment(actor, patientId) ? patient : throw 403;
  if (actor.role === "CAREGIVER") return hasActiveAssignment(actor, patientId) &&
                                          hasPermission(assignment, capability) ? patient : throw 403;
}
```

Every controller touching patient-scoped data (vitals, journal, treatment
plans, alerts, care team) calls `assertPatientAccess` before doing anything
else. This is deliberately centralized rather than reimplemented per route —
see `tests/authorization.test.js` for the proof that role alone never grants
access.

## Layering rules

- **Routes** wire HTTP verbs + paths to middleware + a controller function.
  No logic.
- **Middleware** is cross-cutting (auth, validation, error handling) and
  route-agnostic.
- **Controllers** are one function per endpoint, `asyncHandler`-wrapped so
  rejected promises reach the centralized error handler without a
  try/catch in every function.
- **Services** own transactions (`prisma.$transaction`), authorization calls,
  activity logging, and all Prisma queries.
- **Validators** are Zod schemas, applied by the `validate` middleware,
  which replaces `req.body`/`query`/`params` with the parsed (coerced,
  defaulted) result so downstream code can trust types.

## Error handling

A single `errorHandler` middleware (`src/middleware/errorHandler.js`)
recognizes `ApiError` (the app's own typed error with `statusCode` + `code`),
translates known Prisma error codes (`P2002` unique constraint → 409,
`P2025` not found → 404, `P2003` FK violation → 400), and falls back to a
generic 500 that never leaks internals when `NODE_ENV=production`.

## What was deliberately left out

Per the brief: no microservices, no Kubernetes, no Kafka, no Redis, no
event-driven architecture. The one background job (missed-reading alerts)
runs as an in-process `node-cron` schedule rather than a worker/queue —
appropriate for prototype data volume, and documented as a scaling point
rather than solved prematurely.
