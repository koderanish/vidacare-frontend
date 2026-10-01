import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge, Dot } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { LoadingState, ErrorState } from "../components/ui/States";
import { adminApi } from "../api/admin";
import { apiErrorMessage } from "../api/client";

const STATUS_TONE = { ACTIVE: "green", PENDING: "amber", REJECTED: "red", SUSPENDED: "neutral" };

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [confirmAction, setConfirmAction] = useState(null); // { status, label, danger }

  const query = useQuery({ queryKey: ["admin", "user", id], queryFn: () => adminApi.getUser(id) });

  const statusMutation = useMutation({
    mutationFn: (status) => adminApi.updateUserStatus(id, { status, reason: `Changed via admin dashboard` }),
    onSuccess: () => {
      toast.success("User status updated");
      qc.invalidateQueries({ queryKey: ["admin", "user", id] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      setConfirmAction(null);
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

  const user = query.data;
  const profileLabel = { PATIENT: "patientProfile", DOCTOR: "doctorProfile", CAREGIVER: "caregiverProfile" }[user.role];
  const profile = user[profileLabel];

  return (
    <AdminShell>
      <Topbar title={user.fullName} subtitle={user.email} />
      <main className="flex-1 space-y-4 p-6">
        <button onClick={() => navigate(-1)} className="text-sm text-ink-500 hover:text-ink-700">
          ← Back
        </button>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-lg font-semibold text-teal-700">
                {user.fullName.slice(0, 1)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-ink-900">{user.fullName}</h2>
                <p className="text-sm text-ink-500">{user.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge tone="teal">{user.role}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-sm text-ink-700">
                    <Dot tone={STATUS_TONE[user.status]} /> {user.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {user.role === "PATIENT" && profile && (
                <Link to={`/patients/${profile.id}`}>
                  <Button variant="secondary">View patient record</Button>
                </Link>
              )}
              {user.status === "ACTIVE" && user.role !== "ADMIN" && (
                <Button variant="danger" onClick={() => setConfirmAction({ status: "SUSPENDED", label: "Suspend account", danger: true })}>
                  Suspend account
                </Button>
              )}
              {user.status === "SUSPENDED" && (
                <Button variant="primary" onClick={() => setConfirmAction({ status: "ACTIVE", label: "Reactivate account" })}>
                  Reactivate account
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-900/5 pt-4 text-sm md:grid-cols-3">
            <Field label="Phone" value={user.phone || "—"} />
            <Field label="Email verified" value={user.emailVerifiedAt ? "Yes" : "No"} />
            <Field label="Last login" value={user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Never"} />
            <Field label="Created" value={new Date(user.createdAt).toLocaleDateString()} />
            {user.role === "DOCTOR" && profile && (
              <>
                <Field label="Specialization" value={profile.specialization} />
                <Field label="License number" value={profile.licenseNumber} />
                <Field label="Hospital" value={profile.hospital} />
                <Field label="Years of experience" value={profile.yearsOfExperience} />
              </>
            )}
            {user.role === "CAREGIVER" && profile && (
              <>
                <Field label="Caregiver type" value={profile.caregiverType?.replace("_", " ")} />
                <Field label="Years of experience" value={profile.yearsOfExperience} />
              </>
            )}
            {user.role === "PATIENT" && profile && (
              <>
                <Field label="Patient code" value={profile.patientCode} />
                <Field label="Gender" value={profile.gender} />
              </>
            )}
          </div>
        </Card>

        {user.role === "PATIENT" && profile && (profile.doctorAssignments?.length > 0 || profile.caregiverAssignments?.length > 0) && (
          <Card>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Care team</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {profile.doctorAssignments?.map((a) => (
                <div key={a.id} className="rounded-lg border border-ink-900/5 p-3">
                  <p className="text-xs text-ink-500">Assigned doctor</p>
                  <p className="font-medium text-ink-900">{a.doctor.fullName}</p>
                </div>
              ))}
              {profile.caregiverAssignments?.map((a) => (
                <div key={a.id} className="rounded-lg border border-ink-900/5 p-3">
                  <p className="text-xs text-ink-500">Assigned caregiver</p>
                  <p className="font-medium text-ink-900">{a.caregiver.fullName}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>

      <ConfirmDialog
        open={!!confirmAction}
        title={confirmAction?.label}
        description={`This will change ${user.fullName}'s account status to ${confirmAction?.status}.`}
        confirmLabel={confirmAction?.label}
        danger={confirmAction?.danger}
        loading={statusMutation.isPending}
        onConfirm={() => statusMutation.mutate(confirmAction.status)}
        onCancel={() => setConfirmAction(null)}
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
