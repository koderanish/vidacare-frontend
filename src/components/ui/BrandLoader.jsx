// The app's one loading motif: the brand mark (the client logo icon on a white
// disc) with a gold arc rotating around it, buffering-style.
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
        className="absolute inset-0 animate-spin rounded-full border-transparent border-t-gold-500 border-r-gold-500"
        style={{ borderWidth: s.border, borderStyle: "solid", animationDuration: "0.85s" }}
      />
      <span
        className="flex items-center justify-center rounded-full bg-white shadow-card"
        style={{ width: s.logo, height: s.logo }}
      >
        <img src="/images/logo-mark.png" alt="" style={{ height: s.icon + 6 }} className="w-auto" />
      </span>
    </span>
  );
}

export function BrandLoaderOverlay({ label = "Loading...", tone = "light" }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 ${
        tone === "light" ? "bg-white" : "bg-[#f8f6fd]"
      }`}
    >
      <BrandLoader size="lg" />
      {label && <p className="text-sm font-medium text-ink-500">{label}</p>}
    </div>
  );
}
