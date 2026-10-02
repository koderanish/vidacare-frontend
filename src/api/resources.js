import { client } from "./client";

export const resourcesApi = {
  list: (params) => client.get("/resources", { params }).then((r) => r.data.data),
  get: (id) => client.get(`/resources/${id}`).then((r) => r.data.data),
  create: (body) => client.post("/resources", body).then((r) => r.data.data),
  update: (id, body) => client.patch(`/resources/${id}`, body).then((r) => r.data.data),
  publish: (id) => client.patch(`/resources/${id}/publish`).then((r) => r.data.data),
  unpublish: (id) => client.patch(`/resources/${id}/unpublish`).then((r) => r.data.data),
  remove: (id) => client.delete(`/resources/${id}`).then((r) => r.data.data),
};
