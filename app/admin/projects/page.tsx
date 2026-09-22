'use client';
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { getProjects, createProject, updateProject, deleteProject, ApiProject } from "@/app/lib/api";

type FormState = {
  id: number | null;
  name: string;
  image: string;
  link: string;
  description: string;
  skills: string;
};

const EMPTY: FormState = { id: null, name: "", image: "", link: "", description: "", skills: "" };

const inputCls = "w-full rounded-xl border border-blue-700/50 bg-blue-950/40 px-3 py-2.5 text-sm placeholder:text-blue-300/40 outline-none focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20 transition";
const labelCls = "text-xs text-blue-300/70 mb-1 block";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getProjects().then(setProjects).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const startEdit = (p: ApiProject) => setForm({
    id: p.id, name: p.name, image: p.image, link: p.link || "",
    description: p.description, skills: p.skills.join(", "),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name, image: form.image, link: form.link || undefined,
      description: form.description,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      order: form.id ? projects.find((p) => p.id === form.id)?.order ?? 0 : projects.length,
    };
    try {
      if (form.id) await updateProject(form.id, payload);
      else await createProject(payload);
      setForm(EMPTY);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    try { await deleteProject(id); load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Delete failed"); }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <span className="text-sm text-blue-300/50">{projects.length} total</span>
      </div>

      {error && <p className="text-sm text-red-300 bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-2">{error}</p>}

      <form onSubmit={handleSubmit} className="card mt-0 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          {form.id ? <Pencil size={15} /> : <Plus size={15} />}
          {form.id ? "Edit project" : "Add project"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Link (optional)</label>
            <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Image URL</label>
          <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`${inputCls} min-h-24 resize-y`} />
        </div>

        <div>
          <label className={labelCls}>Skills (comma-separated)</label>
          <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className={inputCls} />
        </div>

        <div className="flex gap-3 pt-1">
          <button type="submit" disabled={saving}
            className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 text-sm transition disabled:opacity-50">
            {saving ? "Saving..." : form.id ? "Update" : "Add project"}
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm(EMPTY)}
              className="flex items-center gap-1 rounded-full border border-blue-700/50 px-4 py-2 text-sm text-blue-200 hover:border-blue-500">
              <X size={14} /> Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-blue-300/60 text-sm">Loading...</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-blue-700/30 bg-blue-950/30 px-5 py-4 hover:border-blue-600/50 transition-colors">
              <div className="min-w-0">
                <p className="font-medium truncate">{p.name}</p>
                <p className="text-xs text-blue-300/50 truncate mt-0.5">{p.skills.join(" · ")}</p>
              </div>
              <div className="flex gap-1.5 shrink-0 ml-4">
                <button onClick={() => startEdit(p)} className="p-2 rounded-lg text-blue-300 hover:bg-blue-800/40 hover:text-white transition-colors" title="Edit">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-red-300/70 hover:bg-red-900/30 hover:text-red-300 transition-colors" title="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
