export function Pagination({ page, totalPages, total, limit, onChange }) {
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
          className="rounded-md px-2 py-1 hover:bg-ink-900/5 disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </button>
        <span className="px-2 text-ink-700">
          Page {page} of {totalPages}
        </span>
        <button
          className="rounded-md px-2 py-1 hover:bg-ink-900/5 disabled:opacity-40"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
