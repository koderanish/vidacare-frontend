import { useQuery } from "@tanstack/react-query";
import { Card } from "../../components/ui/Card";
import { LoadingState, ErrorState } from "../../components/ui/States";
import { vitalsApi } from "../../api/vitals";
import { apiErrorMessage } from "../../api/client";

const LABELS = {
  BLOOD_PRESSURE: "Blood Pressure",
  HEART_RATE: "Heart Rate",
  SPO2: "SpO2",
  BLOOD_SUGAR: "Blood Sugar",
  WEIGHT: "Weight",
};

export default function PatientOverviewTab({ patientId }) {
  const query = useQuery({ queryKey: ["vitals", "latest", patientId], queryFn: () => vitalsApi.latest(patientId) });

  if (query.isLoading) return <LoadingState label="Loading latest vitals..." />;
  if (query.isError) return <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />;

  const latest = query.data;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {Object.entries(LABELS).map(([type, label]) => {
        const v = latest[type];
        return (
          <Card key={type}>
            <p className="text-xs text-ink-500">{label}</p>
            {v ? (
              <>
                <p className="mt-1 text-xl font-semibold text-ink-900">
                  {v.valuePrimary}
                  {v.valueSecondary ? `/${v.valueSecondary}` : ""}{" "}
                  <span className="text-sm font-normal text-ink-500">{v.unit}</span>
                </p>
                <p className="mt-1 text-xs text-ink-400">{new Date(v.recordedAt).toLocaleString()}</p>
                <p className="text-xs text-ink-400">{v.source === "DEMO_DEVICE" ? "Demo device data" : "Manual entry"}</p>
              </>
            ) : (
              <p className="mt-1 text-sm text-ink-400">No reading</p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
