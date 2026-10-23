'use client';
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { LoaderCircle, Plus, Search, X } from "lucide-react";
import { Category } from "@/app/data/enum";
import { createSkill, deleteSkill, getSkills, updateSkill, type ApiSkill } from "@/app/lib/api";
import { SkillCategorySection } from "@/components/admin/skills/skill-category-section";
import { SkillFormModal } from "@/components/admin/skills/skill-form-modal";
import { SkillDeleteDialog } from "@/components/admin/skills/skill-delete-dialog";
import { EMPTY_SKILL_FORM, skillPrimaryButtonClass, type SkillForm } from "@/components/admin/skills/skill-form-fields";
const SkillsAdmin = () => {
  const [items, setItems] = useState<ApiSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<ApiSkill | null>(null);
  const [editForm, setEditForm] = useState<SkillForm>(EMPTY_SKILL_FORM);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<SkillForm>(EMPTY_SKILL_FORM);
  const [toDelete, setToDelete] = useState<ApiSkill | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await getSkills()); setError(null); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load skills."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const grouped = useMemo(() => {
    const filtered = items.filter((item) => [item.skill, item.category, item.preference, item.proficiency].some((value) => value.toLowerCase().includes(search.trim().toLowerCase())));
    return Object.values(Category).map((category) => ({ category, skills: filtered.filter((item) => item.category === category).sort((a, b) => a.order - b.order) })).filter((group) => group.skills.length > 0);
  }, [items, search]);
  const openAdd = () => { setError(null); setAddForm(EMPTY_SKILL_FORM); setAddOpen(true); };
  const openEdit = (skill: ApiSkill) => { setError(null); setEditing(skill); setEditForm({ skill: skill.skill, image: skill.image, focus: skill.focus, proficiency: skill.proficiency, preference: skill.preference, category: skill.category }); };
  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setError(null);
    try { await createSkill({ ...addForm, skill: addForm.skill.trim(), image: addForm.image.trim(), order: items.length }); setAddOpen(false); setAddForm(EMPTY_SKILL_FORM); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not create the skill."); }
    finally { setSaving(false); }
  };
  const update = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!editing) return; setSaving(true); setError(null);
    try { await updateSkill(editing.id, { ...editForm, skill: editForm.skill.trim(), image: editForm.image.trim(), order: editing.order }); setEditing(null); setEditForm(EMPTY_SKILL_FORM); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not update the skill."); }
    finally { setSaving(false); }
  };
  const remove = async () => {
    if (!toDelete) return; setDeleting(true); setError(null);
    try { await deleteSkill(toDelete.id); setToDelete(null); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not delete the skill."); }
    finally { setDeleting(false); }
  };
  const closeEdit = () => { if (saving) return; setEditing(null); setEditForm(EMPTY_SKILL_FORM); setError(null); };
  const cancelDelete = () => { setToDelete(null); setError(null); };
  return <div className="mx-auto w-full max-w-6xl space-y-7">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium text-blue-300/70">Portfolio management</p><h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Skills</h1><p className="mt-2 text-sm text-blue-100/55">Manage your skills by category, proficiency, and focus.</p></div><button type="button" onClick={openAdd} className={skillPrimaryButtonClass}><Plus size={17} /> Add skill</button></header>
    {error && !toDelete && !editing && !addOpen && <div role="alert" className="flex items-start justify-between gap-3 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-200"><p>{error}</p><button type="button" onClick={() => setError(null)} aria-label="Dismiss error" className="rounded-md p-0.5 text-red-200/70 hover:text-white"><X size={16} /></button></div>}
    <div className="flex flex-col gap-3 border-b border-blue-900/60 pb-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold text-white">All skills</h2><p className="mt-1 text-xs text-blue-200/50">{items.length} total {items.filter((item) => item.focus).length} featured</p></div><label className="relative block w-full sm:max-w-xs"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/40" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search skills…" aria-label="Search skills" className="w-full rounded-xl border border-blue-800/50 bg-blue-950/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-blue-200/40 outline-none focus:border-blue-500" /></label></div>
    {loading ? <div className="flex items-center justify-center gap-2 py-16 text-sm text-blue-200/60"><LoaderCircle size={18} className="animate-spin" /> Loading skills…</div> : grouped.length === 0 ? <div className="rounded-2xl border border-dashed border-blue-800/60 bg-blue-950/20 px-6 py-14 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-blue-800/50 bg-blue-900/30 text-blue-200"><Search size={20} /></div><h3 className="mt-4 font-semibold text-white">{search ? "No matching skills" : "No skills yet"}</h3><p className="mx-auto mt-1 max-w-sm text-sm text-blue-100/55">{search ? "Try another search term." : "Add your first skill to start building your portfolio skills section."}</p>{!search && <button type="button" onClick={openAdd} className={`${skillPrimaryButtonClass} mt-5`}><Plus size={16} /> Add your first skill</button>}</div> : <div className="flex flex-col gap-3">{grouped.map((group) => <SkillCategorySection key={group.category} category={group.category} skills={group.skills} onEdit={openEdit} onDelete={setToDelete} />)}</div>}
    <SkillFormModal open={addOpen} mode="add" form={addForm} saving={saving} error={addOpen ? error : null} onFormChange={setAddForm} onClose={() => { if (!saving) { setAddOpen(false); setError(null); } }} onSubmit={create} />
    <SkillFormModal open={Boolean(editing)} mode="edit" form={editForm} saving={saving} error={editing ? error : null} onFormChange={setEditForm} onClose={closeEdit} onSubmit={update} />
    <SkillDeleteDialog skill={toDelete} deleting={deleting} error={toDelete ? error : null} onCancel={cancelDelete} onConfirm={remove} />
  </div>;
};
export default SkillsAdmin;
