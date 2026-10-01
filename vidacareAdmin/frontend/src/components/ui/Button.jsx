import { useClickPulse, ClickPulseRing } from "../../hooks/useClickPulse";

const VARIANTS = {
  primary: "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50",
  secondary: "bg-white text-ink-700 border border-ink-900/10 hover:bg-ink-900/5",
  outline: "bg-transparent text-primary border border-primary hover:bg-primary-soft",
  danger: "bg-white text-rose-600 border border-rose-200 hover:bg-rose-50",
  dangerSolid: "bg-rose-600 text-white hover:bg-rose-700",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-900/5",
};

export function Button({ variant = "primary", className = "", loading, children, disabled, onClick, ...props }) {
  const [pulsing, pulse] = useClickPulse();

  function handleClick(e) {
    if (!loading) pulse();
    onClick?.(e);
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!loading && pulsing && <ClickPulseRing />}
      {children}
    </button>
  );
}
