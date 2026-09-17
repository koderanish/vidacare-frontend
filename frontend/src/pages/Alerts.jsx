import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/ui/StatCard";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { alertsApi } from "../api/alerts";
import { apiErrorMessage } from "../api/client";

const SEVERITY_TONE = { LOW: "neutral", MEDIUM: "blue", HIGH: "amber", CRITICAL: "red" };
const STATUS_TONE = { OPEN: "amber", REVIEWED: "blue", RESOLVED: "green" };

export default function Alerts() {
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["alerts", { status, severity }],
    queryFn: () => alertsApi.list({ status: status || undefined, severity: severity || undefined, limit: 20 }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["alerts"] });

  const reviewM = useMutation({
    mutationFn: alertsApi.review,
    onSuccess: () => { toast.success("Alert marked as reviewed"); invalidate(); },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });
  const resolveM = useMutation({
    mutationFn: alertsApi.resolve,
    onSuccess: () => { toast.success("Alert marked as resolved"); invalidate(); },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const items = query.data?.items || [];
  const counts = {
    open: items.filter((a) => a.status === "OPEN").length,
    high: items.filter((a) => a.severity === "HIGH" || a.severity === "CRITICAL").length,
  };

  return (
    <AdminShell>
      <Topbar title="Alerts" subtitle="Review monitoring and system alerts using demo data." />
      <main className="flex-1 space-y-4 p-6">
        <div className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-2 text-xs text-sky-800">
          DEMO DATA · Alerts are simulated monitoring events for prototype demonstration only, not medical diagnoses.
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Open alerts" value={query.data?.pagination.total ?? "—"} />
          <StatCard label="On this page: High/Critical" value={counts.high} />
          <StatCard label="On this page: Open" value={counts.open} />
        </div>

        <Card className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm">
              <option value="">All statuses</option>
              <option value="OPEN">Open</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="RESOLVED">Resolved</option>
            </select>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm">
              <option value="">All severities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          {query.isLoading && <LoadingState label="Loading alerts..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {items.length === 0 && !query.isLoading && <EmptyState title="No alerts match these filters" />}

          {items.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
                    <th className="py-2 pr-4 font-medium">Patient</th>
                    <th className="py-2 pr-4 font-medium">Alert type</th>
                    <th className="py-2 pr-4 font-medium">Severity</th>
                    <th className="py-2 pr-4 font-medium">Generated at</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id} className="border-b border-ink-900/5 last:border-0">
                      <td className="py-3 pr-4 font-medium text-ink-900">{a.patient.user.fullName}</td>
                      <td className="py-3 pr-4 text-ink-700">{a.title}</td>
                      <td className="py-3 pr-4">
                        <Badge tone={SEVERITY_TONE[a.severity]}>{a.severity}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-ink-500">{new Date(a.createdAt).toLocaleString()}</td>
                      <td className="py-3 pr-4">
                        <Badge tone={STATUS_TONE[a.status]}>{a.status}</Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex justify-end gap-2">
                          {a.status === "OPEN" && (
                            <Button variant="outline" loading={reviewM.isPending && reviewM.variables === a.id} onClick={() => reviewM.mutate(a.id)}>
                              Mark reviewed
                            </Button>
                          )}
                          {a.status !== "RESOLVED" && (
                            <Button variant="primary" loading={resolveM.isPending && resolveM.variables === a.id} onClick={() => resolveM.mutate(a.id)}>
                              Resolve
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </AdminShell>
  );
}
