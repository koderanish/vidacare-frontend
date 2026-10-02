import { client } from "./client";

export const adminApi = {
  stats: () => client.get("/admin/dashboard/stats").then((r) => r.data.data),
  patientActivityChart: () => client.get("/admin/dashboard/charts/patient-activity").then((r) => r.data.data),
  registrationChart: () => client.get("/admin/dashboard/charts/registrations").then((r) => r.data.data),
  recentActivity: () => client.get("/admin/dashboard/activity").then((r) => r.data.data),

  listUsers: (params) => client.get("/admin/users", { params }).then((r) => r.data.data),
  getUser: (id) => client.get(`/admin/users/${id}`).then((r) => r.data.data),
  updateUserStatus: (id, body) => client.patch(`/admin/users/${id}/status`, body).then((r) => r.data.data),

  listVerifications: (params) => client.get("/admin/verifications", { params }).then((r) => r.data.data),
  getVerification: (id) => client.get(`/admin/verifications/${id}`).then((r) => r.data.data),
  approveVerification: (id, body) => client.post(`/admin/verifications/${id}/approve`, body).then((r) => r.data.data),
  rejectVerification: (id, body) => client.post(`/admin/verifications/${id}/reject`, body).then((r) => r.data.data),

  getAlertSettings: () => client.get("/admin/alert-settings").then((r) => r.data.data),
  updateAlertSettings: (body) => client.put("/admin/alert-settings", body).then((r) => r.data.data),

  assignDoctor: (patientId, doctorId) =>
    client.post(`/admin/patients/${patientId}/doctors/${doctorId}`).then((r) => r.data.data),
  // doctorId isn't read by the backend for removal (only one ACTIVE
  // assignment can ever exist per patient) but is required in the path.
  removeDoctor: (patientId, doctorId) =>
    client.delete(`/admin/patients/${patientId}/doctors/${doctorId}`).then((r) => r.data.data),
  assignCaregiver: (patientId, caregiverId) =>
    client.post(`/admin/patients/${patientId}/caregivers/${caregiverId}`).then((r) => r.data.data),
  removeCaregiver: (patientId, caregiverId) =>
    client.delete(`/admin/patients/${patientId}/caregivers/${caregiverId}`).then((r) => r.data.data),
  updateCaregiverPermissions: (patientId, body) =>
    client.patch(`/admin/patients/${patientId}/caregiver-permissions`, body).then((r) => r.data.data),
};
