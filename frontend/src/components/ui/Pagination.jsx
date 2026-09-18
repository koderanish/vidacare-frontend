import { useClickPulse, ClickPulseRing } from "../../hooks/useClickPulse";

export function Pagination({ page, totalPages, total, limit, onChange }) {
  const [prevPulsing, pulsePrev] = useClickPulse();
  const [nextPulsing, pulseNext] = useClickPulse();
  if (!totalPages || totalPages <= 1) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between border-t border-ink-900/5 pt-3 text-sm text-ink-500">
      <span>
        Showing {from}–{to} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-ink-900/5 disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => {
            pulsePrev();
            onChange(page - 1);
          }}
        >
          {prevPulsing && <ClickPulseRing />}
          Previous
        </button>
        <span className="px-2 text-ink-700">
          Page {page} of {totalPages}
        </span>
        <button
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-ink-900/5 disabled:opacity-40"
          disabled={page >= totalPages}
          onClick={() => {
            pulseNext();
            onChange(page + 1);
          }}
        >
          {nextPulsing && <ClickPulseRing />}
          Next
        </button>
      </div>
    </div>
  );
}
