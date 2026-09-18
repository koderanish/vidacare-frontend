import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Topbar({ title, subtitle, actions }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-900/5 bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-ink-900">{title}</h1>
        {subtitle && <p className="text-sm text-ink-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <div className="flex items-center gap-2 rounded-full border border-ink-900/10 py-1 pl-1 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
            {(user?.fullName || "A").slice(0, 1)}
          </div>
          <span className="text-sm font-medium text-ink-700">{user?.fullName}</span>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-ink-900/10 px-3 py-1.5 text-sm text-ink-700 hover:bg-ink-900/5"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
