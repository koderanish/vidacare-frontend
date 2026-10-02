import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { LoadingState, ErrorState } from "../components/ui/States";
import { adminApi } from "../api/admin";
import { apiErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";

const FIELDS = [
  { key: "systolicMax", label: "High blood pressure — systolic above", unit: "mmHg" },
  { key: "diastolicMax", label: "High blood pressure — diastolic above", unit: "mmHg" },
  { key: "spo2Min", label: "Low SpO2 — below", unit: "%" },
  { key: "bloodSugarMax", label: "Elevated blood sugar — above", unit: "mg/dL" },
  { key: "heartRateMin", label: "Abnormal heart rate — below", unit: "bpm" },
  { key: "heartRateMax", label: "Abnormal heart rate — above", unit: "bpm" },
  { key: "missedReadingHours", label: "Missed reading — no reading for", unit: "hours" },
];

export default function Settings() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["admin", "alert-settings"], queryFn: adminApi.getAlertSettings });
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (query.data) setForm(query.data);
  }, [query.data]);

  const saveM = useMutation({
    mutationFn: (body) => adminApi.updateAlertSettings(body),
    onSuccess: () => {
      toast.success("Settings saved");
      qc.invalidateQueries({ queryKey: ["admin", "alert-settings"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  return (
    <AdminShell>
      <Topbar title="Settings" subtitle="Manage your VidaCare demo workspace preferences." />
      <main className="flex-1 space-y-4 p-6">
        <Card>
          <h3 className="mb-1 text-sm font-semibold text-ink-900">Admin profile</h3>
          <p className="text-sm text-ink-500">{user?.fullName} · {user?.email} · System Administrator</p>
        </Card>

        <Card>
          <h3 className="mb-1 text-sm font-semibold text-ink-900">Alert thresholds</h3>
          <p className="mb-4 text-xs text-ink-500">Demo thresholds only, not clinical guidance.</p>

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
                      onChange={(e) => setForm({ ...form, [f.key]: Number(e.target.value) })}
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

        <div className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-2 text-xs text-sky-800">
          All settings are prototype configuration and do not change clinical decision-making. Device
          integrations (Apple Watch, Fitbit, Garmin, etc.) are not implemented in this prototype.
        </div>
      </main>
    </AdminShell>
  );
}
