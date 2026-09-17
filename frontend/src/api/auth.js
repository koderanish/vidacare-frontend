import { client } from "./client";

export const authApi = {
  login: (body) => client.post("/auth/login", body).then((r) => r.data.data),
  logout: (refreshToken) => client.post("/auth/logout", { refreshToken }).then((r) => r.data.data),
  me: () => client.get("/auth/me").then((r) => r.data.data),
  registerDoctor: (body) => client.post("/auth/register/doctor", body).then((r) => r.data.data),
  registerCaregiver: (body) => client.post("/auth/register/caregiver", body).then((r) => r.data.data),
  registerPatient: (body) => client.post("/auth/register/patient", body).then((r) => r.data.data),
};
