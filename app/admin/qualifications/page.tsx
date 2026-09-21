'use client';
import { useEffect, useState } from "react";
import { getQualifications, createQualification, updateQualification, deleteQualification, ApiQualification } from "@/app/lib/api";

type FormState = {
  id: number | null;
  title: string;
  company: string;
  date: string;
  contract: string;
  description: string; // one bullet per line in the form
  skills: string; // comma-separated
};

const EMPTY: FormState = { id: null, title: "", company: "", date: "", contract: "", description: "", skills: "" };

export default function QualificationsAdmin() {
  const [items, setItems] = useState<ApiQualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getQualifications().then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startEdit = (q: ApiQualification) => {
    setForm({
      id: q.id,
      title: q.title,
      company: q.company,
      date: q.date,
      contract: q.contract,
      description: q.description.join("\n"),
      skills: q.skills.join(", "),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      title: form.title,
      company: form.company,
      date: form.date,
      contract: form.contract,
      description: form.description.split("\n").map((s) => s.trim()).filter(Boolean),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      order: form.id ? items.find((q) => q.id === form.id)?.order ?? 0 : items.length,
    };
    try {
      if (form.id) {
        await updateQualification(form.id, payload);
      } else {
        await createQualification(payload);
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
    if (!confirm("Delete this qualification?")) return;
    try {
      await deleteQualification(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Qualifications</h1>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 border border-white/10 rounded-2xl p-5 max-w-xl">
        <h2 className="font-semibold">{form.id ? "Edit qualification" : "Add qualification"}</h2>
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm" />
        <input required placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm" />
        <input required placeholder="Date (e.g. Jan 2024 - Present)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm" />
        <input required placeholder="Contract type (e.g. Full-time)" value={form.contract} onChange={(e) => setForm({ ...form, contract: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm" />
        <textarea required placeholder="Description (one bullet per line)" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm min-h-24" />
        <input placeholder="Skills (comma-separated)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm" />
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
          {items.map((q) => (
            <div key={q.id} className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-3">
              <div>
                <p className="font-medium">{q.title} — {q.company}</p>
                <p className="text-xs opacity-60">{q.date}</p>
              </div>
              <div className="flex gap-2 text-sm">
                <button onClick={() => startEdit(q)} className="underline opacity-80 hover:opacity-100">Edit</button>
                <button onClick={() => handleDelete(q.id)} className="text-red-400 underline opacity-80 hover:opacity-100">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
