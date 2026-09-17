const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/db");
const { resetDb } = require("./helpers/resetDb");
const { hashPassword } = require("../src/utils/password");
const { generatePatientCode } = require("../src/utils/patientCode");

const PASSWORD = "Passw0rd1";
let tokens = {}; // role/id -> accessToken
let ids = {};

async function createActiveUser(role, overrides = {}) {
  const passwordHash = await hashPassword(PASSWORD);
  const user = await prisma.user.create({
    data: {
      email: overrides.email,
      passwordHash,
      fullName: overrides.fullName,
      role,
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
    },
  });
  return user;
}

beforeAll(async () => {
  await resetDb();

  const admin = await createActiveUser("ADMIN", { email: "admin.authz@example.com", fullName: "Admin Authz" });

  const doctorA = await createActiveUser("DOCTOR", { email: "doctora@example.com", fullName: "Dr. A" });
  await prisma.doctorProfile.create({
    data: { userId: doctorA.id, specialization: "Cardiology", licenseNumber: "LIC-A", hospital: "H" },
  });
  const doctorB = await createActiveUser("DOCTOR", { email: "doctorb@example.com", fullName: "Dr. B" });
  await prisma.doctorProfile.create({
    data: { userId: doctorB.id, specialization: "Neurology", licenseNumber: "LIC-B", hospital: "H" },
  });

  const caregiverA = await createActiveUser("CAREGIVER", { email: "caregivera@example.com", fullName: "Cg A" });
  await prisma.caregiverProfile.create({ data: { userId: caregiverA.id, caregiverType: "FAMILY_MEMBER" } });
  const caregiverB = await createActiveUser("CAREGIVER", { email: "caregiverb@example.com", fullName: "Cg B" });
  await prisma.caregiverProfile.create({ data: { userId: caregiverB.id, caregiverType: "FAMILY_MEMBER" } });

  const patientAUser = await createActiveUser("PATIENT", { email: "patienta@example.com", fullName: "Pat A" });
  const patientA = await prisma.patientProfile.create({
    data: { userId: patientAUser.id, patientCode: generatePatientCode() },
  });
  const patientBUser = await createActiveUser("PATIENT", { email: "patientb@example.com", fullName: "Pat B" });
  const patientB = await prisma.patientProfile.create({
    data: { userId: patientBUser.id, patientCode: generatePatientCode() },
  });

  // doctorA <-> patientA, caregiverA <-> patientA (view journal disabled).
  // doctorB / caregiverB have no assignments at all.
  await prisma.patientDoctorAssignment.create({ data: { patientId: patientA.id, doctorId: doctorA.id } });
  await prisma.patientCaregiverAssignment.create({
    data: { patientId: patientA.id, caregiverId: caregiverA.id, canViewJournal: false },
  });

  ids = {
    admin: admin.id,
    doctorA: doctorA.id,
    doctorB: doctorB.id,
    caregiverA: caregiverA.id,
    caregiverB: caregiverB.id,
    patientAUser: patientAUser.id,
    patientBUser: patientBUser.id,
    patientA: patientA.id,
    patientB: patientB.id,
  };

  async function login(email) {
    const res = await request(app).post("/api/auth/login").send({ email, password: PASSWORD });
    return res.body.data.accessToken;
  }

  tokens = {
    admin: await login("admin.authz@example.com"),
    doctorA: await login("doctora@example.com"),
    doctorB: await login("doctorb@example.com"),
    caregiverA: await login("caregivera@example.com"),
    caregiverB: await login("caregiverb@example.com"),
    patientA: await login("patienta@example.com"),
    patientB: await login("patientb@example.com"),
  };
});

afterAll(async () => {
  await prisma.$disconnect();
});

function auth(token) {
  return { Authorization: `Bearer ${token}` };
}

describe("Patient self-access", () => {
  test("patient can view their own profile", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientA}`).set(auth(tokens.patientA));
    expect(res.status).toBe(200);
  });

  test("patient CANNOT view another patient's profile", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientB}`).set(auth(tokens.patientA));
    expect(res.status).toBe(403);
    expect(res.body.code).toBe("FORBIDDEN");
  });

  test("patient CANNOT view another patient's vitals", async () => {
    const res = await request(app).get(`/api/vitals/patient/${ids.patientB}`).set(auth(tokens.patientA));
    expect(res.status).toBe(403);
  });

  test("patient can record their OWN vital", async () => {
    const res = await request(app)
      .post("/api/vitals")
      .set(auth(tokens.patientA))
      .send({ patientId: ids.patientA, type: "HEART_RATE", valuePrimary: 72 });
    expect(res.status).toBe(201);
  });

  test("patient CANNOT record a vital for someone else", async () => {
    const res = await request(app)
      .post("/api/vitals")
      .set(auth(tokens.patientA))
      .send({ patientId: ids.patientB, type: "HEART_RATE", valuePrimary: 72 });
    expect(res.status).toBe(403);
  });
});

