import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UsersRound,
  ShieldCheck,
  TriangleAlert,
  BookOpen,
  Bell,
  Settings,
} from "lucide-react";

// Mobile top nav (the sidebar is desktop-only). Horizontal scrollable row of
// the same destinations so phones can navigate at all.
const ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/users", label: "Users", icon: Users },
  { to: "/patients", label: "Patients", icon: UsersRound },
  { to: "/verifications", label: "Verifications", icon: ShieldCheck },
  { to: "/alerts", label: "Alerts", icon: TriangleAlert },
  { to: "/resources", label: "Resources", icon: BookOpen },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="flex gap-1 overflow-x-auto border-b border-ink-900/5 bg-white px-3 py-2 md:hidden"
    >
      {ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              isActive ? "bg-primary-soft text-primary" : "text-muted-foreground"
            }`
          }
        >
          <Icon className="size-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
