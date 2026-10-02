import { useState } from "react";
import { ADMIN_BASE } from "../adminBase";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { LoadingState, ErrorState } from "../components/ui/States";
import { adminApi, fullName } from "../api/admin";
import { apiErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";

const ROLES = ["doctor", "patient", "caregiver", "admin"];

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user: me } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const query = useQuery({ queryKey: ["admin", "user", id], queryFn: () => adminApi.getUser(id) });

  const roleM = useMutation({
    mutationFn: (role) => adminApi.setRole(id, role),
    onSuccess: () => {
      toast.success("Role updated");
      qc.invalidateQueries({ queryKey: ["admin", "user", id] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const approvalM = useMutation({
    mutationFn: (approved) => adminApi.setDoctorApproval(id, approved),
    onSuccess: (d, approved) => {
      toast.success(approved ? "Doctor approved" : "Doctor approval removed");
      qc.invalidateQueries({ queryKey: ["admin", "user", id] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const statusM = useMutation({
    mutationFn: (status) => adminApi.setStatus(id, status),
    onSuccess: (d, status) => {
      toast.success(status === "suspended" ? "Account suspended — signed out everywhere" : "Account reactivated");
      qc.invalidateQueries({ queryKey: ["admin", "user", id] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const deleteM = useMutation({
    mutationFn: () => adminApi.deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted with all their data");
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      navigate("/users");
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  if (query.isLoading) {
    return (
      <AdminShell>
        <Topbar title="User details" />
        <main className="flex-1 p-6">
          <LoadingState label="Loading user..." />
        </main>
      </AdminShell>
    );
  }
  if (query.isError) {
    return (
      <AdminShell>
        <Topbar title="User details" />
        <main className="flex-1 p-6">
          <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />
        </main>
      </AdminShell>
    );
  }

  const { user, counts } = query.data;
  const isSelf = me?.id === user.id;
  const name = fullName(user);

  return (
    <AdminShell>
      <Topbar title={name} subtitle={user.email} />
      <main className="flex-1 space-y-4 p-6">
        <button onClick={() => navigate(-1)} className="text-sm text-ink-500 hover:text-ink-700">
          ← Back
        </button>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-lg font-semibold text-teal-700">
                {name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-ink-900">{name}</h2>
                <p className="text-sm text-ink-500">{user.email}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge tone="teal">{user.role}</Badge>
                  {user.emailVerified ? <Badge tone="green">Verified</Badge> : <Badge tone="neutral">Unverified</Badge>}
                  {user.status === "suspended"
                    ? <Badge tone="red">Suspended</Badge>
                    : <Badge tone="green">Active</Badge>}
                  {user.role === "doctor" && (
                    user.doctorApproved ? <Badge tone="green">Doctor approved</Badge> : <Badge tone="amber">Awaiting approval</Badge>
                  )}
                  {user.mrn && <Badge tone="neutral">{user.mrn}</Badge>}
                </div>
              </div>
            </div>

            {!isSelf && (
              <div className="flex flex-wrap gap-2">
                {user.role === "doctor" && (
                  user.doctorApproved ? (
                    <Button variant="secondary" loading={approvalM.isPending} onClick={() => approvalM.mutate(false)}>
                      Remove approval
                    </Button>
                  ) : (
                    <Button loading={approvalM.isPending} onClick={() => approvalM.mutate(true)}>
                      Approve doctor
                    </Button>
                  )
                )}
                {user.status === "suspended" ? (
                  <Button loading={statusM.isPending} onClick={() => statusM.mutate("active")}>
                    Reactivate account
                  </Button>
                ) : (
                  <Button variant="secondary" loading={statusM.isPending} onClick={() => statusM.mutate("suspended")}>
                    Suspend account
                  </Button>
                )}
                <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                  Delete user
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-900/5 pt-4 text-sm md:grid-cols-3">
            <Field label="Phone" value={user.phone || "—"} />
            <Field label="Date of birth" value={user.dateOfBirth || "—"} />
            <Field label="Gender" value={user.gender || "—"} />
            <Field label="MRN" value={user.mrn || "—"} />
            <Field label="Joined" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"} />
            <div>
              <p className="text-xs text-ink-400">Role</p>
              {isSelf ? (
                <p className="font-medium text-ink-900">{user.role} (you — cannot change own role)</p>
              ) : (
                <select
                  value={user.role}
                  disabled={roleM.isPending}
                  onChange={(e) => roleM.mutate(e.target.value)}
                  className="mt-1 rounded-lg border border-ink-900/10 px-2 py-1 text-sm"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </Card>

        {counts && (
          <Card>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Data counts</h3>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-5">
              <Field label="Vitals" value={counts.vitals} />
              <Field label="Journal" value={counts.journal} />
              <Field label="Reminders" value={counts.reminders} />
              <Field label="Care plans" value={counts.plans} />
              <Field label="AI messages" value={counts.aiMessages} />
            </div>
            {user.role === "patient" && (
              <p className="mt-3 text-xs text-ink-400">
                Full record: <a className="text-teal-700 hover:underline" href={`${ADMIN_BASE}/patients/${user.id}`}>open patient view →</a>
              </p>
            )}
          </Card>
        )}
      </main>

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${name}?`}
        description="This cascades ALL of their health data and cannot be undone."
        confirmLabel="Delete user and all data"
        danger
        loading={deleteM.isPending}
        onConfirm={() => deleteM.mutate()}
        onCancel={() => setConfirmDelete(false)}
      />
    </AdminShell>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-400">{label}</p>
      <p className="font-medium text-ink-900">{value}</p>
    </div>
  );
}
