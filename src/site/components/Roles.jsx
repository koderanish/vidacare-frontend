import { HeartPulse, Stethoscope, Users } from "lucide-react";
import { ROLES } from "../data";

const ICONS = [HeartPulse, Users, Stethoscope];

// Three panels; on desktop the hovered one grows.
export function Roles() {
  return (
    <div className="flex flex-col gap-3 md:h-[30rem] md:flex-row">
      {ROLES.map((role, i) => {
        const Icon = ICONS[i];
        return (
          <div
            key={role.n}
            data-cursor
            data-reveal
            className="group relative flex min-h-[18rem] flex-1 flex-col justify-between overflow-hidden rounded-[2rem] bg-white/5 p-8 ring-1 ring-white/10 transition-[flex,background-color] duration-700 hover:bg-vida-500/25 md:hover:flex-[2]"
          >
            <span className="outline-text-light font-display text-7xl font-bold leading-none md:text-8xl">{role.n}</span>
            <div>
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-vida-400 text-site-ink transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">{role.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{role.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
