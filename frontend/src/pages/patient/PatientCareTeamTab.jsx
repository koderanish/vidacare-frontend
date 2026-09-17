import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { LoadingState, ErrorState } from "../../components/ui/States";
import { patientsApi, doctorsApi, caregiversApi } from "../../api/patients";
import { adminApi } from "../../api/admin";
import { apiErrorMessage } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function PatientCareTeamTab({ patientId }) {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const qc = useQueryClient();
  const [pickingDoctor, setPickingDoctor] = useState(false);
  const [pickingCaregiver, setPickingCaregiver] = useState(false);

  const query = useQuery({ queryKey: ["care-team", patientId], queryFn: () => patientsApi.careTeam(patientId) });
  const doctorsQ = useQuery({
    queryKey: ["doctors", "active"],
    queryFn: () => doctorsApi.list({ status: "ACTIVE", limit: 50 }),
    enabled: pickingDoctor,
  });
  const caregiversQ = useQuery({
    queryKey: ["caregivers", "active"],
    queryFn: () => caregiversApi.list({ status: "ACTIVE", limit: 50 }),
    enabled: pickingCaregiver,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["care-team", patientId] });
    qc.invalidateQueries({ queryKey: ["patients"] });
  };

  const assignDoctorM = useMutation({
    mutationFn: (doctorId) => adminApi.assignDoctor(patientId, doctorId),
    onSuccess: () => {
      toast.success("Doctor assignment updated");
      setPickingDoctor(false);
      invalidate();
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const assignCaregiverM = useMutation({
    mutationFn: (caregiverId) => adminApi.assignCaregiver(patientId, caregiverId),
    onSuccess: () => {
      toast.success("Caregiver assignment updated");
      setPickingCaregiver(false);
      invalidate();
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  if (query.isLoading) return <LoadingState label="Loading care team..." />;
  if (query.isError) return <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />;

  const { doctor, caregiver } = query.data;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink-900">Assigned doctor</h3>
          {isAdmin && (
            <Button variant="outline" onClick={() => setPickingDoctor((v) => !v)}>
              {doctor ? "Change doctor" : "Assign doctor"}
            </Button>
          )}
        </div>
        {doctor ? (
          <div>
            <p className="font-medium text-ink-900">{doctor.user.fullName}</p>
            <p className="text-sm text-ink-500">{doctor.user.doctorProfile?.specialization}</p>
            <p className="text-sm text-ink-500">{doctor.user.email}</p>
            <p className="mt-1 text-xs text-ink-400">Assigned {new Date(doctor.assignedAt).toLocaleDateString()}</p>
            <Badge tone="green" className="mt-2">Active</Badge>
          </div>
        ) : (
          <p className="text-sm text-ink-400">No doctor assigned</p>
        )}

        {pickingDoctor && (
          <div className="mt-4 rounded-lg border border-ink-900/10 p-3">
            {doctorsQ.isLoading ? (
              <LoadingState label="Loading doctors..." />
            ) : (
              <ul className="divide-y divide-ink-900/5">
                {doctorsQ.data?.items.map((d) => (
                  <li key={d.id} className="flex items-center justify-between py-2 text-sm">
                    <div>
                      <p className="font-medium text-ink-900">{d.fullName}</p>
                      <p className="text-xs text-ink-500">{d.doctorProfile?.specialization}</p>
                    </div>
                    <Button
                      variant="secondary"
                      loading={assignDoctorM.isPending && assignDoctorM.variables === d.id}
                      onClick={() => assignDoctorM.mutate(d.id)}
                    >
                      Select
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink-900">Assigned caregiver</h3>
          {isAdmin && (
            <Button variant="outline" onClick={() => setPickingCaregiver((v) => !v)}>
              {caregiver ? "Change caregiver" : "Assign caregiver"}
            </Button>
          )}
        </div>
        {caregiver ? (
          <div>
            <p className="font-medium text-ink-900">{caregiver.user.fullName}</p>
            <p className="text-sm text-ink-500">{caregiver.user.caregiverProfile?.caregiverType?.replace("_", " ")}</p>
            <p className="text-sm text-ink-500">{caregiver.user.email}</p>
            <p className="mt-1 text-xs text-ink-400">Assigned {new Date(caregiver.assignedAt).toLocaleDateString()}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {Object.entries(caregiver.permissions).map(([k, v]) => (
                <Badge key={k} tone={v ? "teal" : "neutral"}>
                  {k.replace("can", "").replace(/([A-Z])/g, " $1").trim()}: {v ? "On" : "Off"}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink-400">No caregiver assigned</p>
        )}

        {pickingCaregiver && (
          <div className="mt-4 rounded-lg border border-ink-900/10 p-3">
            {caregiversQ.isLoading ? (
              <LoadingState label="Loading caregivers..." />
            ) : (
              <ul className="divide-y divide-ink-900/5">
                {caregiversQ.data?.items.map((c) => (
                  <li key={c.id} className="flex items-center justify-between py-2 text-sm">
                    <div>
                      <p className="font-medium text-ink-900">{c.fullName}</p>
                      <p className="text-xs text-ink-500">{c.caregiverProfile?.caregiverType?.replace("_", " ")}</p>
                    </div>
                    <Button
                      variant="secondary"
                      loading={assignCaregiverM.isPending && assignCaregiverM.variables === c.id}
                      onClick={() => assignCaregiverM.mutate(c.id)}
                    >
                      Select
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
