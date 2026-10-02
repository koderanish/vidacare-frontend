import { Bell, BookOpen, HeartPulse, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { EcgLine } from "./EcgLine";

const INK = "#04140f";

const NODES = [
  { icon: HeartPulse, style: { left: "50%", top: "0%" } },
  { icon: Users, style: { left: "0%", top: "100%" } },
  { icon: Stethoscope, style: { left: "100%", top: "100%" } },
];

// Decorative, animated illustration for a service card. `accent` is the card's highlight colour,
// `inverse` is the colour that reads on top of the accent.
export function ServiceVisual({ kind, accent, inverse = INK }) {
  if (kind === "ecg") {
    return <EcgLine className="h-36 w-full" color={accent} viewWidth={600} beats={2} />;
  }

  if (kind === "vitals") {
    return (
      <div className="flex h-40 items-end gap-3">
        {[55, 80, 40, 95, 65, 85, 50].map((h, i) => (
          <span
            key={i}
            className="site-anim w-5 origin-bottom rounded-full"
            style={{ height: `${h}%`, background: accent, animation: `site-bar 2.4s ease-in-out ${i * 0.18}s infinite` }}
          />
        ))}
      </div>
    );
  }

  if (kind === "alerts") {
    return (
      <div className="relative flex h-44 w-44 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="site-anim absolute inset-0 animate-ping rounded-full border-2"
            style={{ borderColor: accent, animationDelay: `${i * 0.7}s`, animationDuration: "2.6s" }}
          />
        ))}
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full" style={{ background: accent, color: inverse }}>
          <Bell className="h-9 w-9" />
        </span>
      </div>
    );
  }

  if (kind === "shield") {
    return (
      <div className="relative h-44 w-44">
        <span
          className="site-anim absolute inset-0 rounded-full border-2 border-dashed"
          style={{ borderColor: accent, animation: "site-spin 18s linear infinite" }}
        />
        <span className="absolute inset-6 flex items-center justify-center rounded-full" style={{ background: accent, color: inverse }}>
          <ShieldCheck className="h-14 w-14" />
        </span>
      </div>
    );
  }

  if (kind === "circle") {
    return (
      <div className="relative h-44 w-60">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" stroke={accent} strokeWidth="0.8" strokeDasharray="2 2" vectorEffect="non-scaling-stroke">
          <path d="M50 0 L0 100 L100 100 Z" vectorEffect="non-scaling-stroke" />
        </svg>
        {NODES.map(({ icon: Icon, style }, i) => (
          <span
            key={i}
            className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{ ...style, background: accent, color: inverse }}
          >
            <Icon className="h-6 w-6" />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-40 w-52">
      {[2, 1, 0].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-2xl border-2"
          style={{ borderColor: accent, transform: `rotate(${(i - 1) * 7}deg) translateY(${i * 6}px)`, opacity: 1 - i * 0.25 }}
        />
      ))}
      <span className="absolute inset-0 flex items-center justify-center" style={{ color: accent }}>
        <BookOpen className="h-14 w-14" />
      </span>
    </div>
  );
}
