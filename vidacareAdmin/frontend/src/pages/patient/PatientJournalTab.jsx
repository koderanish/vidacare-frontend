import { useQuery } from "@tanstack/react-query";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/States";
import { journalApi } from "../../api/journal";
import { apiErrorMessage } from "../../api/client";

const MOOD_TONE = { CALM: "teal", GOOD: "green", ANXIOUS: "amber", SAD: "blue", STRESSED: "red", ENERGETIC: "violet" };

export default function PatientJournalTab({ patientId }) {
  const query = useQuery({
    queryKey: ["journal", patientId],
    queryFn: () => journalApi.list(patientId, { limit: 20 }),
  });

  if (query.isLoading) return <LoadingState label="Loading journal entries..." />;
  if (query.isError) return <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />;
  if (!query.data || query.data.items.length === 0) return <EmptyState title="No journal entries in this date range" />;

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="py-2 pr-4 font-medium">Date</th>
              <th className="py-2 pr-4 font-medium">Mood</th>
              <th className="py-2 pr-4 font-medium">Pain</th>
              <th className="py-2 pr-4 font-medium">Symptoms</th>
              <th className="py-2 pr-4 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {query.data.items.map((e) => (
              <tr key={e.id} className="border-b border-ink-900/5 last:border-0">
                <td className="py-3 pr-4 text-ink-700">{new Date(e.entryDate).toLocaleDateString()}</td>
                <td className="py-3 pr-4">
                  <Badge tone={MOOD_TONE[e.mood]}>{e.mood}</Badge>
                </td>
                <td className="py-3 pr-4 text-ink-700">{e.painLevel}/10</td>
                <td className="py-3 pr-4 text-ink-500">{e.symptoms?.join(", ") || "None reported"}</td>
                <td className="py-3 pr-4 text-ink-500">{e.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
