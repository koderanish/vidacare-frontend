import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { APP_URL } from "./Nav";

export const CONTACT_EMAIL = "vidhacare@gmail.com";

export function Footer() {
  return (
    <footer className="bg-vida-night text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Remote health monitoring that keeps patients, caregivers and verified doctors on the same page.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-vida-300" to="/about">About</Link></li>
            <li><Link className="hover:text-vida-300" to="/services">Services</Link></li>
            <li><Link className="hover:text-vida-300" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Get started</h4>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-vida-300" href={APP_URL}>Open web app</a></li>
            <li><a className="hover:text-vida-300" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} VidaCare Technologies Inc. All rights reserved.
      </div>
    </footer>
  );
}
