"use client";
import type { FormEvent } from "react";
import { LoaderCircle, Pencil, Plus, X } from "lucide-react";
import { SkillFormFields, skillPrimaryButtonClass, skillSecondaryButtonClass, type SkillForm } from "./skill-form-fields";
type Props = { open: boolean; mode: "add" | "edit"; form: SkillForm; saving: boolean; error: string | null; onFormChange: (next: SkillForm) => void; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; };
export const SkillFormModal = ({ open, mode, form, saving, error, onFormChange, onClose, onSubmit }: Props) => {
  if (!open) return null;
  const editing = mode === "edit", title = editing ? "Edit skill" : "Add skill";
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="skill-form-title" className="my-auto w-full max-w-2xl rounded-2xl border border-blue-800/60 bg-slate-950 p-5 shadow-2xl shadow-black/40 sm:p-7">
    <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-wider text-blue-300/65">Skill details</p><h2 id="skill-form-title" className="mt-1 text-xl font-bold text-white">{title}</h2><p className="mt-1 text-sm text-blue-100/55">{editing ? "Update the details for this skill." : "Add a skill to your portfolio."}</p></div><button type="button" onClick={onClose} disabled={saving} aria-label={`Close ${title.toLowerCase()} dialog`} className="rounded-lg p-2 text-blue-200/70 transition hover:bg-blue-900/50 hover:text-white disabled:opacity-50"><X size={18} /></button></div>
    {error && <p role="alert" className="mb-4 rounded-xl border border-red-800/50 bg-red-950/30 px-3 py-2 text-sm text-red-200">{error}</p>}
    <form onSubmit={onSubmit} className="space-y-5"><SkillFormFields form={form} onChange={onFormChange} /><div className="flex flex-col-reverse gap-2 border-t border-blue-900/60 pt-5 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} disabled={saving} className={skillSecondaryButtonClass}>Cancel</button><button type="submit" disabled={saving} className={skillPrimaryButtonClass}>{saving ? <LoaderCircle size={16} className="animate-spin" /> : editing ? <Pencil size={16} /> : <Plus size={16} />}{saving ? (editing ? "Saving changes…" : "Adding skill…") : (editing ? "Save changes" : "Add skill")}</button></div></form>
  </section></div>;
};
