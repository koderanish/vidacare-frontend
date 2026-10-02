import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { adminApi } from "../api/admin";
import { apiErrorMessage } from "../api/client";

function timeAgo(dateStr) {
  if (!dateStr) return "—";
  const diffMs = Date.now() - new Date(dateStr).getTime();
  if (!Number.isFinite(diffMs)) return "—";
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

export default function DashboardOverview() {
  const statsQ = useQuery({ queryKey: ["admin", "stats"], queryFn: adminApi.stats });
  const activityChartQ = useQuery({ queryKey: ["admin", "chart", "activity"], queryFn: adminApi.patientActivityChart });
  const regChartQ = useQuery({ queryKey: ["admin", "chart", "registrations"], queryFn: adminApi.registrationChart });
  const recentQ = useQuery({ queryKey: ["admin", "recent-activity"], queryFn: adminApi.recentActivity });
  const aiQ = useQuery({ queryKey: ["admin", "ai-usage"], queryFn: adminApi.aiUsage, refetchInterval: 60_000 });

  const s = statsQ.data;

  return (
    <AdminShell>
      <Topbar title="Dashboard overview" subtitle="Live snapshot from the shared mobile backend." />
      <main className="flex-1 space-y-6 p-6">
        {statsQ.isLoading && <LoadingState label="Loading dashboard statistics..." />}
        {statsQ.isError && <ErrorState message={apiErrorMessage(statsQ.error)} onRetry={statsQ.refetch} />}
        {s && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <StatCard label="Total users" value={s.users?.total} />
              <StatCard label="Patients" value={s.users?.patients} />
              <StatCard label="Doctors" value={s.users?.doctors} />
              <StatCard label="Caregivers" value={s.users?.caregivers} />
              <StatCard label="Admins" value={s.users?.admins} />
              <StatCard label="Verified emails" value={s.users?.verified} />
              <StatCard label="New users (7d)" value={s.users?.new7d} trend="Last 7 days" />
              <StatCard
                label="AI prompts (24h)"
                value={aiQ.data?.totals?.last24h ?? "—"}
                trend={aiQ.data ? `${aiQ.data.totals.total} total` : undefined}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <StatCard label="Vital readings" value={s.content?.vitals} />
              <StatCard label="Journal entries" value={s.content?.journal} />
              <StatCard label="Reminders" value={s.content?.reminders} />
              <StatCard label="Care plans" value={s.content?.plans} />
              <StatCard label="Care messages" value={s.content?.messages} />
              <StatCard label="AI messages" value={s.content?.aiMessages} />
              <StatCard label="Appointments" value={s.content?.appointments} />
              <StatCard label="Push tokens" value={s.tokens?.pushTokens} />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="mb-1 text-sm font-semibold text-ink-900">Patient activity</h3>
            <p className="mb-4 text-xs text-ink-500">Vital readings recorded per day, last 7 days</p>
            {activityChartQ.isLoading ? (
              <LoadingState label="Loading chart..." />
            ) : activityChartQ.isError ? (
              <ErrorState message={apiErrorMessage(activityChartQ.error)} onRetry={activityChartQ.refetch} />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={activityChartQ.data || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f2" />
                  <XAxis
                    dataKey="day"
                    tickFormatter={(d) => String(d || "").slice(5)}
                    fontSize={12}
                    stroke="#93a9b0"
                  />
                  <YAxis fontSize={12} stroke="#93a9b0" allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#23827c" strokeWidth={2} dot={false} name="Readings" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>

          <Card>
            <h3 className="mb-1 text-sm font-semibold text-ink-900">User registration trend</h3>
            <p className="mb-4 text-xs text-ink-500">New accounts per day, last 14 days</p>
            {regChartQ.isLoading ? (
              <LoadingState label="Loading chart..." />
            ) : regChartQ.isError ? (
              <ErrorState message={apiErrorMessage(regChartQ.error)} onRetry={regChartQ.refetch} />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={regChartQ.data || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f2" />
                  <XAxis dataKey="day" tickFormatter={(d) => String(d || "").slice(5)} fontSize={12} stroke="#93a9b0" />
                  <YAxis fontSize={12} stroke="#93a9b0" allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#2fa39a" strokeWidth={2} dot name="New users" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-900">Recent system activity</h3>
          </div>
          {recentQ.isLoading && <LoadingState label="Loading activity..." />}
          {recentQ.isError && <ErrorState message={apiErrorMessage(recentQ.error)} onRetry={recentQ.refetch} />}
          {recentQ.data && recentQ.data.length === 0 && <EmptyState title="No activity yet" />}
          {recentQ.data && recentQ.data.length > 0 && (
            <ul className="divide-y divide-ink-900/5">
              {recentQ.data.map((item, i) => (
                <li key={`${item.name}-${item.time}-${i}`} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-ink-900">{item.name} — {item.text}</p>
                  </div>
                  <span className="text-xs text-ink-400">{timeAgo(item.time)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </AdminShell>
  );
}
