import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { adminApi } from "../api/admin";
import { apiErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { fullName } from "../api/admin";

export default function Notifications() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const query = useQuery({ queryKey: ["admin", "notifications"], queryFn: () => adminApi.listNotifications({ limit: 50 }) });
  const [action, setAction] = useState("");
  const [detail, setDetail] = useState("");

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "notifications"] });

  const broadcastM = useMutation({
    mutationFn: () =>
      adminApi.broadcast({
        action: action.trim(),
        detail: detail.trim() || undefined,
        actorName: fullName(user),
      }),
    onSuccess: () => {
      toast.success("Broadcast sent to all users");
      setAction("");
      setDetail("");
      invalidate();
    },
    onError: (e) => toast.error(apiErrorMessage(e)),
  });

  const removeM = useMutation({
    mutationFn: (id) => adminApi.deleteNotification(id),
    onSuccess: () => {
      toast.success("Notification deleted");
      invalidate();
    },
    onError: (e) => toast.error(apiErrorMessage(e)),
  });

  const items = query.data?.notifications || [];

  return (
    <AdminShell>
      <Topbar title="Notifications" subtitle="Broadcasts reach every user — confirm before sending." />
      <main className="flex-1 space-y-4 p-6">
        <Card>
          <h3 className="mb-1 text-sm font-semibold text-ink-900">Broadcast to all users</h3>
          <p className="mb-3 text-xs text-ink-500">Writes one row visible to every mobile + web user.</p>
          <div className="space-y-3">
            <input
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="Action, e.g. Maintenance tonight at 10pm"
              maxLength={255}
              className="w-full rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            <input
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Detail (optional)"
              maxLength={255}
              className="w-full rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            <div className="flex justify-end">
              <Button disabled={!action.trim()} loading={broadcastM.isPending} onClick={() => broadcastM.mutate()}>
                Send broadcast
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          {query.isLoading && <LoadingState label="Loading notifications..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {query.data && items.length === 0 && <EmptyState title="No broadcasts yet" />}
          {items.length > 0 && (
            <ul className="divide-y divide-ink-900/5">
              {items.map((n) => (
                <li key={n.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink-900">{n.action}</p>
                    {n.detail && <p className="text-xs text-ink-500">{n.detail}</p>}
                    <p className="mt-1 text-xs text-ink-300">
                      {n.actorName || "VidaCare"} · {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                    </p>
                  </div>
                  <button
                    className="shrink-0 text-xs text-rose-600 hover:underline"
                    onClick={() => removeM.mutate(n.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </AdminShell>
  );
}
