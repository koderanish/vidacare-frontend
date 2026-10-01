import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const client = axios.create({ baseURL: BASE_URL });

function getStoredAuth() {
  try {
    return JSON.parse(localStorage.getItem("vidacare_auth") || "null");
  } catch {
    return null;
  }
}

export function setStoredAuth(auth) {
  if (auth) localStorage.setItem("vidacare_auth", JSON.stringify(auth));
  else localStorage.removeItem("vidacare_auth");
}

client.interceptors.request.use((config) => {
  const auth = getStoredAuth();
  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

// On a 401 (expired/invalid access token), try exactly one silent refresh
// before giving up and forcing a re-login. Avoids infinite retry loops.
let refreshPromise = null;

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status === 401 && !original._retry && !original.url?.includes("/auth/")) {
      original._retry = true;
      const auth = getStoredAuth();
      if (!auth?.refreshToken) {
        setStoredAuth(null);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        refreshPromise =
          refreshPromise ||
          axios.post(`${BASE_URL}/auth/refresh`, { refreshToken: auth.refreshToken });
        const res = await refreshPromise;
        refreshPromise = null;
        const next = res.data.data;
        setStoredAuth({ ...auth, accessToken: next.accessToken, refreshToken: next.refreshToken });
        original.headers.Authorization = `Bearer ${next.accessToken}`;
        return client(original);
      } catch (refreshErr) {
        refreshPromise = null;
        setStoredAuth(null);
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

// Normalizes every backend error into a single readable string for toasts.
export function apiErrorMessage(error) {
  return error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
}

export { getStoredAuth };
