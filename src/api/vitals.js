import { client } from "./client";

// Read-only view of a patient's vitals via the shared backend:
// GET /api/admin/users/:id/vitals -> { readings: [{id,type,value,unit,note,status,measuredAt}] }
export const vitalsApi = {
  latest: async (patientId) => {
    const { readings } = await client.get(`/admin/users/${patientId}/vitals`).then((r) => r.data);
    const byType = {};
    for (const reading of readings || []) {
      if (!byType[reading.type]) byType[reading.type] = reading;
    }
    return byType;
  },
  trends: async (patientId) => {
    const { readings } = await client.get(`/admin/users/${patientId}/vitals`).then((r) => r.data);
    const byDayType = {};
    for (const reading of readings || []) {
      const day = String(reading.measuredAt || "").slice(0, 10);
      const num = Number(String(reading.value).split("/")[0]);
      const key = `${day}:${reading.type}`;
      if (!byDayType[key] && Number.isFinite(num)) {
        byDayType[key] = { date: day, type: reading.type, valuePrimary: num, valueSecondary: null };
        if (reading.type === "blood_pressure") {
          const parts = String(reading.value).split("/");
          byDayType[key].valuePrimary = Number(parts[0]);
          byDayType[key].valueSecondary = parts[1] ? Number(parts[1]) : null;
        }
      }
    }
    return Object.values(byDayType).sort((a, b) => (a.date < b.date ? -1 : 1));
  },
  list: (patientId) => client.get(`/admin/users/${patientId}/vitals`).then((r) => r.data.readings || []),
};
