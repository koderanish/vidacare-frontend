import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { apiErrorMessage } from "../api/client";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("admin@vidacare.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.fullName.split(" ")[0]}`);
      if (user.status !== "ACTIVE") {
        navigate("/pending", { replace: true });
      } else {
        navigate(location.state?.from?.pathname || "/", { replace: true });
      }
    } catch (err) {
      const message = apiErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-[42%] flex-col justify-between bg-[#eef8f7] p-12 md:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">♥</div>
          <span className="text-lg font-semibold text-ink-900">VidaCare</span>
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-ink-900">Care operations, connected.</h2>
          <p className="mt-3 max-w-sm text-ink-500">
            Securely manage the teams and people who make better care possible.
          </p>
        </div>
        <p className="text-xs text-ink-400">© 2026 VidaCare · Privacy · Security</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-[400px]">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-teal-600">Admin Portal</p>
          <h1 className="text-2xl font-semibold text-ink-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-500">Sign in to your VidaCare workspace.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vidacare.com"
                className="w-full rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <Button type="submit" className="w-full" loading={loading}>
              Sign in
            </Button>

            <p className="text-center text-xs text-ink-400">
              Admin access only. There is no public administrator signup.
            </p>
          </form>

          <div className="mt-8 rounded-lg bg-ink-900/[0.03] p-3 text-xs text-ink-500">
            <p className="font-medium text-ink-700">Demo credentials</p>
            <p className="mt-1">admin@vidacare.com / Admin@12345</p>
            <p>Doctors/caregivers/patients: see docs/DEMO_CREDENTIALS.md · password Demo@12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
