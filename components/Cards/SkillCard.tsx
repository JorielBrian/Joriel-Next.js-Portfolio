import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Proficiency } from "@/app/data/enum";
import { ApiSkill } from "@/app/lib/api";

interface SkillCardProps {
  area: string;
  skills: ApiSkill[];
  description: string;
  style: { icon: string; accent: string; glow: string };
  index: number;
}

const proficiencyLevels: Record<Proficiency, number> = {
  [Proficiency.ADVANCE]: 5,
  [Proficiency.PROFICIENT]: 4,
  [Proficiency.INTERMEDIATE]: 3,
  [Proficiency.FUNCTIONAL]: 2,
  [Proficiency.BEGINNER]: 1,
};

const accentClasses: Record<string, string> = {
  violet: "border-violet-400/50 text-violet-300 bg-violet-500/15",
  sky: "border-sky-400/50 text-sky-300 bg-sky-500/15",
  teal: "border-teal-400/50 text-teal-300 bg-teal-500/15",
  amber: "border-amber-400/50 text-amber-300 bg-amber-500/15",
  fuchsia: "border-fuchsia-400/50 text-fuchsia-300 bg-fuchsia-500/15",
  cyan: "border-cyan-400/50 text-cyan-300 bg-cyan-500/15",
  pink: "border-pink-400/50 text-pink-300 bg-pink-500/15",
  emerald: "border-emerald-400/50 text-emerald-300 bg-emerald-500/15",
  slate: "border-slate-400/50 text-slate-300 bg-slate-500/15",
  indigo: "border-indigo-400/50 text-indigo-300 bg-indigo-500/15",
};

function SkillCard({ area, skills, description, style, index }: SkillCardProps) {
  const levelFor = (proficiency: Proficiency) => proficiencyLevels[proficiency] ?? 0;
  const areaSkills = skills.filter((skill) => skill.area === area);
  const accentClass = accentClasses[style.accent] ?? accentClasses.cyan;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2), ease: "easeOut" }}
      className={`group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${style.glow} via-slate-900/80 to-slate-950/90 p-4 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl sm:rounded-3xl sm:p-5 lg:p-6`}
    >
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50 ${accentClass.split(" ")[1]}`} />
      <div className="flex items-start gap-3">
        <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl border text-lg font-bold shadow-inner sm:size-12 sm:text-xl ${accentClass}`} aria-hidden="true">
          {style.icon}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-base font-bold leading-snug text-white sm:text-lg">{area}</h3>
          <p className="mt-1.5 text-xs leading-5 text-blue-100/65 sm:text-sm sm:leading-6">{description}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${area} skills`}>
        {areaSkills.map((skill) => {
          const level = levelFor(skill.proficiency);
          return (
            <li
              key={skill.skill}
              title={`${skill.skill} — ${skill.proficiency}`}
              className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-white/[0.09] bg-slate-800/70 px-2.5 py-1.5 text-xs text-slate-100 transition-colors hover:border-white/20 hover:bg-slate-800 sm:gap-2 sm:py-2 sm:text-sm"
            >
              {skill.image ? (
                <img src={skill.image} alt="" loading="lazy" className="size-3.5 shrink-0 object-contain sm:size-4" />
              ) : null}
              <span className="break-words">{skill.skill}</span>
              <span className="ml-0.5 inline-flex shrink-0 gap-px text-amber-300/90" aria-label={`Proficiency: ${level} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={9} fill={i < level ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden="true" />
                ))}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-[11px] font-medium text-blue-100/45">
        {areaSkills.length} {areaSkills.length === 1 ? "skill" : "skills"}
      </p>
    </motion.article>
  );
}

export default SkillCard;
