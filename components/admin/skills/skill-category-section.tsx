"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { ApiSkill } from "@/app/lib/api";
import { SkillCard } from "./skill-card";
type Props = { category: string; skills: ApiSkill[]; onEdit: (skill: ApiSkill) => void; onDelete: (skill: ApiSkill) => void; initiallyOpen?: boolean; };
export const SkillCategorySection = ({ category, skills, onEdit, onDelete, initiallyOpen = true }: Props) => {
  const [open, setOpen] = useState(initiallyOpen);
  return <section className="overflow-hidden rounded-2xl border border-blue-800/40 bg-blue-950/15">
    <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-blue-900/20 sm:px-5"><span className="flex min-w-0 items-center gap-3">{open ? <ChevronDown size={17} className="shrink-0 text-blue-300" /> : <ChevronRight size={17} className="shrink-0 text-blue-300" />}<span className="font-semibold text-white">{category}</span></span><span className="rounded-full border border-blue-800/50 bg-blue-950/60 px-2.5 py-1 text-xs text-blue-200/65">{skills.length} {skills.length === 1 ? "skill" : "skills"}</span></button>
    {open && <div className="grid gap-3 border-t border-blue-900/50 p-3 sm:grid-cols-2 sm:p-4">{skills.map((skill) => <SkillCard key={skill.id} skill={skill} onEdit={onEdit} onDelete={onDelete} />)}</div>}
  </section>;
};
