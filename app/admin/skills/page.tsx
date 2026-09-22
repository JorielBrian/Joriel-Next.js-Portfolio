'use client';
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Star } from "lucide-react";
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

const inputCls = "w-full rounded-xl border border-blue-700/50 bg-blue-950/40 px-3 py-2.5 text-sm placeholder:text-blue-300/40 outline-none focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20 transition";
const labelCls = "text-xs text-blue-300/70 mb-1 block";

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

  const startEdit = (s: ApiSkill) => setForm({
    id: s.id, skill: s.skill, image: s.image, focus: s.focus,
    proficiency: s.proficiency, preference: s.preference, category: s.category,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      skill: form.skill, image: form.image, focus: form.focus,
      proficiency: form.proficiency, preference: form.preference, category: form.category,
      order: form.id ? items.find((s) => s.id === form.id)?.order ?? 0 : items.length,
    };
    try {
      if (form.id) await updateSkill(form.id, payload);
      else await createSkill(payload);
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
    try { await deleteSkill(id); load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Delete failed"); }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skills</h1>
        <span className="text-sm text-blue-300/50">{items.length} total</span>
      </div>

      {error && <p className="text-sm text-red-300 bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-2">{error}</p>}

      <form onSubmit={handleSubmit} className="card mt-0 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          {form.id ? <Pencil size={15} /> : <Plus size={15} />}
          {form.id ? "Edit skill" : "Add skill"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Skill name</label>
            <input required value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Icon/image URL</label>
            <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Proficiency</label>
            <select value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: e.target.value as Proficiency })} className={inputCls}>
              {Object.values(Proficiency).map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Preference group</label>
            <select value={form.preference} onChange={(e) => setForm({ ...form, preference: e.target.value as Preference })} className={inputCls}>
              {Object.values(Preference).map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className={inputCls}>
              {Object.values(Category).map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-blue-200 cursor-pointer w-fit">
          <input type="checkbox" checked={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.checked })}
            className="rounded border-blue-700/50 bg-blue-950/40 accent-blue-500" />
          Featured / focus skill
        </label>

        <div className="flex gap-3 pt-1">
          <button type="submit" disabled={saving}
            className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 text-sm transition disabled:opacity-50">
            {saving ? "Saving..." : form.id ? "Update" : "Add skill"}
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
          {items.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-blue-700/30 bg-blue-950/30 px-5 py-4 hover:border-blue-600/50 transition-colors">
              <div className="min-w-0 flex items-center gap-2">
                <p className="font-medium truncate">{s.skill}</p>
                {s.focus && <Star size={13} className="text-yellow-400 fill-yellow-400 shrink-0" />}
                <span className="text-xs text-blue-300/50 truncate">— {s.preference} · {s.category} · {s.proficiency}</span>
              </div>
              <div className="flex gap-1.5 shrink-0 ml-4">
                <button onClick={() => startEdit(s)} className="p-2 rounded-lg text-blue-300 hover:bg-blue-800/40 hover:text-white transition-colors" title="Edit">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg text-red-300/70 hover:bg-red-900/30 hover:text-red-300 transition-colors" title="Delete">
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
