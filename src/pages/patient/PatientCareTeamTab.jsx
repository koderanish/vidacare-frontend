import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/States";
import { adminApi, fullName } from "../../api/admin";
import { apiErrorMessage } from "../../api/client";

// Doctor <-> patient links on the shared backend:
//   GET    /api/admin/doctor-links?patientId= (current doctors)
//   GET    /api/admin/doctor-links?doctorId=  (that doctor's patients)
//   POST   /api/admin/doctor-links { doctorId, patientId }
//   DELETE /api/admin/doctor-links { doctorId, patientId }
// Caregiver assignment has no backend endpoint — surfaced as read-only note.
export default function PatientCareTeamTab({ patientId, user }) {
  const qc = useQueryClient();
  const [doctorSearch, setDoctorSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const linksQ = useQuery({
    queryKey: ["admin", "doctor-links", "patient", patientId],
    queryFn: () => adminApi.patientDoctors(patientId),
  });

  const doctorsQ = useQuery({
    queryKey: ["admin", "doctors", "search", submittedSearch],
    queryFn: () =>
      adminApi.listUsers({ search: submittedSearch || undefined, role: "doctor", page: 1, limit: 20 }),
    enabled: submittedSearch !== "",
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "doctor-links", "patient", patientId] });

  const linkM = useMutation({
    mutationFn: ({ doctorId }) => adminApi.linkDoctor(doctorId, Number(patientId)),
    onSuccess: () => {
      toast.success("Doctor linked to patient");
      invalidate();
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const unlinkM = useMutation({
    mutationFn: ({ doctorId }) => adminApi.unlinkDoctor(doctorId, Number(patientId)),
    onSuccess: () => {
      toast.success("Link removed");
      invalidate();
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const doctorOptions = doctorsQ.data?.users || [];
  const linkedIds = new Set((linksQ.data || []).map((d) => d.id));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-1 text-sm font-semibold text-ink-900">Linked doctors</h3>
        <p className="mb-3 text-xs text-ink-500">
          Patient: {user ? fullName(user) : `#${patientId}`}
        </p>
        {linksQ.isLoading && <LoadingState label="Loading linked doctors..." />}
        {linksQ.isError && <ErrorState message={apiErrorMessage(linksQ.error)} onRetry={linksQ.refetch} />}
        {linksQ.data && linksQ.data.length === 0 && <EmptyState title="No doctor linked yet" />}
        {linksQ.data && linksQ.data.length > 0 && (
          <ul className="divide-y divide-ink-900/5">
            {linksQ.data.map((d) => (
              <li key={d.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <p className="font-medium text-ink-900">{d.name}</p>
                  <p className="text-xs text-ink-500">{d.email}{d.mrn ? ` · ${d.mrn}` : ""}</p>
                </div>
                <Button
                  variant="danger"
                  loading={unlinkM.isPending && unlinkM.variables?.doctorId === d.id}
                  onClick={() => unlinkM.mutate({ doctorId: d.id })}
                >
                  Unlink
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h3 className="mb-1 text-sm font-semibold text-ink-900">Link a doctor</h3>
        <p className="mb-3 text-xs text-ink-500">Search doctors, then link.</p>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmittedSearch(doctorSearch);
          }}
        >
          <input
            value={doctorSearch}
            onChange={(e) => setDoctorSearch(e.target.value)}
            placeholder="Search doctors by name or email"
            className="flex-1 rounded-lg border border-ink-900/10 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
          <Button variant="secondary" type="submit">Search</Button>
        </form>

        <div className="mt-3">
          {submittedSearch !== "" && doctorsQ.isLoading && <LoadingState label="Loading doctors..." />}
          {submittedSearch !== "" && doctorsQ.isError && <ErrorState message={apiErrorMessage(doctorsQ.error)} onRetry={doctorsQ.refetch} />}
          {submittedSearch !== "" && doctorsQ.data && doctorOptions.length === 0 && <p className="text-sm text-ink-400">No doctors found.</p>}
          {doctorOptions.length > 0 && (
            <ul className="divide-y divide-ink-900/5">
              {doctorOptions.map((d) => (
                <li key={d.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <p className="font-medium text-ink-900">{fullName(d)}</p>
                    <p className="text-xs text-ink-500">{d.email}{d.mrn ? ` · ${d.mrn}` : ""}</p>
                  </div>
                  {linkedIds.has(d.id) ? (
                    <span className="text-xs text-teal-700">Linked ✓</span>
                  ) : (
                    <Button
                      variant="secondary"
                      loading={linkM.isPending && linkM.variables?.doctorId === d.id}
                      onClick={() => linkM.mutate({ doctorId: d.id })}
                    >
                      Link
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="mb-1 text-sm font-semibold text-ink-900">Caregivers</h3>
        <p className="text-sm text-ink-500">
          Caregiver assignment has no endpoint on the shared backend yet — caregivers are managed
          as users with role <code>caregiver</code> under Users.
        </p>
      </Card>
    </div>
  );
}
