const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/db");
const { resetDb } = require("./helpers/resetDb");
const { ensureAdmin } = require("../src/seed/admin.seed");

beforeAll(async () => {
  await resetDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Patient registration & login", () => {
  const email = "e2e.patient@example.com";
  const password = "Passw0rd1";

  test("registers a new patient as PENDING", async () => {
    const res = await request(app)
      .post("/api/auth/register/patient")
      .send({ fullName: "E2E Patient", email, password });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe("PATIENT");
    expect(res.body.data.user.status).toBe("PENDING");
    expect(res.body.data.devVerificationToken).toBeTruthy();
  });

  test("rejects duplicate email with 409", async () => {
    const res = await request(app)
      .post("/api/auth/register/patient")
      .send({ fullName: "Dup", email, password });
    expect(res.status).toBe(409);
    expect(res.body.code).toBe("CONFLICT");
  });

  test("rejects a weak password with 422", async () => {
    const res = await request(app)
      .post("/api/auth/register/patient")
      .send({ fullName: "Weak", email: "weak@example.com", password: "weak" });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe("VALIDATION_ERROR");
  });

  test("logs in while PENDING (email not yet verified)", async () => {
    const res = await request(app).post("/api/auth/login").send({ email, password });
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.user.status).toBe("PENDING");
  });

  test("rejects wrong password with 401", async () => {
    const res = await request(app).post("/api/auth/login").send({ email, password: "WrongPass1" });
    expect(res.status).toBe(401);
    expect(res.body.code).toBe("INVALID_CREDENTIALS");
  });

  test("verifies email and activates the account", async () => {
    const regRes = await request(app)
      .post("/api/auth/register/patient")
      .send({ fullName: "Verify Me", email: "verify.me@example.com", password });
    const token = regRes.body.data.devVerificationToken;

    const verifyRes = await request(app).post("/api/auth/verify-email").send({ token });
    expect(verifyRes.status).toBe(200);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "verify.me@example.com", password });
    expect(loginRes.body.data.user.status).toBe("ACTIVE");
  });

  test("rejects an already-used verification token", async () => {
    const regRes = await request(app)
      .post("/api/auth/register/patient")
      .send({ fullName: "Once", email: "once@example.com", password });
    const token = regRes.body.data.devVerificationToken;

    await request(app).post("/api/auth/verify-email").send({ token });
    const second = await request(app).post("/api/auth/verify-email").send({ token });
    expect(second.status).toBe(400);
  });
});

describe("Doctor & caregiver provisional signup", () => {
  test("doctor signup creates PENDING user + verification request, blocked from protected routes", async () => {
    const email = "pending.doctor@example.com";
    const password = "Passw0rd1";
    const reg = await request(app).post("/api/auth/register/doctor").send({
      fullName: "Dr. Pending",
      email,
      password,
      phone: "+15550001111",
      specialization: "Cardiology",
      licenseNumber: "MD-TEST-001",
      hospital: "Test Hospital",
      yearsOfExperience: 5,
    });
    expect(reg.status).toBe(201);
    expect(reg.body.data.user.status).toBe("PENDING");

    const login = await request(app).post("/api/auth/login").send({ email, password });
    expect(login.status).toBe(200); // PENDING users can log in

    const protectedCall = await request(app)
      .get("/api/doctors/me/patients")
      .set("Authorization", `Bearer ${login.body.data.accessToken}`);
    expect(protectedCall.status).toBe(403);
    expect(protectedCall.body.code).toBe("ACCOUNT_PENDING_VERIFICATION");

    const me = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${login.body.data.accessToken}`);
    expect(me.status).toBe(200); // /me remains accessible while PENDING
  });

  test("duplicate license number is rejected", async () => {
    const base = {
      fullName: "Dr. One",
      email: "dr.one@example.com",
      password: "Passw0rd1",
      phone: "+15550002222",
      specialization: "Neurology",
      licenseNumber: "MD-DUP-001",
      hospital: "Test Hospital",
    };
    const first = await request(app).post("/api/auth/register/doctor").send(base);
    expect(first.status).toBe(201);

    const second = await request(app)
      .post("/api/auth/register/doctor")
      .send({ ...base, email: "dr.two@example.com" });
    expect(second.status).toBe(409);
  });
});

describe("Admin provisioning", () => {
  test("admin account exists only via seed script, never public signup", async () => {
    const routes = ["/api/auth/register/admin"];
    for (const route of routes) {
      const res = await request(app).post(route).send({});
      expect(res.status).toBe(404); // no such route exists at all
    }
  });

  test("seed script creates the admin idempotently", async () => {
    const first = await ensureAdmin();
    const second = await ensureAdmin();
    expect(first.id).toBe(second.id);
    expect(first.role).toBe("ADMIN");
    expect(first.status).toBe("ACTIVE");
  });
});

describe("Refresh & logout", () => {
  test("refresh rotates the token and the old refresh token cannot be reused", async () => {
    const email = "refresh.test@example.com";
    const password = "Passw0rd1";
    await request(app).post("/api/auth/register/patient").send({ fullName: "Refresh Test", email, password });
    const login = await request(app).post("/api/auth/login").send({ email, password });
    const { refreshToken } = login.body.data;

    const refreshRes = await request(app).post("/api/auth/refresh").send({ refreshToken });
    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.data.refreshToken).not.toBe(refreshToken);

    const reuse = await request(app).post("/api/auth/refresh").send({ refreshToken });
    expect(reuse.status).toBe(401);
  });

  test("logout revokes the refresh token", async () => {
    const email = "logout.test@example.com";
    const password = "Passw0rd1";
    await request(app).post("/api/auth/register/patient").send({ fullName: "Logout Test", email, password });
    const login = await request(app).post("/api/auth/login").send({ email, password });
    const { refreshToken } = login.body.data;

    const logoutRes = await request(app).post("/api/auth/logout").send({ refreshToken });
    expect(logoutRes.status).toBe(200);

    const refreshAfterLogout = await request(app).post("/api/auth/refresh").send({ refreshToken });
    expect(refreshAfterLogout.status).toBe(401);
  });
});
