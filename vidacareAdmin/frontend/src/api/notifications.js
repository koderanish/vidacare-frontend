import { client } from "./client";

export const notificationsApi = {
  list: (params) => client.get("/notifications", { params }).then((r) => r.data.data),
  markRead: (id) => client.patch(`/notifications/${id}/read`).then((r) => r.data.data),
  markAllRead: () => client.patch("/notifications/read-all").then((r) => r.data.data),
  remove: (id) => client.delete(`/notifications/${id}`).then((r) => r.data.data),
};
