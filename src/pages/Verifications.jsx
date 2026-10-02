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

export default function Verifications() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "verifications"],
    queryFn: adminApi.listVerifications,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "verifications"] });
    qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    qc.invalidateQueries({ queryKey: ["admin", "users"] });
  };

  const approveM = useMutation({
    mutationFn: (id) => adminApi.setDoctorApproval(id, true),
    onSuccess: () => {
      toast.success("Doctor approved");
      invalidate();
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const unapproveM = useMutation({
    mutationFn: (id) => adminApi.setDoctorApproval(id, false),
    onSuccess: () => {
      toast.success("Doctor approval removed");
      invalidate();
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const pending = query.data?.pending || [];

  return (
    <AdminShell>
      <Topbar title="Verifications" subtitle="Doctors awaiting approval. Approving here also marks the doctor role as verified." />
      <main className="flex-1 space-y-4 p-6">
        <Card>
          {query.isLoading && <LoadingState label="Loading verification requests..." />}
          {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
          {query.data && pending.length === 0 && (
            <EmptyState title="No pending doctor approvals — all clear" />
          )}
          {pending.length > 0 && (
            <ul className="divide-y divide-ink-900/5">
              {pending.map((v) => (
                <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink-900">{v.name}</p>
                      <Badge tone="blue">doctor</Badge>
                    </div>
                    <p className="text-sm text-ink-500">{v.email}</p>
                    <p className="mt-1 text-xs text-ink-400">
                      Applied {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      loading={unapproveM.isPending && unapproveM.variables === v.id}
                      onClick={() => unapproveM.mutate(v.id)}
                    >
                      Keep pending
                    </Button>
                    <Button
                      loading={approveM.isPending && approveM.variables === v.id}
                      onClick={() => approveM.mutate(v.id)}
                    >
                      Approve
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </AdminShell>
  );
}
