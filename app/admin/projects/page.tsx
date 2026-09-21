'use client';
import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject, ApiProject } from "@/app/lib/api";

type FormState = {
  id: number | null;
  name: string;
  image: string;
  link: string;
  description: string;
  skills: string; // comma-separated in the form, array in the API
};

const EMPTY: FormState = { id: null, name: "", image: "", link: "", description: "", skills: "" };

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

  const startEdit = (p: ApiProject) => {
    setForm({
      id: p.id,
      name: p.name,
      image: p.image,
      link: p.link || "",
      description: p.description,
      skills: p.skills.join(", "),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name,
      image: form.image,
      link: form.link || undefined,
      description: form.description,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      order: form.id ? projects.find((p) => p.id === form.id)?.order ?? 0 : projects.length,
    };
    try {
      if (form.id) {
        await updateProject(form.id, payload);
      } else {
        await createProject(payload);
      }
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
    try {
      await deleteProject(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Projects</h1>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 border border-white/10 rounded-2xl p-5 max-w-xl">
        <h2 className="font-semibold">{form.id ? "Edit project" : "Add project"}</h2>
        <input
          required placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
        />
        <input
          required placeholder="Image URL" value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
        />
        <input
          placeholder="Link (optional)" value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
        />
        <textarea
          required placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm min-h-20"
        />
        <input
          placeholder="Skills (comma-separated)" value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="rounded-lg bg-white text-black font-semibold px-4 py-2 text-sm disabled:opacity-50">
            {saving ? "Saving..." : form.id ? "Update" : "Add"}
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm(EMPTY)} className="rounded-lg border border-white/20 px-4 py-2 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="opacity-70">Loading...</p>
      ) : (
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-3">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs opacity-60">{p.skills.join(", ")}</p>
              </div>
              <div className="flex gap-2 text-sm">
                <button onClick={() => startEdit(p)} className="underline opacity-80 hover:opacity-100">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-400 underline opacity-80 hover:opacity-100">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
