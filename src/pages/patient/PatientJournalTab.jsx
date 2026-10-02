import { useQuery } from "@tanstack/react-query";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/States";
import { journalApi } from "../../api/journal";
import { apiErrorMessage } from "../../api/client";

export default function PatientJournalTab({ patientId }) {
  const query = useQuery({
    queryKey: ["journal", patientId],
    queryFn: () => journalApi.list(patientId),
  });

  if (query.isLoading) return <LoadingState label="Loading journal entries..." />;
  if (query.isError) return <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />;
  if (!query.data || query.data.items.length === 0) return <EmptyState title="No journal entries yet" />;

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-900/5 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="py-2 pr-4 font-medium">Date</th>
              <th className="py-2 pr-4 font-medium">Mood</th>
              <th className="py-2 pr-4 font-medium">Pain</th>
              <th className="py-2 pr-4 font-medium">Entry</th>
            </tr>
          </thead>
          <tbody>
            {query.data.items.map((e) => (
              <tr key={e.id} className="border-b border-ink-900/5 last:border-0">
                <td className="py-3 pr-4 text-ink-700">{e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "—"}</td>
                <td className="py-3 pr-4">
                  <Badge tone="teal">{e.mood}</Badge>
                </td>
                <td className="py-3 pr-4 text-ink-700">{e.painLevel ?? "—"}</td>
                <td className="py-3 pr-4 text-ink-500">{e.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
