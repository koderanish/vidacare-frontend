import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, LockKeyhole, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { apiErrorMessage } from "../api/client";
import { authApi } from "../api/auth";

// Exact design tokens from the Flowstep reference (Screen 1), not
// approximated: primary/left-panel come from the screen's own source;
// foreground/muted-foreground/border/destructive are shadcn's stock
// "New York" neutral-theme values, confirmed against oklch literals that
// appear directly in other reference screens' chart/axis code (e.g.
// oklch(0.552 0.016 285.938) for muted-foreground, oklch(0.92 0.004 286.32)
// for border). Kept as inline arbitrary values so this page matches the
// reference exactly without touching the app's separate teal token scale.
// Real CSS syntax (spaces, not underscores) — these are used exclusively as
// inline `style` values in this file, never as Tailwind bracket classes.
const primary = "#6c40b8";
const foreground = "oklch(0.141 0.005 285.823)";
const mutedForeground = "oklch(0.552 0.016 285.938)";
const border = "oklch(0.92 0.004 286.32)";
const destructive = "oklch(0.577 0.245 27.325)";
const leftPanelBg = "#f3effc";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const emailInvalid = touchedEmail && email.length > 0 && !emailPattern.test(email);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // login() holds this promise open for the branded transition overlay
      // (rendered by AuthProvider, above the router) before resolving.
      // Only admins may use this portal — AuthContext rejects other roles.
      const user = await login(email, password);
      if (user.role !== "admin") {
        navigate("/pending", { replace: true });
      } else {
        navigate(location.state?.from?.pathname || "/", { replace: true });
      }
    } catch (err) {
      const message = apiErrorMessage(err);
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full min-h-screen max-w-full bg-white">
      {/* Left panel */}
      <aside
        className="hidden w-[42%] flex-col justify-between p-12 md:flex"
        style={{ backgroundColor: leftPanelBg }}
      >
        <div className="flex flex-col gap-8">
          <img src="/images/logo.png" alt="VidaCare Technologies" className="h-16 w-auto self-start" />
          <div className="flex max-w-[520px] flex-col gap-4 pt-12">
            <h1
              className="text-5xl font-semibold leading-tight tracking-tight"
              style={{ color: foreground }}
            >
              Care operations, connected.
            </h1>
            <p className="max-w-[460px] text-lg leading-8" style={{ color: mutedForeground }}>
              Securely manage the teams and people who make better care possible.
            </p>
          </div>
          <svg
            viewBox="0 0 560 260"
            fill="none"
            className="mt-8 h-[260px] w-full max-w-[560px]"
            aria-label="Abstract connected care illustration"
          >
            <path
              d="M18 188C74 130 103 202 156 145C207 90 245 121 290 77C339 29 375 103 425 64C464 34 493 54 542 18"
              stroke="rgba(108, 64, 184, 0.45)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M16 224C76 204 107 154 164 181C220 208 250 180 300 145C349 111 377 151 426 126C475 101 508 118 544 88"
              stroke="rgba(229, 166, 58, 0.55)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M72 48C105 74 119 102 152 94C191 84 203 45 239 52C275 59 283 104 320 106C359 108 371 72 404 79C438 86 449 119 488 132"
              stroke="rgba(43, 29, 110, 0.24)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="156" cy="145" r="6" fill="rgba(108, 64, 184, 0.7)" />
            <circle cx="300" cy="145" r="6" fill="rgba(229, 166, 58, 0.8)" />
            <circle cx="425" cy="64" r="6" fill="rgba(108, 64, 184, 0.7)" />
          </svg>
        </div>
        <div className="text-sm" style={{ color: mutedForeground }}>
          © 2025 VidaCare · Privacy · Security
        </div>
      </aside>

      {/* Right panel */}
      <main className="flex flex-1 items-center justify-center bg-white p-12">
        <div
          className="w-full max-w-[440px] rounded-2xl p-8"
          style={{ border: `1px solid ${border}`, boxShadow: "0px 20px 60px rgba(9, 9, 21, 0.08)" }}
        >
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.18em]" style={{ color: primary }}>
              ADMIN PORTAL
            </p>
            <h2 className="text-3xl font-semibold tracking-tight" style={{ color: foreground }}>
              Welcome back
            </h2>
            <p className="text-sm leading-6" style={{ color: mutedForeground }}>
              Sign in to your VidaCare workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium" style={{ color: foreground }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouchedEmail(true)}
                placeholder="admin@vidacare.com"
                className="h-11 rounded-lg px-3 text-sm outline-none focus:ring-1"
                style={{ border: `1px solid ${border}`, "--tw-ring-color": primary }}
              />
              {emailInvalid && (
                <p className="text-sm" style={{ color: destructive }}>
                  Enter a valid work email
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium" style={{ color: foreground }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg px-3 pr-11 text-sm outline-none focus:ring-1"
                  style={{ border: `1px solid ${border}`, "--tw-ring-color": primary }}
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: mutedForeground }}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded-sm accent-current"
                  style={{ color: primary }}
                />
                <label htmlFor="remember" className="text-sm font-normal" style={{ color: mutedForeground }}>
                  Remember me for 30 days
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium"
                style={{ color: primary }}
                onClick={() => setForgotOpen(true)}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="text-sm" style={{ color: destructive }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium text-white disabled:opacity-70"
              style={{ backgroundColor: primary }}
            >
              {loading && (
                <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              Sign in
            </button>

            <p className="text-center text-xs leading-5" style={{ color: mutedForeground }}>
              Admin access only. There is no public administrator signup.
            </p>
          </form>

          <div
            className="mt-5 flex items-center justify-center gap-2 pt-5 text-xs"
            style={{ borderTop: `1px solid ${border}`, color: mutedForeground }}
          >
            <LockKeyhole className="size-4" />
            <span>Protected with enterprise-grade security</span>
          </div>
        </div>
      </main>

      {forgotOpen && <ForgotPasswordModal onClose={() => setForgotOpen(false)} />}
    </div>
  );
}

function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState("request"); // request -> reset
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRequest(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authApi.forgotPassword(email);
      toast.success("If that account exists, a reset link was sent.");
      // Email delivery is stubbed in this prototype; the dev-mode response
      // returns the raw token directly so the flow is testable end-to-end.
      if (result?.devResetToken) setToken(result.devResetToken);
      setStep("reset");
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.resetPassword(token, newPassword);
      toast.success("Password reset. You can now sign in.");
      onClose();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6"
        style={{ border: `1px solid ${border}`, boxShadow: "0px 20px 60px rgba(9, 9, 21, 0.08)" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: foreground }}>
            {step === "request" ? "Reset your password" : "Choose a new password"}
          </h3>
          <button type="button" onClick={onClose} aria-label="Close" style={{ color: mutedForeground }}>
            <X className="size-4" />
          </button>
        </div>

        {step === "request" ? (
          <form onSubmit={handleRequest} className="flex flex-col gap-3">
            <p className="text-sm" style={{ color: mutedForeground }}>
              Enter your account email and we'll send a reset link.
            </p>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vidacare.com"
              className="h-11 rounded-lg px-3 text-sm outline-none focus:ring-1"
              style={{ border: `1px solid ${border}`, "--tw-ring-color": primary }}
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium text-white disabled:opacity-70"
              style={{ backgroundColor: primary }}
            >
              {loading && <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
              Send reset link
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium" style={{ color: foreground }}>Reset token</span>
              <input
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste the token from your reset email"
                className="h-11 rounded-lg px-3 text-sm outline-none focus:ring-1"
                style={{ border: `1px solid ${border}`, "--tw-ring-color": primary }}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium" style={{ color: foreground }}>New password</span>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="h-11 rounded-lg px-3 text-sm outline-none focus:ring-1"
                style={{ border: `1px solid ${border}`, "--tw-ring-color": primary }}
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium text-white disabled:opacity-70"
              style={{ backgroundColor: primary }}
            >
              {loading && <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
              Reset password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
