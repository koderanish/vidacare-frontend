import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { adminApi } from "../api/admin";
import { apiErrorMessage } from "../api/client";

const LEVEL_TONE = { critical: "red", high: "amber", elevated: "blue" };

export default function Alerts() {
  const [status, setStatus] = useState("all");

  const query = useQuery({
    queryKey: ["admin", "alerts", status],
    queryFn: () => adminApi.listAlerts({ status }),
  });

  const items = query.data?.alerts || [];
  const counts = {
    critical: items.filter((a) => a.level === "critical").length,
    high: items.filter((a) => a.level === "high").length,
  };

  return (
    <AdminShell>
      <Topbar title="Alerts" subtitle="Live vitals alerts computed from the shared backend." />
      <main className="flex-1 space-y-4 p-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Active alerts" value={items.length} />
          <StatCard label="Critical" value={counts.critical} />
          <StatCard label="High" value={counts.high} />
        </div>

        <Card className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm">
              <option value="all">All levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="elevated">Elevated</option>
            </select>
          </div>

          {query.isLoading && <LoadingState label="Loading alerts..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {items.length === 0 && !query.isLoading && !query.isError && <EmptyState title="No alerts at this level" />}

          {items.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
                    <th className="py-2 pr-4 font-medium">Patient</th>
                    <th className="py-2 pr-4 font-medium">MRN</th>
                    <th className="py-2 pr-4 font-medium">Alert</th>
                    <th className="py-2 pr-4 font-medium">Level</th>
                    <th className="py-2 pr-4 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a, i) => (
                    <tr key={`${a.patientId}-${i}`} className="border-b border-ink-900/5 last:border-0">
                      <td className="py-3 pr-4 font-medium text-ink-900">{a.name}</td>
                      <td className="py-3 pr-4 text-ink-500">{a.mrn || "—"}</td>
                      <td className="py-3 pr-4 text-ink-700">{a.text}</td>
                      <td className="py-3 pr-4">
                        <Badge tone={LEVEL_TONE[a.level] || "neutral"}>{a.level}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-ink-500">{a.time ? new Date(a.time).toLocaleString() : "—"}</td>
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
