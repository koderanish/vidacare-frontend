import { client } from "./client";

export const treatmentApi = {
  listForPatient: (patientId) => client.get(`/treatment-plans/patient/${patientId}`).then((r) => r.data.data),
};
