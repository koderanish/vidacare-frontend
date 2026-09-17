const VARIANTS = {
  primary: "bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-300",
  secondary: "bg-white text-ink-700 border border-ink-900/10 hover:bg-ink-900/5",
  outline: "bg-transparent text-teal-700 border border-teal-600 hover:bg-teal-50",
  danger: "bg-white text-rose-600 border border-rose-200 hover:bg-rose-50",
  dangerSolid: "bg-rose-600 text-white hover:bg-rose-700",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-900/5",
};

export function Button({ variant = "primary", className = "", loading, children, disabled, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
