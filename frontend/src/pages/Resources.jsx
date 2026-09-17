import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { resourcesApi } from "../api/resources";
import { apiErrorMessage } from "../api/client";

const CATEGORIES = ["HEART_HEALTH", "DIABETES", "MENTAL_WELLNESS", "NUTRITION", "EXERCISE", "MEDICATION", "GENERAL_HEALTH"];
const STATUS_TONE = { PUBLISHED: "green", DRAFT: "neutral", UNPUBLISHED: "amber" };

const emptyForm = { title: "", category: "GENERAL_HEALTH", description: "", content: "", authorName: "VidaCare Education", status: "DRAFT" };

export default function Resources() {
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["resources", { category, q }],
    queryFn: () => resourcesApi.list({ category: category || undefined, q: q || undefined, limit: 20 }),
  });

  const createM = useMutation({
    mutationFn: resourcesApi.create,
    onSuccess: () => {
      toast.success("Resource created");
      setFormOpen(false);
      setForm(emptyForm);
      qc.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const publishM = useMutation({
    mutationFn: ({ id, publish }) => (publish ? resourcesApi.publish(id) : resourcesApi.unpublish(id)),
    onSuccess: () => {
      toast.success("Resource status updated");
      qc.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  return (
    <AdminShell>
      <Topbar
        title="Resources"
        subtitle="Manage educational content for the VidaCare demo workspace."
        actions={<Button onClick={() => setFormOpen(true)}>+ Create resource</Button>}
      />
      <main className="flex-1 space-y-4 p-6">
        <div className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-2 text-xs text-sky-800">
          DEMO CONTENT · Resources are sample educational materials for prototype demonstration.
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search resources"
            className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm">
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.replace("_", " ")}</option>
            ))}
          </select>
        </div>

        {query.isLoading && <LoadingState label="Loading resources..." />}
        {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
        {query.data && query.data.items.length === 0 && <EmptyState title="No resources match these filters" />}

        {query.data && query.data.items.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {query.data.items.map((r) => (
              <Card key={r.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge tone="teal">{r.category.replace("_", " ")}</Badge>
                  <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge>
                </div>
                <h3 className="font-semibold text-ink-900">{r.title}</h3>
                <p className="line-clamp-2 text-sm text-ink-500">{r.description}</p>
                <p className="text-xs text-ink-400">{r.authorName} · {new Date(r.createdAt).toLocaleDateString()}</p>
                <div className="mt-2 flex justify-end">
                  {r.status === "PUBLISHED" ? (
                    <Button variant="outline" loading={publishM.isPending && publishM.variables?.id === r.id} onClick={() => publishM.mutate({ id: r.id, publish: false })}>
                      Unpublish
                    </Button>
                  ) : (
                    <Button loading={publishM.isPending && publishM.variables?.id === r.id} onClick={() => publishM.mutate({ id: r.id, publish: true })}>
                      Publish
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl2 bg-white p-6 shadow-card">
            <h3 className="text-base font-semibold text-ink-900">Create resource</h3>
            <div className="mt-4 space-y-3">
              <Field label="Title">
                <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </Field>
              <Field label="Category">
                <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
                </select>
              </Field>
              <Field label="Description">
                <textarea className="input" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </Field>
              <Field label="Content">
                <textarea className="input" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </Field>
              <Field label="Author">
                <input className="input" value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} />
              </Field>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setFormOpen(false)}>Cancel</Button>
              <Button
                loading={createM.isPending}
                disabled={!form.title || !form.description || !form.content}
                onClick={() => createM.mutate(form)}
              >
                Create resource
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink-700">{label}</span>
      {children}
    </label>
  );
}
