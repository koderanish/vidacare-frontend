import { client } from "./client";

// Auth against the same mobile backend (backend/src/server.js).
// Login/signup return `{ message, token, user }` — no `.data` wrapper,
// no access/refresh pair. `me()` unwraps `{ user }` for the AuthContext.

export const authApi = {
  login: (body) => client.post("/auth/login", body).then((r) => r.data),
  me: () => client.get("/auth/verify").then((r) => r.data.user),
  profile: () => client.get("/auth/profile").then((r) => r.data.user),
  forgotPassword: (email) =>
    client.post("/auth/forgot-password", { email }).then((r) => ({
      message: r.data.message,
      // Dev-only raw token (backend sends `resetToken`, not `devResetToken`).
      devResetToken: r.data.resetToken,
    })),
  resetPassword: (token, password) =>
    client.post("/auth/reset-password", { token, password }).then((r) => r.data),
  // PUT /api/auth/password { currentPassword, newPassword } -> { message, token }.
  // The backend bumps token_version, so the returned token MUST replace the
  // stored one or the next request 401s.
  changePassword: (currentPassword, newPassword) =>
    client.put("/auth/password", { currentPassword, newPassword }).then((r) => r.data),
  // No server-side logout endpoint — clearing localStorage is the logout.
  logout: async () => ({ message: "Logged out" }),
};
