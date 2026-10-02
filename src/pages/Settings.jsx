import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { LoadingState, ErrorState } from "../components/ui/States";
import { adminApi, fullName } from "../api/admin";
import { apiErrorMessage, setStoredAuth } from "../api/client";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useQuery as useRQ } from "@tanstack/react-query";

// Real backend keys (PUT /api/admin/settings only accepts these).
const FIELDS = [
  { key: "bp_sys_high", label: "High blood pressure — systolic above", unit: "mmHg" },
  { key: "bp_dia_high", label: "High blood pressure — diastolic above", unit: "mmHg" },
  { key: "spo2_low", label: "Low SpO2 — below", unit: "%" },
  { key: "hr_high", label: "High heart rate — above", unit: "bpm" },
  { key: "hr_low", label: "Low heart rate — below", unit: "bpm" },
];

export default function Settings() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["admin", "settings"], queryFn: adminApi.getSettings });
  const aiQ = useRQ({ queryKey: ["admin", "ai-usage"], queryFn: adminApi.aiUsage });
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (query.data?.settings) setForm(query.data.settings);
  }, [query.data]);

  const saveM = useMutation({
    mutationFn: (body) => adminApi.updateSettings(body),
    onSuccess: () => {
      toast.success("Settings saved");
      qc.invalidateQueries({ queryKey: ["admin", "settings"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const pwM = useMutation({
    mutationFn: () => authApi.changePassword(pw.current, pw.next),
    onSuccess: (data) => {
      // Backend rotates the JWT on password change — store the new one.
      if (data?.token) setStoredAuth({ token: data.token });
      toast.success("Password changed");
      setPw({ current: "", next: "", confirm: "" });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });
  const pwValid =
    pw.current.length > 0 && pw.next.length >= 8 && pw.next === pw.confirm;

  return (
    <AdminShell>
      <Topbar title="Settings" subtitle="Alert thresholds + AI usage from the shared backend." />
      <main className="flex-1 space-y-4 p-6">
        <Card>
          <h3 className="mb-1 text-sm font-semibold text-ink-900">Admin profile</h3>
          <p className="text-sm text-ink-500">{fullName(user)} · {user?.email} · {user?.role}</p>
        </Card>

        <Card>
          <h3 className="mb-1 text-sm font-semibold text-ink-900">Alert thresholds</h3>
          <p className="mb-4 text-xs text-ink-500">These drive the live alerts on the Alerts page.</p>

          {query.isLoading && <LoadingState label="Loading thresholds..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}

          {form && (
            <div className="space-y-3">
              {FIELDS.map((f) => (
                <div key={f.key} className="flex items-center justify-between gap-4">
                  <label className="text-sm text-ink-700">{f.label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-24 rounded-lg border border-ink-900/10 px-2 py-1.5 text-sm"
                      value={form[f.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    />
                    <span className="w-12 text-xs text-ink-400">{f.unit}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button loading={saveM.isPending} onClick={() => saveM.mutate(form)}>
                  Save thresholds
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="mb-1 text-sm font-semibold text-ink-900">AI usage</h3>
          <p className="mb-3 text-xs text-ink-500">
            {aiQ.data
              ? `${aiQ.data.totals.total} prompts total · ${aiQ.data.totals.users} users · ${aiQ.data.totals.last24h} in last 24h`
              : "Loading…"}
          </p>
          {aiQ.data?.byUser?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
                    <th className="py-2 pr-4 font-medium">User</th>
                    <th className="py-2 pr-4 font-medium">Prompts</th>
                    <th className="py-2 pr-4 font-medium">Replies</th>
                    <th className="py-2 pr-4 font-medium">Last used</th>
                  </tr>
                </thead>
                <tbody>
                  {aiQ.data.byUser.slice(0, 10).map((u) => (
                    <tr key={u.id} className="border-b border-ink-900/5 last:border-0">
                      <td className="py-2 pr-4 text-ink-700">{u.email}</td>
                      <td className="py-2 pr-4 text-ink-900">{u.prompts}</td>
                      <td className="py-2 pr-4 text-ink-700">{u.replies}</td>
                      <td className="py-2 pr-4 text-ink-500">{u.lastUsed ? new Date(u.lastUsed).toLocaleString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="mb-1 text-sm font-semibold text-ink-900">Change password</h3>
          <p className="mb-3 text-xs text-ink-500">Changing it signs you out everywhere else.</p>
          <div className="grid max-w-md gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-ink-700">Current password</span>
              <input
                type="password"
                value={pw.current}
                onChange={(e) => setPw({ ...pw, current: e.target.value })}
                className="h-10 rounded-lg border border-ink-900/10 px-3 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-ink-700">New password (8+ characters)</span>
              <input
                type="password"
                value={pw.next}
                onChange={(e) => setPw({ ...pw, next: e.target.value })}
                className="h-10 rounded-lg border border-ink-900/10 px-3 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-ink-700">Confirm new password</span>
              <input
                type="password"
                value={pw.confirm}
                onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                className="h-10 rounded-lg border border-ink-900/10 px-3 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </label>
            {pw.next && pw.confirm && pw.next !== pw.confirm && (
              <p className="text-xs text-rose-600">New passwords don't match.</p>
            )}
            <div>
              <Button disabled={!pwValid} loading={pwM.isPending} onClick={() => pwM.mutate()}>
                Change password
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </AdminShell>
  );
}
