import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { notificationsApi } from "../api/notifications";
import { apiErrorMessage } from "../api/client";

export default function Notifications() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["notifications"], queryFn: () => notificationsApi.list({ limit: 30 }) });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["notifications"] });

  const markReadM = useMutation({ mutationFn: notificationsApi.markRead, onSuccess: invalidate, onError: (e) => toast.error(apiErrorMessage(e)) });
  const markAllM = useMutation({
    mutationFn: notificationsApi.markAllRead,
    onSuccess: () => { toast.success("All notifications marked as read"); invalidate(); },
    onError: (e) => toast.error(apiErrorMessage(e)),
  });
  const removeM = useMutation({ mutationFn: notificationsApi.remove, onSuccess: invalidate, onError: (e) => toast.error(apiErrorMessage(e)) });

  return (
    <AdminShell>
      <Topbar
        title="Notifications"
        subtitle="Review system messages and delivery status."
        actions={<Button variant="secondary" onClick={() => markAllM.mutate()} loading={markAllM.isPending}>Mark all as read</Button>}
      />
      <main className="flex-1 p-6">
        <Card>
          {query.isLoading && <LoadingState label="Loading notifications..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {query.data && query.data.items.length === 0 && <EmptyState title="No notifications in this date range" />}
          {query.data && query.data.items.length > 0 && (
            <ul className="divide-y divide-ink-900/5">
              {query.data.items.map((n) => (
                <li key={n.id} className="flex items-start justify-between gap-4 py-3">
                  <div className="flex items-start gap-2">
                    {!n.readAt && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-500" />}
                    <div>
                      <p className={`text-sm ${n.readAt ? "text-ink-500" : "font-medium text-ink-900"}`}>{n.title}</p>
                      <p className="text-xs text-ink-400">{n.body}</p>
                      <p className="mt-1 text-xs text-ink-300">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {!n.readAt && (
                      <button className="text-xs text-teal-700 hover:underline" onClick={() => markReadM.mutate(n.id)}>
                        Mark read
                      </button>
                    )}
                    <button className="text-xs text-rose-600 hover:underline" onClick={() => removeM.mutate(n.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </AdminShell>
  );
}
