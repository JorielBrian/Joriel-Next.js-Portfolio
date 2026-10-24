'use client';
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSkills, ApiSkill } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";
import SectionSkeleton from "@/components/SectionSkeleton";

const FocusSkills = () => {
  const [skills, setSkills] = useState<ApiSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, unregister } = useLoading();

  useEffect(() => {
    const key = "focus-skills";
    register(key);
    getSkills()
      .then(setSkills)
      .catch(() => setSkills([]))
      .finally(() => {
        unregister(key);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="mt-4"><SectionSkeleton variant="chips" count={4} /></div>;
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      {skills.filter((skill) => skill.focus).map((skill) => (
        <motion.div
          key={skill.skill}
          whileHover={{ y: -4, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="group flex w-fit flex-col items-center gap-2 overflow-hidden rounded-3xl border border-white/10 text-center shadow-[0_20px_45px_-26px_rgba(14,165,233,0.7)] transition-all duration-300 hover:border-cyan-400/40"
          title={skill.skill}
          aria-label={skill.skill}
        >
          <Image
            width={28}
            height={28}
            unoptimized
            src={skill.image}
            alt={skill.skill}
            title={skill.skill}
            className="size-10 object-contain lg:size-12 xl:size-15"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FocusSkills;
