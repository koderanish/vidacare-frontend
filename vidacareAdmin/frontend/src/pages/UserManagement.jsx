import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge, Dot } from "../components/ui/Badge";
import { Pagination } from "../components/ui/Pagination";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { adminApi } from "../api/admin";
import { apiErrorMessage } from "../api/client";

const STATUS_DOT = { ACTIVE: "green", PENDING: "amber", REJECTED: "red", SUSPENDED: "neutral" };
const ROLE_TONE = { PATIENT: "teal", DOCTOR: "blue", CAREGIVER: "violet", ADMIN: "neutral" };

export default function UserManagement() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  const role = params.get("role") || "";
  const status = params.get("status") || "";
  const page = parseInt(params.get("page") || "1", 10);

  const query = useQuery({
    queryKey: ["admin", "users", { q: params.get("q"), role, status, page }],
    queryFn: () => adminApi.listUsers({ q: params.get("q") || undefined, role: role || undefined, status: status || undefined, page, limit: 10 }),
  });

  function updateParam(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setParams(next);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    updateParam("q", q);
  }

  function goToPage(p) {
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    setParams(next);
  }

  return (
    <AdminShell>
      <Topbar title="Users" subtitle="Manage access across patients, doctors, and caregivers." />
      <main className="flex-1 space-y-4 p-6">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[220px]">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or email"
                className="w-full rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </form>
            <select
              value={role}
              onChange={(e) => updateParam("role", e.target.value)}
              className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm"
            >
              <option value="">All roles</option>
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
              <option value="CAREGIVER">Caregiver</option>
              <option value="ADMIN">Admin</option>
            </select>
            <select
              value={status}
              onChange={(e) => updateParam("status", e.target.value)}
              className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm"
            >
              <option value="">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          {query.isLoading && <LoadingState label="Loading users..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {query.data && query.data.items.length === 0 && (
            <EmptyState title="No users match your current filters" />
          )}

          {query.data && query.data.items.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
                    <th className="py-2 pr-4 font-medium">Name</th>
                    <th className="py-2 pr-4 font-medium">Email</th>
                    <th className="py-2 pr-4 font-medium">Role</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 font-medium">Last Active</th>
                    <th className="py-2 pr-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {query.data.items.map((u) => (
                    <tr
                      key={u.id}
                      className="cursor-pointer border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.02]"
                      onClick={() => navigate(`/users/${u.id}`)}
                    >
                      <td className="py-3 pr-4 font-medium text-ink-900">{u.fullName}</td>
                      <td className="py-3 pr-4 text-ink-500">{u.email}</td>
                      <td className="py-3 pr-4">
                        <Badge tone={ROLE_TONE[u.role]}>{u.role}</Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Dot tone={STATUS_DOT[u.status]} /> {u.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-ink-500">
                        {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : "—"}
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
