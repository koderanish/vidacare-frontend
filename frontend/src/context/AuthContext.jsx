import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi } from "../api/auth";
import { getStoredAuth, setStoredAuth } from "../api/client";
import { BrandLoaderOverlay } from "../components/ui/BrandLoader";

const AuthContext = createContext(null);

// How long the branded transition overlay stays up after a successful login,
// before the route guards below it are allowed to be seen. Lives here (not in
// Login.jsx) because LoginGate/ProtectedRoute redirect reactively the instant
// `user` changes, which would otherwise unmount the overlay mid-transition.
const LOGIN_TRANSITION_MS = 850;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transitionLabel, setTransitionLabel] = useState(null);

  const bootstrap = useCallback(async () => {
    const stored = getStoredAuth();
    if (!stored?.accessToken) {
      setLoading(false);
      return;
    }
    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      setStoredAuth(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  async function login(email, password) {
    const data = await authApi.login({ email, password });
    setStoredAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    setTransitionLabel(
      data.user.status === "ACTIVE" ? `Welcome back, ${data.user.fullName.split(" ")[0]}` : "Signing you in..."
    );
    setUser(data.user);
    await new Promise((resolve) => setTimeout(resolve, LOGIN_TRANSITION_MS));
    setTransitionLabel(null);
    return data.user;
  }

  async function logout() {
    const stored = getStoredAuth();
    try {
      if (stored?.refreshToken) await authApi.logout(stored.refreshToken);
    } catch {
      // best-effort; clear local state regardless
    }
    setStoredAuth(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refetchMe: bootstrap }}>
      {children}
      {transitionLabel && <BrandLoaderOverlay label={transitionLabel} />}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
