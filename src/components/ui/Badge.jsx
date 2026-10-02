const TONES = {
  neutral: "bg-ink-900/5 text-ink-700",
  teal: "bg-teal-100 text-teal-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-rose-100 text-rose-700",
  blue: "bg-sky-100 text-sky-700",
  violet: "bg-violet-100 text-violet-700",
};

export function Badge({ tone = "neutral", children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone] || TONES.neutral} ${className}`}
    >
      {children}
    </span>
  );
}

export function Dot({ tone = "neutral" }) {
  const colors = {
    neutral: "bg-ink-300", teal: "bg-teal-500", green: "bg-emerald-500",
    amber: "bg-amber-500", red: "bg-rose-500", blue: "bg-sky-500",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${colors[tone] || colors.neutral}`} />;
}
