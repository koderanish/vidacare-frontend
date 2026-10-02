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
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.round(diffMs / 60000);
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

  const s = statsQ.data;

  return (
    <AdminShell>
      <Topbar title="Dashboard overview" subtitle="Operational snapshot for the VidaCare demo workspace." />
      <main className="flex-1 space-y-6 p-6">
        <div className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-2 text-xs text-sky-800">
          DEMO DATA · This workspace contains sample records for product demonstration only.
        </div>

        {statsQ.isLoading && <LoadingState label="Loading dashboard statistics..." />}
        {statsQ.isError && <ErrorState message={apiErrorMessage(statsQ.error)} onRetry={statsQ.refetch} />}
        {s && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <StatCard label="Total Patients" value={s.totalPatients} />
            <StatCard label="Total Doctors" value={s.totalDoctors} />
            <StatCard label="Total Caregivers" value={s.totalCaregivers} />
            <StatCard
              label="Pending Doctor Verifications"
              value={s.pendingDoctorVerifications}
              trend={s.pendingDoctorVerifications > 0 ? "Needs review" : "All clear"}
              trendTone={s.pendingDoctorVerifications > 0 ? "amber" : "green"}
            />
            <StatCard
              label="Pending Caregiver Verifications"
              value={s.pendingCaregiverVerifications}
              trend={s.pendingCaregiverVerifications > 0 ? "Needs review" : "All clear"}
              trendTone={s.pendingCaregiverVerifications > 0 ? "amber" : "green"}
            />
            <StatCard
              label="Active Alerts"
              value={s.activeAlerts}
              trend={s.activeAlerts > 0 ? `${s.activeAlerts} open` : "None open"}
              trendTone={s.activeAlerts > 0 ? "amber" : "green"}
            />
            <StatCard label="Active Treatment Plans" value={s.activeTreatmentPlans} />
            <StatCard label="New Users (30d)" value={s.newUsers} trend="Last 30 days" />
          </div>
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
                    dataKey="date"
                    tickFormatter={(d) => d.slice(5)}
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
            <p className="mb-4 text-xs text-ink-500">New accounts per month, last 6 months</p>
            {regChartQ.isLoading ? (
              <LoadingState label="Loading chart..." />
            ) : regChartQ.isError ? (
              <ErrorState message={apiErrorMessage(regChartQ.error)} onRetry={regChartQ.refetch} />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={regChartQ.data || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f2" />
                  <XAxis dataKey="label" fontSize={12} stroke="#93a9b0" />
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
          {recentQ.data && recentQ.data.length === 0 && <EmptyState title="No activity in this time range" />}
          {recentQ.data && recentQ.data.length > 0 && (
            <ul className="divide-y divide-ink-900/5">
              {recentQ.data.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-ink-900">{item.summary}</p>
                    <p className="text-xs text-ink-500">{item.actor?.fullName || "System"}</p>
                  </div>
                  <span className="text-xs text-ink-400">{timeAgo(item.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </AdminShell>
  );
}
