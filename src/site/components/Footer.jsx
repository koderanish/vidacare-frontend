import { Link } from "react-router-dom";
import { APP_URL } from "./Nav";

export const CONTACT_EMAIL = "vidhacare@gmail.com";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-site-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="max-w-sm font-display text-2xl font-semibold leading-tight tracking-tight text-white">
            Remote care that keeps patients, caregivers and doctors on the same page.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-label text-xs uppercase tracking-[0.25em] text-vida-300">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-vida-300" to="/about">About</Link></li>
            <li><Link className="hover:text-vida-300" to="/services">Services</Link></li>
            <li><Link className="hover:text-vida-300" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-label text-xs uppercase tracking-[0.25em] text-vida-300">Get started</h4>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-vida-300" href={APP_URL}>Open web app</a></li>
            <li><a className="hover:text-vida-300" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="select-none whitespace-nowrap text-center font-display text-[clamp(4rem,21vw,20rem)] font-bold leading-[0.78] tracking-[-0.05em] text-white/[0.07]"
      >
        VidaCare
      </p>

      <div className="relative border-t border-white/10 py-5 text-center font-label text-[11px] uppercase tracking-[0.2em] text-white/45">
        © {new Date().getFullYear()} VidaCare Technologies Inc.
      </div>
    </footer>
  );
}
