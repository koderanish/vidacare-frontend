import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export const APP_URL = "https://app.vidacaretechnologies.ca";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? "bg-white text-site-ink" : "text-white/75 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="w-full max-w-4xl rounded-3xl bg-site-ink/55 ring-1 ring-white/10 backdrop-blur-xl">
        <div className="flex h-[4.5rem] items-center justify-between pl-3 pr-3">
          <Link to="/" aria-label="VidaCare home" onClick={() => setOpen(false)}>
            <Logo light />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={APP_URL}
              className="hidden rounded-full bg-vida-400 px-5 py-2.5 text-sm font-semibold text-site-ink transition hover:bg-vida-300 active:scale-[0.96] sm:inline-block"
            >
              Open app ↗
            </a>
            <button
              type="button"
              className="rounded-full p-2.5 text-white md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-white/10 p-3 md:hidden">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <a href={APP_URL} className="mt-2 rounded-full bg-vida-400 px-5 py-3 text-center text-sm font-semibold text-site-ink">
              Open app ↗
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
