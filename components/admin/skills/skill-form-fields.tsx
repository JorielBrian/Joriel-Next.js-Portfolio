"use client";
import { Category, Preference, Proficiency } from "@/app/data/enum";
export type SkillForm = { skill: string; image: string; focus: boolean; proficiency: Proficiency; preference: Preference; category: Category; };
export const EMPTY_SKILL_FORM: SkillForm = { skill: "", image: "", focus: false, proficiency: Proficiency.FUNCTIONAL, preference: Preference.SUB_SKILL, category: Category.OTHER };
export const skillInputClass = "w-full rounded-xl border border-blue-700/50 bg-blue-950/40 px-3 py-2.5 text-sm text-white placeholder:text-blue-300/40 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20";
export const skillLabelClass = "mb-1.5 block text-xs font-medium text-blue-200/70";
export const skillPrimaryButtonClass = "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50";
export const skillSecondaryButtonClass = "inline-flex items-center justify-center gap-2 rounded-xl border border-blue-700/50 px-3 py-2 text-sm text-blue-100 transition hover:border-blue-500 hover:bg-blue-900/40 disabled:cursor-not-allowed disabled:opacity-50";
export type SkillPayload = SkillForm & { order: number };
type Props = { form: SkillForm; onChange: (next: SkillForm) => void; };
export const SkillFormFields = ({ form, onChange }: Props) => {
  const update = (field: keyof SkillForm, value: string | boolean) => onChange({ ...form, [field]: value } as SkillForm);
  return <div className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2"><div><label className={skillLabelClass}>Skill name</label><input required maxLength={120} value={form.skill} onChange={(event) => update("skill", event.target.value)} className={skillInputClass} placeholder="e.g. TypeScript" /></div><div><label className={skillLabelClass}>Icon / image URL</label><input required type="url" value={form.image} onChange={(event) => update("image", event.target.value)} className={skillInputClass} placeholder="https://..." /></div></div>
    <div className="grid gap-4 sm:grid-cols-3"><div><label className={skillLabelClass}>Proficiency</label><select value={form.proficiency} onChange={(event) => update("proficiency", event.target.value)} className={skillInputClass}>{Object.values(Proficiency).map((value) => <option key={value} value={value} className="bg-slate-950">{value}</option>)}</select></div><div><label className={skillLabelClass}>Preference group</label><select value={form.preference} onChange={(event) => update("preference", event.target.value)} className={skillInputClass}>{Object.values(Preference).map((value) => <option key={value} value={value} className="bg-slate-950">{value}</option>)}</select></div><div><label className={skillLabelClass}>Category</label><select value={form.category} onChange={(event) => update("category", event.target.value)} className={skillInputClass}>{Object.values(Category).map((value) => <option key={value} value={value} className="bg-slate-950">{value}</option>)}</select></div></div>
    <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-blue-100/80"><input type="checkbox" checked={form.focus} onChange={(event) => update("focus", event.target.checked)} className="size-4 rounded border-blue-700/50 bg-blue-950/40 accent-blue-500" /> Featured / focus skill</label>
  </div>;
};
