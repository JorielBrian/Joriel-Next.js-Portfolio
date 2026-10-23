'use client';
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { LoaderCircle, Plus, X } from "lucide-react";
import { createQualification, deleteQualification, getQualifications, updateQualification, type ApiQualification } from "@/app/lib/api";
import { QualificationCard } from "@/components/admin/qualifications/qualification-card";
import { QualificationFormModal } from "@/components/admin/qualifications/qualification-form-modal";
import { QualificationDeleteDialog } from "@/components/admin/qualifications/qualification-delete-dialog";
import { EMPTY_QUALIFICATION_FORM, qualificationPrimaryButtonClass, toQualificationForm, toQualificationPayload, type QualificationForm } from "@/components/admin/qualifications/qualification-form-fields";
const QualificationsAdmin = () => {
  const [items, setItems] = useState<ApiQualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<ApiQualification | null>(null);
  const [editForm, setEditForm] = useState<QualificationForm>(EMPTY_QUALIFICATION_FORM);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<QualificationForm>(EMPTY_QUALIFICATION_FORM);
  const [toDelete, setToDelete] = useState<ApiQualification | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await getQualifications()); setError(null); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load qualifications."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const openAdd = () => { setError(null); setAddForm(EMPTY_QUALIFICATION_FORM); setAddOpen(true); };
  const openEdit = (item: ApiQualification) => { setError(null); setEditing(item); setEditForm(toQualificationForm(item)); };
  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setError(null);
    try { await createQualification(toQualificationPayload(addForm, items.length)); setAddOpen(false); setAddForm(EMPTY_QUALIFICATION_FORM); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not create the qualification."); }
    finally { setSaving(false); }
  };
  const update = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!editing) return; setSaving(true); setError(null);
    try { await updateQualification(editing.id, toQualificationPayload(editForm, editing.order)); setEditing(null); setEditForm(EMPTY_QUALIFICATION_FORM); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not update the qualification."); }
    finally { setSaving(false); }
  };
  const remove = async () => {
    if (!toDelete) return; setDeleting(true); setError(null);
    try { await deleteQualification(toDelete.id); setToDelete(null); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not delete the qualification."); }
    finally { setDeleting(false); }
  };
  const closeEdit = () => { if (saving) return; setEditing(null); setEditForm(EMPTY_QUALIFICATION_FORM); setError(null); };
  const cancelDelete = () => { setToDelete(null); setError(null); };
  return <div className="mx-auto w-full max-w-6xl space-y-7">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium text-blue-300/70">Portfolio management</p><h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Qualifications</h1><p className="mt-2 text-sm text-blue-100/55">Manage your professional experience and qualifications.</p></div><button type="button" onClick={openAdd} className={qualificationPrimaryButtonClass}><Plus size={17} /> Add qualification</button></header>
    {error && !toDelete && !editing && !addOpen && <div role="alert" className="flex items-start justify-between gap-3 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-200"><p>{error}</p><button type="button" onClick={() => setError(null)} aria-label="Dismiss error" className="rounded-md p-0.5 text-red-200/70 hover:text-white"><X size={16} /></button></div>}
    <div className="flex items-center justify-between border-b border-blue-900/60 pb-3"><h2 className="font-semibold text-white">All qualifications</h2><span className="rounded-full border border-blue-800/50 bg-blue-950/50 px-3 py-1 text-xs text-blue-200/70">{items.length} {items.length === 1 ? "item" : "items"}</span></div>
    {loading ? <div className="flex items-center justify-center gap-2 py-16 text-sm text-blue-200/60"><LoaderCircle size={18} className="animate-spin" /> Loading qualifications…</div> : items.length === 0 ? <div className="rounded-2xl border border-dashed border-blue-800/60 bg-blue-950/20 px-6 py-14 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-blue-800/50 bg-blue-900/30 text-blue-200"><Plus size={22} /></div><h3 className="mt-4 font-semibold text-white">No qualifications yet</h3><p className="mx-auto mt-1 max-w-sm text-sm text-blue-100/55">Add your first qualification or experience entry.</p><button type="button" onClick={openAdd} className={`${qualificationPrimaryButtonClass} mt-5`}><Plus size={16} /> Add qualification</button></div> : <div className="grid gap-4 lg:grid-cols-2">{items.map((item) => <QualificationCard key={item.id} item={item} onEdit={openEdit} onDelete={setToDelete} />)}</div>}
    <QualificationFormModal open={addOpen} mode="add" form={addForm} saving={saving} error={addOpen ? error : null} onFormChange={setAddForm} onClose={() => { if (!saving) { setAddOpen(false); setError(null); } }} onSubmit={create} />
    <QualificationFormModal open={Boolean(editing)} mode="edit" form={editForm} saving={saving} error={editing ? error : null} onFormChange={setEditForm} onClose={closeEdit} onSubmit={update} />
    <QualificationDeleteDialog item={toDelete} deleting={deleting} error={toDelete ? error : null} onCancel={cancelDelete} onConfirm={remove} />
  </div>;
};
export default QualificationsAdmin;
