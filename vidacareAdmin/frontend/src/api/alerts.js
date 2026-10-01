import { client } from "./client";

export const alertsApi = {
  list: (params) => client.get("/alerts", { params }).then((r) => r.data.data),
  get: (id) => client.get(`/alerts/${id}`).then((r) => r.data.data),
  review: (id) => client.patch(`/alerts/${id}/review`).then((r) => r.data.data),
  resolve: (id) => client.patch(`/alerts/${id}/resolve`).then((r) => r.data.data),
};
