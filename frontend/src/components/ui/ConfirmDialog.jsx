import { Button } from "./Button";

export function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", danger, loading, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
      <div className="w-full max-w-sm rounded-xl2 bg-white p-6 shadow-card">
        <h3 className="text-base font-semibold text-ink-900">{title}</h3>
        {description && <p className="mt-2 text-sm text-ink-500">{description}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant={danger ? "dangerSolid" : "primary"} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
