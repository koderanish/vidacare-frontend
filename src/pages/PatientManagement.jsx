import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Pagination } from "../components/ui/Pagination";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { patientsApi } from "../api/patients";
import { apiErrorMessage } from "../api/client";

export default function PatientManagement() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const page = parseInt(params.get("page") || "1", 10);

  const query = useQuery({
    queryKey: ["patients", { q: params.get("q"), page }],
    queryFn: () => patientsApi.list({ q: params.get("q") || undefined, page, limit: 10 }),
  });

  function handleSearchSubmit(e) {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    else next.delete("q");
    next.delete("page");
    setParams(next);
  }

  function goToPage(p) {
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    setParams(next);
  }

  return (
    <AdminShell>
      <Topbar title="Patients" subtitle="Review demo patient records and care assignments." />
      <main className="flex-1 space-y-4 p-6">
        <div className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-2 text-xs text-sky-800">
          DEMO DATA · This workspace contains sample patient records for product demonstration only.
        </div>

        <Card className="space-y-4">
          <form onSubmit={handleSearchSubmit}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search patients by name"
              className="w-full max-w-sm rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </form>

          {query.isLoading && <LoadingState label="Loading patients..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {query.data && query.data.items.length === 0 && (
            <EmptyState title="No patient records match these filters" />
          )}

          {query.data && query.data.items.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
                    <th className="py-2 pr-4 font-medium">Patient</th>
                    <th className="py-2 pr-4 font-medium">Code</th>
                    <th className="py-2 pr-4 font-medium">Assigned Doctor</th>
                    <th className="py-2 pr-4 font-medium">Assigned Caregiver</th>
                    <th className="py-2 pr-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {query.data.items.map((p) => (
                    <tr
                      key={p.id}
                      className="cursor-pointer border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.02]"
                      onClick={() => navigate(`/patients/${p.id}`)}
                    >
                      <td className="py-3 pr-4 font-medium text-ink-900">{p.user.fullName}</td>
                      <td className="py-3 pr-4 text-ink-500">{p.patientCode}</td>
                      <td className="py-3 pr-4">
                        {p.doctorAssignments?.[0] ? (
                          p.doctorAssignments[0].doctor.fullName
                        ) : (
                          <Badge tone="neutral">Unassigned</Badge>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        {p.caregiverAssignments?.[0] ? (
                          p.caregiverAssignments[0].caregiver.fullName
                        ) : (
                          <Badge tone="neutral">Unassigned</Badge>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-right text-teal-700">View</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {query.data && (
            <Pagination
              page={query.data.pagination.page}
              totalPages={query.data.pagination.totalPages}
              total={query.data.pagination.total}
              limit={query.data.pagination.limit}
              onChange={goToPage}
            />
          )}
        </Card>
      </main>
    </AdminShell>
  );
}
