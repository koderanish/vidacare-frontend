import { HeartPulse } from "lucide-react";

// The app's one loading motif: the brand mark (teal circle + heart, same as
// the sidebar/login logo) with a blue arc rotating around it, buffering-style.
// Reused everywhere something needs to show "working" instead of each place
// inventing its own spinner.
const SIZES = {
  sm: { ring: 34, logo: 24, icon: 13, border: 2 },
  md: { ring: 56, logo: 40, icon: 20, border: 2.5 },
  lg: { ring: 84, logo: 60, icon: 30, border: 3 },
};

export function BrandLoader({ size = "md", className = "" }) {
  const s = SIZES[size] ?? SIZES.md;
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: s.ring, height: s.ring }}
      role="status"
      aria-label="Loading"
    >
      <span
        className="absolute inset-0 animate-spin rounded-full border-transparent border-t-blue-600 border-r-blue-600"
        style={{ borderWidth: s.border, borderStyle: "solid", animationDuration: "0.85s" }}
      />
      <span
        className="flex items-center justify-center rounded-full bg-teal-600 text-white"
        style={{ width: s.logo, height: s.logo }}
      >
        <HeartPulse style={{ width: s.icon, height: s.icon }} />
      </span>
    </span>
  );
}

export function BrandLoaderOverlay({ label = "Loading...", tone = "light" }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 ${
        tone === "light" ? "bg-white" : "bg-[#f7fafa]"
      }`}
    >
      <BrandLoader size="lg" />
      {label && <p className="text-sm font-medium text-ink-500">{label}</p>}
    </div>
  );
}
