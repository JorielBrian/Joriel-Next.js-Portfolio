"use client";
import { Pencil, Star, Trash2 } from "lucide-react";
import type { ApiSkill } from "@/app/lib/api";
type Props = { skill: ApiSkill; onEdit: (skill: ApiSkill) => void; onDelete: (skill: ApiSkill) => void; };
export const SkillCard = ({ skill, onEdit, onDelete }: Props) => <article className="flex min-w-0 items-center gap-3 rounded-xl border border-blue-800/40 bg-blue-950/25 p-3 transition-colors hover:border-blue-700/70 sm:p-4">
  <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-800/50 bg-blue-900/30 p-2">{skill.image ? <img src={skill.image} alt="" loading="lazy" className="size-full object-contain" /> : <span className="text-xs text-blue-200/50">N/A</span>}</div>
  <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h4 className="truncate text-sm font-semibold text-white">{skill.skill}</h4>{skill.focus && <Star size={13} aria-label="Featured skill" className="shrink-0 fill-yellow-400 text-yellow-400" />}</div><p className="mt-1 truncate text-xs text-blue-200/55">{skill.preference} · {skill.proficiency}</p></div>
  <div className="flex shrink-0 gap-1"><button type="button" onClick={() => onEdit(skill)} title="Edit skill" aria-label={`Edit ${skill.skill}`} className="rounded-lg p-2 text-blue-200/70 transition hover:bg-blue-900/50 hover:text-white"><Pencil size={15} /></button><button type="button" onClick={() => onDelete(skill)} title="Delete skill" aria-label={`Delete ${skill.skill}`} className="rounded-lg p-2 text-red-200/70 transition hover:bg-red-950/60 hover:text-red-300"><Trash2 size={15} /></button></div>
</article>;
