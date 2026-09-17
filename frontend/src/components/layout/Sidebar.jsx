import { NavLink } from "react-router-dom";

const NAV = [
  { to: "/", label: "Dashboard", icon: "▦", end: true },
  { to: "/users", label: "Users", icon: "◍" },
  { to: "/patients", label: "Patients", icon: "✚" },
  { to: "/verifications", label: "Verifications", icon: "✓" },
  { to: "/alerts", label: "Alerts", icon: "!" },
  { to: "/resources", label: "Resources", icon: "▤" },
  { to: "/notifications", label: "Notifications", icon: "◔" },
  { to: "/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-900/5 bg-white px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">♥</div>
        <div>
          <p className="text-sm font-semibold text-ink-900">VidaCare</p>
          <p className="text-xs text-ink-500">Admin Portal</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-teal-50 text-teal-700" : "text-ink-700 hover:bg-ink-900/5"
              }`
            }
          >
            <span className="w-4 text-center text-ink-400">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <p className="px-2 text-[11px] text-ink-300">© 2026 VidaCare · Prototype</p>
    </aside>
  );
}
