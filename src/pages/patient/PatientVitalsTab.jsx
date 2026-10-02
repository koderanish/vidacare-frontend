import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Card } from "../../components/ui/Card";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/States";
import { vitalsApi } from "../../api/vitals";
import { apiErrorMessage } from "../../api/client";

const CHARTS = [
  { type: "BLOOD_PRESSURE", label: "Blood pressure", color: "#23827c", color2: "#7aa7ff" },
  { type: "HEART_RATE", label: "Heart rate", color: "#2fa39a" },
  { type: "SPO2", label: "SpO2", color: "#4c9be8" },
  { type: "BLOOD_SUGAR", label: "Blood sugar", color: "#d98a3d" },
];

export default function PatientVitalsTab({ patientId }) {
  const query = useQuery({
    queryKey: ["vitals", "trends", patientId],
    queryFn: () => vitalsApi.trends(patientId, { days: 14 }),
  });

  if (query.isLoading) return <LoadingState label="Loading vitals trends..." />;
  if (query.isError) return <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />;
  if (!query.data || query.data.length === 0) return <EmptyState title="No vitals recorded yet" />;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {CHARTS.map((chart) => {
        const points = query.data.filter((p) => p.type === chart.type);
        return (
          <Card key={chart.type}>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">{chart.label} — last 14 days</h3>
            {points.length === 0 ? (
              <EmptyState title="No readings in range" />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={points}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f2" />
                  <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} fontSize={11} stroke="#93a9b0" />
                  <YAxis fontSize={11} stroke="#93a9b0" domain={["auto", "auto"]} />
                  <Tooltip />
                  {chart.type === "BLOOD_PRESSURE" && <Legend wrapperStyle={{ fontSize: 12 }} />}
                  <Line type="monotone" dataKey="valuePrimary" name={chart.type === "BLOOD_PRESSURE" ? "Systolic" : chart.label} stroke={chart.color} strokeWidth={2} dot={false} />
                  {chart.type === "BLOOD_PRESSURE" && (
                    <Line type="monotone" dataKey="valueSecondary" name="Diastolic" stroke={chart.color2} strokeWidth={2} strokeDasharray="4 3" dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        );
      })}
    </div>
  );
}
