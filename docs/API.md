# API Reference

Base URL: `http://localhost:3000/api`

## Conventions

**Every response** uses this envelope:

```json
{ "success": true, "message": "Human-readable message", "data": { } }
```

```json
{ "success": false, "message": "What went wrong", "code": "ERROR_CODE", "errors": [ ] }
```

`errors` is present only on `422` validation failures, one entry per field:
`{ "path": "email", "message": "Enter a valid email address" }`.

**Pagination** (any `GET` list endpoint): query params `page` (default 1),
`limit` (default 20, max varies by endpoint). Response `data` shape:

```json
{ "items": [ ], "pagination": { "page": 1, "limit": 20, "total": 248, "totalPages": 13 } }
```

**Auth header**: `Authorization: Bearer <accessToken>` on every route except
`/auth/register/*`, `/auth/login`, `/auth/refresh`, `/auth/verify-email`,
`/auth/resend-verification`, `/auth/forgot-password`, `/auth/reset-password`.

**Error codes** you'll see: `VALIDATION_ERROR` (422), `INVALID_CREDENTIALS`
(401), `UNAUTHENTICATED` (401), `FORBIDDEN` (403), `ACCOUNT_PENDING_VERIFICATION`
/ `ACCOUNT_REJECTED` / `ACCOUNT_SUSPENDED` (403), `NOT_FOUND` (404),
`CONFLICT` (409), `INTERNAL_ERROR` (500).

---

