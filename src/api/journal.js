import { client } from "./client";

export const journalApi = {
  list: (patientId, params) => client.get(`/journal/patient/${patientId}`, { params }).then((r) => r.data.data),
};
