import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Pagination } from "../components/ui/Pagination";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { adminApi, fullName } from "../api/admin";
import { apiErrorMessage } from "../api/client";

export default function PatientManagement() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const page = parseInt(params.get("page") || "1", 10);
  const limit = 20;

  const query = useQuery({
    queryKey: ["admin", "patients", { q: params.get("q"), page }],
    queryFn: () =>
      adminApi.listUsers({ search: params.get("q") || undefined, role: "patient", page, limit }),
    placeholderData: (prev) => prev,
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

  const users = query.data?.users || [];
  const total = query.data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <AdminShell>
      <Topbar title="Patients" subtitle="All patient accounts on the shared backend." />
      <main className="flex-1 space-y-4 p-6">
        <Card className="space-y-4">
          <form onSubmit={handleSearchSubmit}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search patients by name, email, or MRN"
              className="w-full max-w-sm rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </form>

          {query.isLoading && <LoadingState label="Loading patients..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {query.data && users.length === 0 && (
            <EmptyState title="No patient records match these filters" />
          )}

          {users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
                    <th className="py-2 pr-4 font-medium">Patient</th>
                    <th className="py-2 pr-4 font-medium">MRN</th>
                    <th className="py-2 pr-4 font-medium">Verified</th>
                    <th className="py-2 pr-4 font-medium">Joined</th>
                    <th className="py-2 pr-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((p) => (
                    <tr
                      key={p.id}
                      className="cursor-pointer border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.02]"
                      onClick={() => navigate(`/patients/${p.id}`)}
                    >
                      <td className="py-3 pr-4">
                        <p className="font-medium text-ink-900">{fullName(p)}</p>
                        <p className="text-xs text-ink-500">{p.email}</p>
                      </td>
                      <td className="py-3 pr-4 text-ink-500">{p.mrn || "—"}</td>
                      <td className="py-3 pr-4 text-ink-500">{p.emailVerified ? "✓" : "—"}</td>
                      <td className="py-3 pr-4 text-ink-500">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
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
              page={page}
              totalPages={totalPages}
              total={total}
              limit={limit}
              onChange={goToPage}
            />
          )}
        </Card>
      </main>
    </AdminShell>
  );
}
