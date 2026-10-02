import axios from "axios";
import { ADMIN_BASE } from "../adminBase";

// Same mobile backend. BASE must include the `/api` prefix, e.g.
//   local:      http://localhost:3000/api
//   production: https://api.vidacaretechnologies.ca/api
// The mobile app instead uses the host without `/api` and puts `/api/...`
// in every path — both resolve to the same URLs. We normalise here so a
// bare host in VITE_API_URL still works.
function normalizeBase(raw) {
  // Production builds must never silently talk to localhost (that is what
  // happens when VITE_API_URL was not set at build time on the host).
  const fallback = import.meta.env.PROD
    ? "https://api.vidacaretechnologies.ca/api"
    : "http://localhost:3000/api";
  const base = (raw || fallback).replace(/\/+$/, "");
  return base.endsWith("/api") ? base : `${base}/api`;
}

const BASE_URL = normalizeBase(import.meta.env.VITE_API_URL);

export const client = axios.create({ baseURL: BASE_URL });

// The mobile backend issues a single JWT (`token`), not an
// access/refresh pair. We store `{ token }`. Legacy `{ accessToken }`
// payloads are still read so existing sessions keep working.
function getStoredAuth() {
  try {
    const auth = JSON.parse(localStorage.getItem("vidacare_auth") || "null");
    if (!auth) return null;
    if (auth.token) return auth;
    if (auth.accessToken) return { token: auth.accessToken, user: auth.user };
    return null;
  } catch {
    return null;
  }
}

export function setStoredAuth(auth) {
  if (auth?.token) localStorage.setItem("vidacare_auth", JSON.stringify({ token: auth.token }));
  else localStorage.removeItem("vidacare_auth");
}

function authToken() {
  return getStoredAuth()?.token || null;
}

client.interceptors.request.use((config) => {
  const token = authToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// No silent refresh: the backend has no /auth/refresh endpoint — a 401
// means the JWT expired, was revoked (password change), or the account was
// deleted. Clear the session and force a re-login (except for auth calls
// themselves, which surface their own error).
client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    if (status === 401 && !url.includes("/auth/")) {
      setStoredAuth(null);
      if (!window.location.pathname.endsWith("/login")) window.location.href = ADMIN_BASE + "/login";
    }
    return Promise.reject(error);
  }
);

// Normalizes every backend error into a single readable string for toasts.
export function apiErrorMessage(error) {
  return error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
}

export { getStoredAuth, BASE_URL };
