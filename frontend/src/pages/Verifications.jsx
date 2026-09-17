import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { adminApi } from "../api/admin";
import { apiErrorMessage } from "../api/client";

const TABS = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function Verifications() {
  const [status, setStatus] = useState("PENDING");
  const [rejectTarget, setRejectTarget] = useState(null);
  const [reason, setReason] = useState("");
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "verifications", status],
    queryFn: () => adminApi.listVerifications({ status }),
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "verifications"] });
    qc.invalidateQueries({ queryKey: ["admin", "stats"] });
  };

  const approveMutation = useMutation({
    mutationFn: (id) => adminApi.approveVerification(id, {}),
    onSuccess: () => {
      toast.success("Verification approved");
      invalidate();
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }) => adminApi.rejectVerification(id, { reason }),
    onSuccess: () => {
      toast.success("Verification rejected");
      setRejectTarget(null);
      setReason("");
      invalidate();
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  return (
    <AdminShell>
      <Topbar title="Verifications" subtitle="Review doctor and caregiver applications. This is an admin review workflow, not government or medical-board license verification." />
      <main className="flex-1 space-y-4 p-6">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setStatus(t.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                status === t.value ? "bg-teal-600 text-white" : "bg-white text-ink-700 border border-ink-900/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Card>
          {query.isLoading && <LoadingState label="Loading verification requests..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {query.data && query.data.items.length === 0 && (
            <EmptyState title={`No ${status.toLowerCase()} verification requests`} />
          )}
          {query.data && query.data.items.length > 0 && (
            <ul className="divide-y divide-ink-900/5">
              {query.data.items.map((v) => (
                <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink-900">{v.user.fullName}</p>
                      <Badge tone={v.role === "DOCTOR" ? "blue" : "violet"}>{v.role}</Badge>
                    </div>
                    <p className="text-sm text-ink-500">{v.user.email}</p>
                    <p className="mt-1 text-xs text-ink-400">
                      {v.role === "DOCTOR" && v.user.doctorProfile
                        ? `${v.user.doctorProfile.specialization} · ${v.user.doctorProfile.licenseNumber} · ${v.user.doctorProfile.hospital}`
                        : v.role === "CAREGIVER" && v.user.caregiverProfile
                        ? `${v.user.caregiverProfile.caregiverType?.replace("_", " ")}`
                        : null}
                    </p>
                    {v.decisionReason && (
                      <p className="mt-1 text-xs italic text-ink-400">Reason: {v.decisionReason}</p>
                    )}
                  </div>
                  {status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setRejectTarget(v)}
                      >
                        Reject
                      </Button>
                      <Button
                        loading={approveMutation.isPending && approveMutation.variables === v.id}
                        onClick={() => approveMutation.mutate(v.id)}
                      >
                        Approve
                      </Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>

      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
          <div className="w-full max-w-sm rounded-xl2 bg-white p-6 shadow-card">
            <h3 className="text-base font-semibold text-ink-900">Reject {rejectTarget.user.fullName}?</h3>
            <p className="mt-1 text-sm text-ink-500">Provide a reason. This will be shown to the applicant.</p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="mt-3 w-full rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="e.g. License number could not be confirmed"
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => { setRejectTarget(null); setReason(""); }}>
                Cancel
              </Button>
              <Button
                variant="dangerSolid"
                disabled={reason.trim().length < 3}
                loading={rejectMutation.isPending}
                onClick={() => rejectMutation.mutate({ id: rejectTarget.id, reason })}
              >
                Reject application
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
