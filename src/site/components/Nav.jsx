import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-vida-deep/90 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
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

        <a
          href={APP_URL}
          className="hidden rounded-full bg-vida-400 px-5 py-2 text-sm font-semibold text-vida-deep transition hover:bg-vida-300 active:scale-[0.96] md:inline-block"
        >
          Open web app
        </a>

        <button
          type="button"
          className="rounded-lg p-2 text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-5 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <a href={APP_URL} className="mt-3 block rounded-full bg-vida-400 px-5 py-3 text-center text-sm font-semibold text-vida-deep">
            Open web app
          </a>
        </div>
      )}
    </header>
  );
}
