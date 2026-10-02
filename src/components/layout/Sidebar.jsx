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
  HeartPulse,
} from "lucide-react";

// Matches the reference sidebar (ui/source/02-dashboard-overview.jsx etc.):
// primary items scroll in the main list, Notifications/Settings are pinned
// to the bottom of the nav via mt-auto so they're always reachable.
const TOP_NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/users", label: "Users", icon: Users },
  { to: "/patients", label: "Patients", icon: UsersRound },
  { to: "/verifications", label: "Verifications", icon: ShieldCheck },
  { to: "/alerts", label: "Alerts", icon: TriangleAlert },
  { to: "/resources", label: "Resources", icon: BookOpen },
];

const BOTTOM_NAV = [
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavItem({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-ink-900/5"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute -left-4 h-5 w-1 rounded-r-full bg-primary" />}
          <Icon className="size-5" />
          {label}
        </>
      )}
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-[248px] shrink-0 flex-col overflow-y-auto border-r border-border bg-white px-4 py-6 md:flex">
      <div className="mb-8 flex shrink-0 items-center gap-2.5 px-1">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <HeartPulse className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight text-foreground">VidaCare</p>
          <p className="text-xs leading-tight text-muted-foreground">Admin Portal</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col" aria-label="Primary navigation">
        <div className="flex flex-col gap-1">
          {TOP_NAV.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
        <div className="mt-auto flex shrink-0 flex-col gap-1 pt-4">
          {BOTTOM_NAV.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>
      <p className="mt-4 shrink-0 px-1 text-[11px] text-muted-foreground">© 2026 VidaCare · Prototype</p>
    </aside>
  );
}
