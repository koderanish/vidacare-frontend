import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Pagination } from "../components/ui/Pagination";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { adminApi, fullName } from "../api/admin";
import { apiErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";

const ROLE_TONE = { patient: "teal", doctor: "blue", caregiver: "violet", admin: "neutral" };
const ROLES = ["doctor", "patient", "caregiver", "admin"];

export default function UserManagement() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const qc = useQueryClient();
  const { user: me } = useAuth();

  const role = params.get("role") || "all";
  const page = parseInt(params.get("page") || "1", 10);
  const limit = 20;

  const query = useQuery({
    queryKey: ["admin", "users", { search: params.get("q"), role, page }],
    queryFn: () =>
      adminApi.listUsers({
        search: params.get("q") || undefined,
        role: role || "all",
        page,
        limit,
      }),
    placeholderData: (prev) => prev,
  });

  const roleM = useMutation({
    mutationFn: ({ id, role: next }) => adminApi.setRole(id, next),
    onSuccess: () => {
      toast.success("Role updated");
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const deleteM = useMutation({
    mutationFn: (id) => adminApi.deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted with all their data");
      setDeleteTarget(null);
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ email: "", firstName: "", lastName: "", role: "patient", tempPassword: "" });
  const createM = useMutation({
    mutationFn: (body) => adminApi.createUser(body),
    onSuccess: () => {
      toast.success("Account created — share the temporary password securely");
      setCreateOpen(false);
      setCreateForm({ email: "", firstName: "", lastName: "", role: "patient", tempPassword: "" });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });
  const createValid =
    /.+@.+\..+/.test(createForm.email) &&
    ["doctor", "patient", "caregiver"].includes(createForm.role) &&
    createForm.tempPassword.length >= 8;

  function updateParam(key, value) {
    const next = new URLSearchParams(params);
    if (value && value !== "all") next.set(key, value);
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

  const users = query.data?.users || [];
  const total = query.data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <AdminShell>
      <Topbar
        title="Users"
        subtitle="Manage access across patients, doctors, and caregivers."
        actions={<Button onClick={() => setCreateOpen(true)}>+ Create user</Button>}
      />
      <main className="flex-1 space-y-4 p-6">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[220px]">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, email, or MRN"
                className="w-full rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </form>
            <select
              value={role}
              onChange={(e) => updateParam("role", e.target.value)}
              className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm"
            >
              <option value="all">All roles</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="caregiver">Caregiver</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {query.isLoading && <LoadingState label="Loading users..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {query.data && users.length === 0 && (
            <EmptyState title="No users match your current filters" />
          )}

          {users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
                    <th className="py-2 pr-4 font-medium">User</th>
                    <th className="py-2 pr-4 font-medium">MRN</th>
                    <th className="py-2 pr-4 font-medium">Role</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 font-medium">Verified</th>
                    <th className="py-2 pr-4 font-medium">Joined</th>
                    <th className="py-2 pr-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const isSelf = me?.id === u.id;
                    return (
                      <tr
                        key={u.id}
                        className="cursor-pointer border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.02]"
                        onClick={() => navigate(`/users/${u.id}`)}
                      >
                        <td className="py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                          <p className="font-medium text-ink-900">{fullName(u)}</p>
                          <p className="text-xs text-ink-500">{u.email}</p>
                        </td>
                        <td className="py-3 pr-4 text-ink-500">{u.mrn || "—"}</td>
                        <td className="py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                          {isSelf ? (
                            <Badge tone={ROLE_TONE[u.role]}>{u.role}</Badge>
                          ) : (
                            <select
                              value={u.role}
                              disabled={roleM.isPending}
                              onChange={(e) => roleM.mutate({ id: u.id, role: e.target.value })}
                              className="rounded-lg border border-ink-900/10 px-2 py-1 text-sm"
                            >
                              {ROLES.map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="py-3 pr-4">
                          {u.status === "suspended"
                            ? <Badge tone="red">Suspended</Badge>
                            : <Badge tone="green">Active</Badge>}
                        </td>
                        <td className="py-3 pr-4 text-ink-500">{u.emailVerified ? "✓" : "—"}</td>
                        <td className="py-3 pr-4 text-ink-500">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                        </td>
                        <td className="py-3 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-2">
                            <button
                              className="text-xs text-teal-700 hover:underline"
                              onClick={() => navigate(`/users/${u.id}`)}
                            >
                              View
                            </button>
                            {!isSelf && (
                              <button
                                className="text-xs text-rose-600 hover:underline"
                                onClick={() => setDeleteTarget(u)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete user?"
        description={
          deleteTarget
            ? `${fullName(deleteTarget)} (${deleteTarget.email}) and ALL of their health data will be permanently removed. Type-to-confirm is handled by this dialog — this cannot be undone.`
            : ""
        }
        confirmLabel="Delete user and all data"
        danger
        loading={deleteM.isPending}
        onConfirm={() => deleteM.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
      />

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
          <div className="w-full max-w-md rounded-xl2 bg-white p-6 shadow-card">
            <h3 className="text-base font-semibold text-ink-900">Create user</h3>
            <p className="mt-1 text-sm text-ink-500">
              The account is created immediately — share the temporary password with them securely.
              Doctors created here are auto-approved.
            </p>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink-700">Email</span>
                <input
                  type="email"
                  className="input"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  placeholder="name@example.com"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-ink-700">First name</span>
                  <input
                    className="input"
                    value={createForm.firstName}
                    onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-ink-700">Last name</span>
                  <input
                    className="input"
                    value={createForm.lastName}
                    onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })}
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-ink-700">Role</span>
                  <select
                    className="input"
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                  >
                    <option value="patient">patient</option>
                    <option value="doctor">doctor</option>
                    <option value="caregiver">caregiver</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-ink-700">Temporary password (8+)</span>
                  <input
                    type="text"
                    className="input"
                    value={createForm.tempPassword}
                    onChange={(e) => setCreateForm({ ...createForm, tempPassword: e.target.value })}
                  />
                </label>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button disabled={!createValid} loading={createM.isPending} onClick={() => createM.mutate(createForm)}>
                Create account
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

