import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminShell } from "../components/layout/AdminShell";
import { Topbar } from "../components/layout/Topbar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { LoadingState, ErrorState, EmptyState } from "../components/ui/States";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { adminApi } from "../api/admin";
import { apiErrorMessage } from "../api/client";

const CATEGORIES = ["general", "heart", "diabetes", "mental", "nutrition", "exercise", "medication"];

const emptyForm = { title: "", category: "general", body: "", published: false };

export default function Resources() {
  const [category, setCategory] = useState("all");
  const [q, setQ] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "resources", category, q],
    queryFn: () => adminApi.listResources({ category, q: q || undefined, limit: 100 }),
  });

  const createM = useMutation({
    mutationFn: (body) => adminApi.createResource(body),
    onSuccess: () => {
      toast.success("Resource created");
      closeForm();
      qc.invalidateQueries({ queryKey: ["admin", "resources"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const updateM = useMutation({
    mutationFn: ({ id, body }) => adminApi.updateResource(id, body),
    onSuccess: () => {
      toast.success("Resource updated");
      closeForm();
      qc.invalidateQueries({ queryKey: ["admin", "resources"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  const deleteM = useMutation({
    mutationFn: (id) => adminApi.deleteResource(id),
    onSuccess: () => {
      toast.success("Resource deleted");
      setDeleteTarget(null);
      qc.invalidateQueries({ queryKey: ["admin", "resources"] });
    },
    onError: (err) => toast.error(apiErrorMessage(err)),
  });

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function openEdit(r) {
    setEditingId(r.id);
    setForm({ title: r.title, category: r.category, body: r.content || r.description || "", published: !!r.isPublished });
    setFormOpen(true);
  }

  const items = query.data?.resources || [];

  return (
    <AdminShell>
      <Topbar
        title="Resources"
        subtitle="Educational content served to the mobile app."
        actions={<Button onClick={() => setFormOpen(true)}>+ Create resource</Button>}
      />
      <main className="flex-1 space-y-4 p-6">
        <div className="flex flex-wrap gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search resources"
            className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-ink-900/10 px-3 py-2 text-sm">
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {query.isLoading && <LoadingState label="Loading resources..." />}
        {query.isError && <ErrorState message={apiErrorMessage(query.error)} onRetry={query.refetch} />}
        {query.data && items.length === 0 && <EmptyState title="No resources match these filters" />}

        {items.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((r) => (
              <Card key={r.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge tone="teal">{r.category}</Badge>
                  <Badge tone={r.isPublished ? "green" : "neutral"}>{r.isPublished ? "PUBLISHED" : "DRAFT"}</Badge>
                </div>
                <h3 className="font-semibold text-ink-900">{r.title}</h3>
                <p className="line-clamp-2 text-sm text-ink-500">{r.description || r.content}</p>
                <p className="text-xs text-ink-400">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}</p>
                <div className="mt-2 flex flex-wrap justify-end gap-2">
                  <Button variant="secondary" onClick={() => openEdit(r)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => setDeleteTarget(r)}>
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateM.mutate({ id: r.id, body: { published: !r.isPublished } })}
                  >
                    {r.isPublished ? "Unpublish" : "Publish"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl2 bg-white p-6 shadow-card">
            <h3 className="text-base font-semibold text-ink-900">{editingId ? "Edit resource" : "Create resource"}</h3>
            <div className="mt-4 space-y-3">
              <Field label="Title">
                <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </Field>
              <Field label="Category">
                <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Body">
                <textarea className="input" rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
              </Field>
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Published
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" onClick={closeForm}>Cancel</Button>
              <Button
                loading={editingId ? updateM.isPending : createM.isPending}
                disabled={!form.title.trim() || !form.body.trim()}
                onClick={() =>
                  editingId ? updateM.mutate({ id: editingId, body: form }) : createM.mutate(form)
                }
              >
                {editingId ? "Save changes" : "Create resource"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete resource?"
        description={deleteTarget ? `"${deleteTarget.title}" will be permanently removed. This cannot be undone.` : ""}
        confirmLabel="Delete"
        danger
        loading={deleteM.isPending}
        onConfirm={() => deleteM.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
      />
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
