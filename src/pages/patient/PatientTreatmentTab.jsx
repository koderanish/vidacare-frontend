import { useQuery } from "@tanstack/react-query";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/States";
import { treatmentApi } from "../../api/treatment";
import { apiErrorMessage } from "../../api/client";

export default function PatientTreatmentTab({ patientId }) {
  const query = useQuery({
    queryKey: ["treatment-plans", patientId],
    queryFn: () => treatmentApi.listForPatient(patientId),
  });

  if (query.isLoading) return <LoadingState label="Loading treatment plans..." />;
  if (query.isError) return <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />;
  if (!query.data || query.data.length === 0) return <EmptyState title="No treatment plan on file for this patient" />;

  const active = query.data.find((p) => p.status === "active") || query.data[0];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-2 text-xs text-sky-800">
        Read-only review from the shared backend. Admins do not make clinical decisions.
      </div>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-ink-900">{active.title}</h3>
            <p className="text-sm text-ink-500">
              {active.doctorName || "Care team"} · Started {active.startedAt ? new Date(active.startedAt).toLocaleDateString() : "—"}
            </p>
          </div>
          <Badge tone={active.status === "active" ? "green" : "neutral"}>{active.status}</Badge>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-ink-700">Plan progress</span>
            <span className="font-medium text-ink-900">{active.progress?.pct ?? 0}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-900/5">
            <div className="h-full rounded-full bg-teal-500" style={{ width: `${active.progress?.pct ?? 0}%` }} />
          </div>
          {active.lastReviewed && (
            <p className="mt-1 text-xs text-ink-400">Last reviewed {new Date(active.lastReviewed).toLocaleDateString()}</p>
          )}
        </div>

        {active.instructions && <p className="mt-4 text-sm text-ink-700">{active.instructions}</p>}

        <div className="mt-6">
          <h4 className="mb-2 text-sm font-semibold text-ink-900">Medications</h4>
          {(!active.medications || active.medications.length === 0) ? (
            <EmptyState title="No medications listed" />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
                  <th className="py-2 pr-4 font-medium">Medication</th>
                  <th className="py-2 pr-4 font-medium">Dosage</th>
                  <th className="py-2 pr-4 font-medium">Schedule</th>
                  <th className="py-2 pr-4 font-medium">Instructions</th>
                </tr>
              </thead>
              <tbody>
                {active.medications.map((m) => (
                  <tr key={m.id} className="border-b border-ink-900/5 last:border-0">
                    <td className="py-2 pr-4 font-medium text-ink-900">{m.name}</td>
                    <td className="py-2 pr-4 text-ink-700">{m.dosage}</td>
                    <td className="py-2 pr-4 text-ink-700">{m.schedule}</td>
                    <td className="py-2 pr-4 text-ink-500">{m.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {active.goals?.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-semibold text-ink-900">Goals</h4>
            <ul className="space-y-2 text-sm">
              {active.goals.map((g) => (
                <li key={g.id} className="flex items-center justify-between rounded-lg border border-ink-900/5 px-3 py-2">
                  <span className="text-ink-900">{g.title} <span className="text-xs text-ink-400">· {g.schedule}</span></span>
                  <Badge tone={g.status === "complete" ? "green" : "neutral"}>{g.status}</Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
