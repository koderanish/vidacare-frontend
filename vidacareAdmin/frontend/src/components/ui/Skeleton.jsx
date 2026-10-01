export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="h-9 w-9 animate-pulse rounded-full bg-ink-900/10" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 animate-pulse rounded bg-ink-900/10" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-ink-900/10" />
      </div>
    </div>
  );
}

export function SkeletonBlock({ className = "h-24" }) {
  return <div className={`w-full animate-pulse rounded-lg bg-ink-900/10 ${className}`} />;
}
