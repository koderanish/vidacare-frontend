import { client } from "./client";

// GET /api/admin/users/:id/journal -> { entries: [{id,mood,content,painLevel,createdAt}] }
export const journalApi = {
  list: async (patientId) => {
    const data = await client.get(`/admin/users/${patientId}/journal`).then((r) => r.data);
    return { items: data.entries || [] };
  },
};
