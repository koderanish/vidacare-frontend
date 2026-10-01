import { client } from "./client";

export const vitalsApi = {
  latest: (patientId) => client.get(`/vitals/patient/${patientId}/latest`).then((r) => r.data.data),
  trends: (patientId, params) =>
    client.get(`/vitals/patient/${patientId}/trends`, { params }).then((r) => r.data.data),
  list: (patientId, params) => client.get(`/vitals/patient/${patientId}`, { params }).then((r) => r.data.data),
};
