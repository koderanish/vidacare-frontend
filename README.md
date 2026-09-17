# VidaCare

VidaCare is a healthcare monitoring SaaS **prototype** connecting patients,
doctors, caregivers, and administrators. This repo contains the Express/
Prisma/PostgreSQL backend (`src/`) and a React admin dashboard (`frontend/`)
built against it.

> **Prototype disclaimer**: all data is synthetic demo data. Alerts are
> prototype threshold notifications, not medical diagnoses. Doctor/caregiver
> "verification" is an admin review workflow, not real government or
> medical-board license verification. No wearable/medical-device
> integrations exist — vitals are either entered manually or generated as
> demo data.

## Stack

- **Backend**: Node.js, Express, PostgreSQL, Prisma ORM, JWT, bcrypt, Zod,
  node-cron. See `docs/ARCHITECTURE.md`.
- **Frontend**: React (Vite), React Router, TanStack Query, Tailwind CSS.
  See `frontend/README.md`.

## Quick start

### 1. PostgreSQL

Point `DATABASE_URL` at any Postgres 13+ database you control. If you don't
already have one running:

```bash
# Option A: you have a normal Postgres user/db already — just use it.
# Option B: rootless local Postgres (no sudo needed), same approach this
# build used — see docs/ASSUMPTIONS.md for why.
initdb -D ./.pgdata-local -U vidacare --auth=trust
echo -e "port = 5433\nunix_socket_directories = './.pgdata-local/sockets'\nlisten_addresses = 'localhost'" >> .pgdata-local/postgresql.conf
mkdir -p .pgdata-local/sockets
pg_ctl -D ./.pgdata-local -l ./.pgdata-local/logfile -o "-p 5433" start
psql -U vidacare -d postgres -c "CREATE DATABASE vidacare_db OWNER vidacare;"
```

### 2. Backend

```bash
npm install
cp .env.example .env        # then edit DATABASE_URL etc.
npm run prisma:migrate      # applies prisma/migrations/
npm run seed                # creates admin + full demo dataset
npm run dev                 # http://localhost:3000
```

Demo login credentials: `docs/DEMO_CREDENTIALS.md`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env        # VITE_API_URL, defaults to http://localhost:3000/api
npm run dev                 # http://localhost:5173
```

### 4. Tests

```bash
# once: create a separate test database + .env.test (see docs/TESTING.md)
npm test
```

## Documentation

| Doc | Contents |
|---|---|
| [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) | The plan this build followed |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Request flow, authorization model, layering |
| [`docs/DATABASE.md`](docs/DATABASE.md) | Schema design, constraints, why each table exists |
| [`docs/API.md`](docs/API.md) | Every endpoint, request/response examples |
| [`docs/postman_collection.json`](docs/postman_collection.json) | Importable Postman collection |
| [`docs/ASSUMPTIONS.md`](docs/ASSUMPTIONS.md) | Every autonomous decision made and why |
| [`docs/DEMO_CREDENTIALS.md`](docs/DEMO_CREDENTIALS.md) | All seeded login accounts |
| [`docs/TESTING.md`](docs/TESTING.md) | How to run tests, what's covered |
| [`frontend/README.md`](frontend/README.md) | Frontend structure and what's wired up |

## What's built

**Backend — complete and tested.** Full auth (patient/doctor/caregiver
signup, JWT + refresh rotation, email verification, password reset), role +
assignment-based authorization (a doctor/caregiver role alone never grants
patient access — see `docs/ARCHITECTURE.md`), the full domain API (patients,
doctors, caregivers, vitals with a real threshold-based alert engine,
journal, treatment plans + medications, alerts, notifications, health
resources), admin dashboard endpoints, a daily missed-reading cron job, and
a demo seed producing a fully populated database. 40 Jest/Supertest tests
passing; a scripted 44-check end-to-end run (the full happy path plus every
negative authorization case) passed against a live server.

**Frontend — React admin dashboard wired to the real API.** See
`frontend/README.md` for exactly which pages are complete vs. remaining;
nothing there uses fake static data where a real endpoint exists.

## Known limitations

- Email delivery is stubbed (console-logged); see `docs/ASSUMPTIONS.md` for
  how to swap in a real provider.
- No file uploads (verification documents and resource images are
  metadata/URL fields, per spec).
- No real wearable/medical-device integration (out of scope, per spec).
- The AI assistant endpoint returns a clearly-labelled canned response, not
  a live model call.
- Local dev Postgres runs rootless on a non-default port because `sudo` was
  unavailable in the build environment — see `docs/ASSUMPTIONS.md`. Any
  standard Postgres instance works equally well; only `DATABASE_URL`
  changes.
