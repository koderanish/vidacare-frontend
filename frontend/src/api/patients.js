import { client } from "./client";

export const patientsApi = {
  list: (params) => client.get("/patients", { params }).then((r) => r.data.data),
  get: (id) => client.get(`/patients/${id}`).then((r) => r.data.data),
  careTeam: (id) => client.get(`/patients/${id}/care-team`).then((r) => r.data.data),
};

export const doctorsApi = {
  list: (params) => client.get("/doctors", { params }).then((r) => r.data.data),
  get: (id) => client.get(`/doctors/${id}`).then((r) => r.data.data),
};

export const caregiversApi = {
  list: (params) => client.get("/caregivers", { params }).then((r) => r.data.data),
  get: (id) => client.get(`/caregivers/${id}`).then((r) => r.data.data),
};
