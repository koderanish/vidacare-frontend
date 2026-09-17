# Database

PostgreSQL, managed by Prisma (`prisma/schema.prisma`). Full DDL lives in
`prisma/migrations/`; this document explains the *why* behind the less
obvious choices. See also `docs/ASSUMPTIONS.md` for domain decisions.

## Entity overview

```
User ──1:1── PatientProfile ──┬──* PatientDoctorAssignment ──* User(DOCTOR)
   │                          ├──* PatientCaregiverAssignment ──* User(CAREGIVER)
   │                          ├──* Vital
   │                          ├──* JournalEntry
   │                          ├──* TreatmentPlan ──* Medication
   │                          │                  └─* TreatmentPlanEvent
   │                          └──* Alert ──? Vital
   ├──1:1── DoctorProfile
   ├──1:1── CaregiverProfile
   ├──* VerificationRequest
   ├──* Notification
   ├──* RefreshToken / EmailVerificationToken / PasswordResetToken
   └──* ActivityLog (as actor)

AlertSettings — singleton config row
HealthResource — independent content table
```

## Why these tables (beyond the 14 named in the brief)

| Table | Reason |
|---|---|
| `refresh_tokens` | Logout must actually revoke a session, not just rely on the client discarding a token. Only a SHA-256 hash is stored. |
| `email_verification_tokens`, `password_reset_tokens` | Single-use, hashed, time-limited tokens for the two email-based flows. |
| `alert_settings` | Configurable thresholds (brief: "keep thresholds configurable") need somewhere to live; a singleton row avoids inventing a config-file layer for one row. |
| `activity_log` | Powers the "recent system activity" dashboard card and doubles as a lightweight audit trail — written to by nearly every service. |
| `treatment_plan_events` | Satisfies "plan history" (seen in the Flowstep treatment screen) without full field-level versioning. |
| `user_status_changes` | Every PENDING→ACTIVE→SUSPENDED transition records who changed it and why, separate from the higher-volume general activity log. |

## Notable constraints

- **Partial unique indexes** enforce "at most one ACTIVE doctor assignment
  per patient" and the same for caregivers, at the database level:
  ```sql
  CREATE UNIQUE INDEX "patient_doctor_assignments_one_active_per_patient"
    ON "patient_doctor_assignments" ("patientId") WHERE "status" = 'ACTIVE';
  ```
  Prisma's schema language cannot express a partial index, so this one is
  hand-written in
  `prisma/migrations/20260917205500_partial_unique_active_assignments/`.
  The assignment service also enforces this in application logic (ending the
  previous assignment before creating a new one, inside a transaction), so
  the database constraint is a backstop, not the only line of defense.
- **Cascading deletes** are used for ownership relationships (deleting a
  `User` cascades to their `PatientProfile`/`DoctorProfile`/
  `CaregiverProfile` and, from there, to their vitals/journal/etc. — in
  practice nothing in the API deletes users, but the constraint keeps the
  schema honest). Cross-entity references that shouldn't cascade (e.g. who
  reviewed a verification request) use `SetNull` instead.
- **Foreign keys** everywhere a relationship exists; indexes are added on
  every foreign key plus every column list list/dashboard queries filter or
  sort by (`(role, status)` on users, `(patientId, type, recordedAt)` on
  vitals, `(status, createdAt)` on alerts, etc.).

## Design choices explicitly avoided

- **No JSON blobs for structured data.** Medications, journal symptoms
  (`String[]`), and vitals are all normalized columns/tables, not JSON —
  per the brief's explicit instruction.
- **No per-vital-type tables.** A single `vitals` table with a `type` enum
  keeps the trend-chart and "latest vitals" queries uniform across all five
  vital types, at the cost of `valueSecondary` being unused except for blood
  pressure.
