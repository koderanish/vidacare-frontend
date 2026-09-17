-- Enforce "at most one ACTIVE doctor assignment per patient"
-- and "at most one ACTIVE caregiver assignment per patient"
-- at the database level. Prisma's schema language cannot express
-- a partial unique index, so this is hand-written.

CREATE UNIQUE INDEX "patient_doctor_assignments_one_active_per_patient"
  ON "patient_doctor_assignments" ("patientId")
  WHERE "status" = 'ACTIVE';

CREATE UNIQUE INDEX "patient_caregiver_assignments_one_active_per_patient"
  ON "patient_caregiver_assignments" ("patientId")
  WHERE "status" = 'ACTIVE';
