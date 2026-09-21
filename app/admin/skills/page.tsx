'use client';
import { useEffect, useState } from "react";
import { getSkills, createSkill, updateSkill, deleteSkill, ApiSkill } from "@/app/lib/api";
import { Proficiency, Preference, Category } from "@/app/data/enum";

type FormState = {
  id: number | null;
  skill: string;
  image: string;
  focus: boolean;
  proficiency: Proficiency;
  preference: Preference;
  category: Category;
};

const EMPTY: FormState = {
  id: null, skill: "", image: "", focus: false,
  proficiency: Proficiency.FUNCTIONAL, preference: Preference.SUB_SKILL, category: Category.OTHER,
};

export default function SkillsAdmin() {
  const [items, setItems] = useState<ApiSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getSkills().then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startEdit = (s: ApiSkill) => {
    setForm({
      id: s.id, skill: s.skill, image: s.image, focus: s.focus,
      proficiency: s.proficiency, preference: s.preference, category: s.category,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      skill: form.skill,
      image: form.image,
      focus: form.focus,
      proficiency: form.proficiency,
      preference: form.preference,
      category: form.category,
      order: form.id ? items.find((s) => s.id === form.id)?.order ?? 0 : items.length,
    };
    try {
      if (form.id) {
        await updateSkill(form.id, payload);
      } else {
        await createSkill(payload);
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
    if (!confirm("Delete this skill?")) return;
    try {
      await deleteSkill(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const selectClass = "w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm";

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Skills</h1>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 border border-white/10 rounded-2xl p-5 max-w-xl">
        <h2 className="font-semibold">{form.id ? "Edit skill" : "Add skill"}</h2>
        <input required placeholder="Skill name" value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value })}
          className={selectClass} />
        <input required placeholder="Icon/image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
          className={selectClass} />

        <select value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: e.target.value as Proficiency })} className={selectClass}>
          {Object.values(Proficiency).map((v) => <option key={v} value={v}>{v}</option>)}
        </select>

        <select value={form.preference} onChange={(e) => setForm({ ...form, preference: e.target.value as Preference })} className={selectClass}>
          {Object.values(Preference).map((v) => <option key={v} value={v}>{v}</option>)}
        </select>

        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className={selectClass}>
          {Object.values(Category).map((v) => <option key={v} value={v}>{v}</option>)}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.checked })} />
          Featured / focus skill
        </label>

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
          {items.map((s) => (
            <div key={s.id} className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-3">
              <div>
                <p className="font-medium">{s.skill}{s.focus ? " ★" : ""}</p>
                <p className="text-xs opacity-60">{s.preference} • {s.category} • {s.proficiency}</p>
              </div>
              <div className="flex gap-2 text-sm">
                <button onClick={() => startEdit(s)} className="underline opacity-80 hover:opacity-100">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="text-red-400 underline opacity-80 hover:opacity-100">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
