import { client } from "./client";

// Admin API against the same mobile backend (backend/src/server.js).
// All paths are relative to BASE_URL which already includes `/api`,
// so `/admin/stats` === `GET /api/admin/stats` on the server.
// Response shapes are passed through unwrapped (no `.data.data` envelope).

export function fullName(u) {
  if (!u) return "—";
  const n = [u.firstName, u.lastName].filter(Boolean).join(" ").trim();
  return n || u.email || "—";
}

export const adminApi = {
  // GET /api/admin/stats -> { users, content, tokens }
  stats: () => client.get("/admin/stats").then((r) => r.data),

  // Charts / activity
  patientActivityChart: () =>
    client.get("/admin/charts/patient-activity").then((r) => r.data.points),
  registrationChart: () =>
    client.get("/admin/charts/registrations").then((r) => r.data.points),
  recentActivity: () => client.get("/admin/activity").then((r) => r.data.activity),

  // Users: GET /api/admin/users?search=&role=&page=&limit=
  // -> { users: [{id,email,firstName,lastName,role,mrn,emailVerified,createdAt}], total, page, limit }
  listUsers: (params) => client.get("/admin/users", { params }).then((r) => r.data),
  getUser: (id) => client.get(`/admin/users/${id}`).then((r) => r.data),
  setRole: (id, role) => client.put(`/admin/users/${id}`, { role }).then((r) => r.data),
  setStatus: (id, status) => client.put(`/admin/users/${id}`, { status }).then((r) => r.data),
  deleteUser: (id) => client.delete(`/admin/users/${id}`).then((r) => r.data),
  createUser: (body) => client.post("/admin/users", body).then((r) => r.data),

  // Doctor approval: PUT /api/admin/users/:id/doctor-approval { approved }
  setDoctorApproval: (id, approved) =>
    client.put(`/admin/users/${id}/doctor-approval`, { approved }).then((r) => r.data),

  // Doctor <-> patient links (?doctorId= lists patients, ?patientId= lists doctors)
  patientDoctors: (patientId) =>
    client.get("/admin/doctor-links", { params: { patientId } }).then((r) => r.data.doctors || []),
  linkDoctor: (doctorId, patientId) =>
    client.post("/admin/doctor-links", { doctorId, patientId }).then((r) => r.data),
  unlinkDoctor: (doctorId, patientId) =>
    client.delete("/admin/doctor-links", { data: { doctorId, patientId } }).then((r) => r.data),

  // Broadcast: POST /api/admin/notifications { action, detail?, actorName? }
  broadcast: (body) => client.post("/admin/notifications", body).then((r) => r.data),
  listNotifications: (params) => client.get("/admin/notifications", { params }).then((r) => r.data),
  deleteNotification: (id) => client.delete(`/admin/notifications/${id}`).then((r) => r.data),

  // AI usage
  aiUsage: () => client.get("/admin/ai-usage").then((r) => r.data),

  // Resources CMS: { resources: [{id,title,category,description,content,authorName,status,isPublished,createdAt}] }
  listResources: (params) => client.get("/admin/resources", { params }).then((r) => r.data),
  createResource: (body) => client.post("/admin/resources", body).then((r) => r.data),
  updateResource: (id, body) => client.put(`/admin/resources/${id}`, body).then((r) => r.data),
  deleteResource: (id) => client.delete(`/admin/resources/${id}`).then((r) => r.data),

  // App settings (alert thresholds): { settings: { bp_sys_high, ... } }
  getSettings: () => client.get("/admin/settings").then((r) => r.data),
  updateSettings: (body) => client.put("/admin/settings", body).then((r) => r.data),

  // Alerts: GET /api/admin/alerts?status= -> { alerts: [{patientId,name,mrn,level,text,time}] }
  listAlerts: (params) => client.get("/admin/alerts", { params }).then((r) => r.data),

  // Verifications: GET /api/admin/verifications -> { pending: [{id,email,name,createdAt}] }
  listVerifications: () => client.get("/admin/verifications").then((r) => r.data),
};
