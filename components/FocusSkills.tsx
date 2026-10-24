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
    return (
      <div className="mx-auto max-w-2xl px-4">
        <SectionSkeleton variant="chips" count={5} />
      </div>
    );
  }

  const focusSkills = skills.filter((skill) => skill.focus);

  if (focusSkills.length === 0) return null;

  return (
    <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 px-4">
      {focusSkills.map((skill) => (
        <motion.div
          key={skill.skill}
          whileHover={{ y: -4, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_12px_28px_-18px_rgba(14,165,233,0.7)] transition-colors duration-300 hover:border-cyan-400/40 hover:bg-white/5 sm:size-16"
          title={skill.skill}
          aria-label={skill.skill}
        >
          <Image
            width={36}
            height={36}
            unoptimized
            src={skill.image}
            alt={skill.skill}
            title={skill.skill}
            className="size-9 object-contain sm:size-10"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FocusSkills;