describe("Doctor assignment-based access", () => {
  test("assigned doctor (doctorA) CAN access patientA", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientA}`).set(auth(tokens.doctorA));
    expect(res.status).toBe(200);
  });

  test("unassigned doctor (doctorB) CANNOT access patientA -- role alone is not enough", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientA}`).set(auth(tokens.doctorB));
    expect(res.status).toBe(403);
  });

  test("unassigned doctor CANNOT view patientA's vitals", async () => {
    const res = await request(app).get(`/api/vitals/patient/${ids.patientA}`).set(auth(tokens.doctorB));
    expect(res.status).toBe(403);
  });

  test("unassigned doctor CANNOT create a treatment plan for patientA", async () => {
    const res = await request(app)
      .post("/api/treatment-plans")
      .set(auth(tokens.doctorB))
      .send({ patientId: ids.patientA, title: "Malicious plan", startDate: new Date().toISOString() });
    expect(res.status).toBe(403);
  });

  test("assigned doctor CAN create a treatment plan for patientA", async () => {
    const res = await request(app)
      .post("/api/treatment-plans")
      .set(auth(tokens.doctorA))
      .send({ patientId: ids.patientA, title: "Legit plan", startDate: new Date().toISOString() });
    expect(res.status).toBe(201);
  });
});

describe("Caregiver assignment + per-permission access", () => {
  test("assigned caregiver (caregiverA) CAN view patientA's profile", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientA}`).set(auth(tokens.caregiverA));
    expect(res.status).toBe(200);
  });

  test("unassigned caregiver (caregiverB) CANNOT view patientA at all", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientA}`).set(auth(tokens.caregiverB));
    expect(res.status).toBe(403);
  });

  test("caregiverA CANNOT view patientA's journal (permission flag is false)", async () => {
    const res = await request(app).get(`/api/journal/patient/${ids.patientA}`).set(auth(tokens.caregiverA));
    expect(res.status).toBe(403);
  });

  test("caregiverA CAN view patientA's vitals (permission flag defaults true)", async () => {
    const res = await request(app).get(`/api/vitals/patient/${ids.patientA}`).set(auth(tokens.caregiverA));
    expect(res.status).toBe(200);
  });
});

describe("Admin bypass", () => {
  test("admin can access any patient regardless of assignment", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientB}`).set(auth(tokens.admin));
    expect(res.status).toBe(200);
  });
});

describe("Role-only checks are never sufficient (role vs role+assignment)", () => {
  test("DOCTOR role without assignment is rejected -- proves role check alone is insufficient", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientB}`).set(auth(tokens.doctorA));
    expect(res.status).toBe(403);
  });
});

describe("Non-admin blocked from admin APIs", () => {
  test.each([
    ["doctorA", "doctor"],
    ["caregiverA", "caregiver"],
    ["patientA", "patient"],
  ])("%s cannot call admin dashboard stats", async (tokenKey) => {
    const res = await request(app).get("/api/admin/dashboard/stats").set(auth(tokens[tokenKey]));
    expect(res.status).toBe(403);
  });

  test("non-admin cannot list all users", async () => {
    const res = await request(app).get("/api/admin/users").set(auth(tokens.doctorA));
    expect(res.status).toBe(403);
  });

  test("non-admin cannot approve a verification request", async () => {
    const res = await request(app)
      .post("/api/admin/verifications/00000000-0000-0000-0000-000000000000/approve")
      .set(auth(tokens.doctorA))
      .send({});
    expect(res.status).toBe(403);
  });
});

describe("Unauthenticated access", () => {
  test("missing token is rejected on a protected route", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientA}`);
    expect(res.status).toBe(401);
  });

  test("garbage token is rejected", async () => {
    const res = await request(app).get(`/api/patients/${ids.patientA}`).set(auth("garbage.token.value"));
    expect(res.status).toBe(401);
  });
});

describe("Suspended / rejected accounts are blocked", () => {
  test("suspended user is blocked from protected routes", async () => {
    const user = await createActiveUser("PATIENT", { email: "suspended@example.com", fullName: "Susp" });
    await prisma.patientProfile.create({ data: { userId: user.id, patientCode: generatePatientCode() } });
    await prisma.user.update({ where: { id: user.id }, data: { status: "SUSPENDED" } });

    const login = await request(app).post("/api/auth/login").send({ email: "suspended@example.com", password: PASSWORD });
    expect(login.status).toBe(403);
    expect(login.body.code).toBe("ACCOUNT_SUSPENDED");
  });

  test("rejected user is blocked at login", async () => {
    const user = await createActiveUser("DOCTOR", { email: "rejected.doc@example.com", fullName: "Rej Doc" });
    await prisma.user.update({ where: { id: user.id }, data: { status: "REJECTED" } });

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "rejected.doc@example.com", password: PASSWORD });
    expect(login.status).toBe(403);
    expect(login.body.code).toBe("ACCOUNT_REJECTED");
  });
});

describe("Invalid input handling", () => {
  test("malformed UUID in path returns a 4xx, not a 500", async () => {
    const res = await request(app).get("/api/patients/not-a-real-uuid").set(auth(tokens.admin));
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  test("nonexistent patient id returns 404", async () => {
    const res = await request(app)
      .get("/api/patients/00000000-0000-0000-0000-000000000000")
      .set(auth(tokens.admin));
    expect(res.status).toBe(404);
  });
});