## Auth — `/api/auth`

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/register/patient` | none | Patient signup → PENDING until email verified |
| POST | `/register/doctor` | none | Doctor signup → PENDING until admin approves |
| POST | `/register/caregiver` | none | Caregiver signup → PENDING until admin approves |
| POST | `/login` | none | Returns `{ user, accessToken, refreshToken }` |
| POST | `/refresh` | none | Rotates refresh token |
| POST | `/logout` | none | Revokes the given refresh token |
| POST | `/verify-email` | none | Consumes a verification token |
| POST | `/resend-verification` | none | Re-sends (logs) a verification token |
| POST | `/forgot-password` | none | Issues a reset token (logged/returned in dev) |
| POST | `/reset-password` | none | Consumes token, sets new password, revokes all sessions |
| GET | `/me` | any | Current user; the only protected-ish route PENDING users can call |

**POST `/auth/register/patient`**
```json
{ "fullName": "Olivia Bennett", "email": "olivia@example.com", "password": "Passw0rd1", "phone": "+15551234567" }
```
→ `201` `{ "user": {...}, "devVerificationToken": "..." }` (token only in non-production)

**POST `/auth/register/doctor`**
```json
{
  "fullName": "Dr. Lucas Martin", "email": "lucas@example.com", "password": "Passw0rd1",
  "phone": "+15551234567", "specialization": "Cardiology", "licenseNumber": "MD-482910",
  "hospital": "VidaCare General Hospital", "yearsOfExperience": 12,
  "documentType": "Medical License", "documentReference": "MD-482910", "issuingBody": "State Medical Board"
}
```
→ `201`, `status: "PENDING"`. Blocked from doctor routes until an admin approves.

**POST `/auth/login`**
```json
{ "email": "admin@vidacare.com", "password": "Admin@12345" }
```
→ `200` `{ "user": {...}, "accessToken": "...", "refreshToken": "..." }`. `403` with
`code: ACCOUNT_REJECTED` / `ACCOUNT_SUSPENDED` if applicable (PENDING is allowed to log in).

---

## Admin — `/api/admin` (ADMIN role required on every route)

| Method | Path | Purpose |
|---|---|---|
| GET | `/dashboard/stats` | Counts for the 8 KPI cards |
| GET | `/dashboard/charts/patient-activity` | 7 daily points |
| GET | `/dashboard/charts/registrations` | 6 monthly points |
| GET | `/dashboard/activity` | Recent activity feed |
| GET | `/users` | `?q=&role=&status=&page=&limit=` |
| GET | `/users/:id` | Full user + profile |
| PATCH | `/users/:id` | Update `fullName`/`phone` |
| PATCH | `/users/:id/status` | `{ status, reason }` — validated transitions only |
| GET | `/verifications` | `?status=&role=&page=&limit=` |
| GET | `/verifications/:id` | Full request + applicant profile |
| POST | `/verifications/:id/approve` | `{ notes? }` → user becomes ACTIVE |
| POST | `/verifications/:id/reject` | `{ reason }` (required) → user becomes REJECTED |
| GET / PUT | `/alert-settings` | Global threshold config |
| POST / DELETE | `/patients/:patientId/doctors/:doctorId` | Assign / end doctor assignment |
| POST / DELETE | `/patients/:patientId/caregivers/:caregiverId` | Assign / end caregiver assignment |
| PATCH | `/patients/:patientId/caregiver-permissions` | `{ canViewVitals, canViewJournal, ... }` |

**GET `/admin/dashboard/stats`** → `200`
```json
{
  "totalPatients": 12, "totalDoctors": 3, "totalCaregivers": 3,
  "pendingDoctorVerifications": 1, "pendingCaregiverVerifications": 1,
  "activeAlerts": 8, "activeTreatmentPlans": 9, "newUsers": 21
}
```

**PATCH `/admin/users/:id/status`**
```json
{ "status": "SUSPENDED", "reason": "Reported suspicious activity" }
```
Only a fixed set of transitions is allowed (`PENDING→ACTIVE|REJECTED`,
`ACTIVE→SUSPENDED`, `SUSPENDED→ACTIVE`, `REJECTED→PENDING`) — invalid
transitions return `400`.

**POST `/admin/verifications/:id/reject`**
```json
{ "reason": "License number could not be confirmed for this demo review." }
```

---

## Patients — `/api/patients` (any authenticated ACTIVE user; scoped)

| Method | Path | Notes |
|---|---|---|
| GET | `/me` | PATIENT only — own profile |
| PATCH | `/me` | PATIENT only — update own profile |
| GET | `/` | Admin: all. Doctor/Caregiver: only assigned. Patient: only self. |
| GET | `/:id` | Requires `assertPatientAccess` (VIEW_PROFILE) |
| GET | `/:id/care-team` | Assigned doctor + caregiver + permissions |

## Doctors — `/api/doctors` · Caregivers — `/api/caregivers`

| Method | Path | Notes |
|---|---|---|
| GET | `/` | Directory, `?q=&status=&page=&limit=` |
| GET | `/:id` | Profile + active assignments |
| GET | `/me/patients` | DOCTOR/CAREGIVER only — their assigned patients |

---

## Vitals — `/api/vitals`

| Method | Path | Notes |
|---|---|---|
| POST | `/` | Patient (own only) or Admin |
| GET | `/patient/:patientId` | `?type=&from=&to=&page=&limit=` |
| GET | `/patient/:patientId/latest` | One most-recent reading per type |
| GET | `/patient/:patientId/trends` | `?type=&days=7` — daily-averaged points for charts |
| PATCH / DELETE | `/:id` | Owning patient or Admin only |

**POST `/vitals`**
```json
{ "patientId": "uuid", "type": "BLOOD_PRESSURE", "valuePrimary": 128, "valueSecondary": 82, "source": "MANUAL" }
```
→ `201` `{ "vital": {...}, "alertsCreated": [] }`. If the reading crosses a
configured threshold, `alertsCreated` contains the new `Alert` row(s) and
notifications are created for the patient + assigned doctor + (permission-
permitting) caregiver automatically.

## Journal — `/api/journal`

| Method | Path | Notes |
|---|---|---|
| POST | `/` | Patient only, own entries |
| GET | `/patient/:patientId` | `?mood=&from=&to=&q=&page=&limit=` |
| GET / PATCH / DELETE | `/:id` | Owning patient (write); assignment-scoped read |

```json
{ "patientId": "uuid", "mood": "CALM", "painLevel": 2, "symptoms": ["Mild fatigue"], "notes": "Rested after a walk." }
```

## Treatment plans — `/api/treatment-plans`

| Method | Path | Notes |
|---|---|---|
| POST | `/` | Doctor only, must be the assigned doctor |
| GET | `/patient/:patientId` | All plans (active + archived) |
| GET / PATCH | `/:id` | Read: assignment-scoped. Write: assigned doctor or admin |
| POST | `/:id/medications` | Add a medication line |
| PATCH / DELETE | `/medications/:medId` | Edit/remove a medication |

```json
{
  "patientId": "uuid", "title": "Hypertension Management", "startDate": "2026-06-01",
  "medications": [{ "name": "Lisinopril", "dosage": "10 mg", "frequency": "Once daily", "durationDays": 90 }]
}
```

## Alerts — `/api/alerts`

| Method | Path | Notes |
|---|---|---|
| GET | `/` | `?status=&severity=&patientId=&page=&limit=`, scoped like patients |
| GET | `/:id` | Assignment-scoped |
| PATCH | `/:id/review` | Marks `REVIEWED` |
| PATCH | `/:id/resolve` | Marks `RESOLVED` |

Alerts are never hand-authored by the API — they're created only by
`alert.service.js`'s threshold evaluation (on vital insert) or the daily
missed-reading cron job. Copy is explicitly non-diagnostic (see the
`thresholdDescription` field and the "prototype monitoring alert" framing).

## Notifications — `/api/notifications`

| Method | Path | Notes |
|---|---|---|
| GET | `/` | `?unreadOnly=&page=&limit=`, always the caller's own |
| PATCH | `/read-all` | Mark everything read |
| PATCH | `/:id/read` | Mark one read |
| DELETE | `/:id` | |

## Health resources — `/api/resources`

| Method | Path | Auth |
|---|---|---|
| GET | `/` | Any active user — non-admins only ever see `PUBLISHED` regardless of `?status=` |
| GET | `/:id` | Any active user |
| POST | `/` | Admin |
| PATCH | `/:id` | Admin |
| PATCH | `/:id/publish` `/:id/unpublish` | Admin |
| DELETE | `/:id` | Admin |

```json
{
  "title": "Understanding blood pressure trends", "category": "HEART_HEALTH",
  "description": "Learn how to read sample trends.", "content": "Full article body...",
  "authorName": "VidaCare Education", "status": "DRAFT"
}
```

## Assistant — `/api/assistant`

| Method | Path |
|---|---|
| POST | `/chat` — `{ "message": "..." }` |

Stubbed (see `docs/ASSUMPTIONS.md`); response always includes
`"isDemoResponse": true` and a disclaimer that it is not medical advice.

---

## Full curl walkthrough

```bash
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@vidacare.com","password":"Admin@12345"}' | node -e \
  'process.stdin.on("data",d=>console.log(JSON.parse(d).data.accessToken))')

curl -s http://localhost:3000/api/admin/dashboard/stats \
  -H "Authorization: Bearer $TOKEN" | jq
```

A ready-to-import collection with these and every other endpoint pre-filled
is at `docs/postman_collection.json`.
