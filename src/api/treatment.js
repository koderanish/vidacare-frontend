import { client } from "./client";

// GET /api/admin/users/:id/care-plans -> { plans: [{id,title,doctorName,status,progress,medications,...}] }
export const treatmentApi = {
  listForPatient: (patientId) =>
    client.get(`/admin/users/${patientId}/care-plans`).then((r) => r.data.plans || []),
};
