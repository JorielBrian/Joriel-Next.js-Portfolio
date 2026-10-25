import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Preference, Proficiency } from "../../app/data/enum";
import { ApiSkill } from "@/app/lib/api";

interface SkillCardProps {
  preference: Preference;
  skills: ApiSkill[];
}

const proficiencyLevels: Record<Proficiency, number> = {
  [Proficiency.ADVANCE]: 5,
  [Proficiency.PROFICIENT]: 4,
  [Proficiency.INTERMEDIATE]: 3,
  [Proficiency.FUNCTIONAL]: 2,
  [Proficiency.BEGINNER]: 1,
};

function SkillCard({ preference, skills: SKILLS }: SkillCardProps) {
  const getProficiencyLevel = (proficiency: Proficiency) =>
    proficiencyLevels[proficiency] ?? 0;

  return (
    <div className="relative my-5 flex w-full flex-wrap items-center justify-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.4 }}
        className="pointer-events-none absolute h-full w-full content-center text-center text-5xl font-bold text-white/30 md:text-7xl lg:text-9xl"
        aria-hidden="true"
      >
        {preference}
      </motion.h2>

      {SKILLS &&
        SKILLS.filter((skill) => skill.preference === preference).map((skill) => {
          const level = getProficiencyLevel(skill.proficiency);

          return (
            <span key={skill.skill}>
              <motion.div
                className="group relative justify-center p-3"
                whileHover={{ scale: 1.1 }}
              >
                <motion.img
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  src={skill.image}
                  alt={skill.skill}
                  title={skill.skill}
                  className="icons m-auto"
                />
                <div
                  className="flex justify-center gap-0.5 py-1 text-amber-200"
                  role="img"
                  aria-label={`Proficiency: ${level} out of 5`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={12}
                      className="md:size-3.5 xl:size-4"
                      fill={index < level ? "currentColor" : "none"}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <h5 className="text-center font-bold text-cyan-500 text-[11px] md:text-sm xl:text-lg">
                  {skill.skill}
                </h5>
              </motion.div>
            </span>
          );
        })}
    </div>
  );
}

export default SkillCard;
