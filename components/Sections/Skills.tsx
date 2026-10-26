'use client';

import SkillCard from "@/components/Cards/SkillCard";
import { motion } from "motion/react";
import { Area, Preference } from "@/app/data/enum";
import { useEffect, useState } from "react";
import { getSkills, ApiSkill } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

const areaDescriptions: Record<string, string> = {
  [Area.PROGRAMMING_LANGUAGE]: "Languages I use to build applications, automate tasks, and work with data.",
  [Area.FRONTEND_DEVELOPMENT]: "Libraries and tools for responsive, accessible user experiences.",
  [Area.BACKEND_DEVELOPMENT]: "Frameworks and runtimes for APIs, server logic, and application services.",
  [Area.DATABASE_STORAGE]: "Databases and storage technologies for reliable data persistence.",
  [Area.DATA_ENGINEERING]: "Tools for data pipelines, transformation, and analytical workflows.",
  [Area.DEVOPS]: "Containerization, delivery pipelines, and application deployment.",
  [Area.DEVELOPMENT_TOOLS]: "Tools that support coding, collaboration, and version control.",
  [Area.UI_UX_DESIGN]: "Design tools and UI systems for clear, consistent interfaces.",
  [Area.HARDWARE_ELECTRONICS]: "Computer hardware, electronics, assembly, and troubleshooting skills.",
  [Area.OTHER]: "Additional technologies and tools I have worked with.",
  [Area.FUNDAMENTALS]: "Core concepts and foundational tools that support my development workflow.",
};

const areaStyles: Record<string, { icon: string; accent: string; glow: string }> = {
  [Area.PROGRAMMING_LANGUAGE]: { icon: "</>", accent: "violet", glow: "from-violet-500/15" },
  [Area.FRONTEND_DEVELOPMENT]: { icon: "◫", accent: "sky", glow: "from-sky-500/15" },
  [Area.BACKEND_DEVELOPMENT]: { icon: "⌘", accent: "teal", glow: "from-teal-500/15" },
  [Area.DATABASE_STORAGE]: { icon: "▤", accent: "amber", glow: "from-amber-500/15" },
  [Area.DATA_ENGINEERING]: { icon: "⌁", accent: "fuchsia", glow: "from-fuchsia-500/15" },
  [Area.DEVOPS]: { icon: "☁", accent: "cyan", glow: "from-cyan-500/15" },
  [Area.DEVELOPMENT_TOOLS]: { icon: "⚒", accent: "pink", glow: "from-pink-500/15" },
  [Area.UI_UX_DESIGN]: { icon: "◉", accent: "emerald", glow: "from-emerald-500/15" },
  [Area.HARDWARE_ELECTRONICS]: { icon: "⌁", accent: "amber", glow: "from-amber-500/15" },
  [Area.OTHER]: { icon: "＋", accent: "slate", glow: "from-slate-500/15" },
  [Area.FUNDAMENTALS]: { icon: "◇", accent: "indigo", glow: "from-indigo-500/15" },
};

const Skills = () => {
  const [skills, setSkills] = useState<ApiSkill[]>([]);
  const { register, unregister } = useLoading();

  useEffect(() => {
    const key = "section-skills";
    register(key);
    getSkills()
      .then(setSkills)
      .catch(() => setSkills([]))
      .finally(() => unregister(key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleSkills = skills.filter((skill) => skill.preference !== Preference.OTHER);
  const orderedAreas = [
    ...Object.values(Area).filter((area) => area !== Area.FUNDAMENTALS),
    Area.FUNDAMENTALS,
  ];
  const populatedAreas = orderedAreas.filter((area) =>
    visibleSkills.some((skill) => skill.area === area)
  );

  return (
    <section className="mx-auto my-8 w-full max-w-7xl px-0 sm:my-12 sm:px-2">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300 sm:text-sm">
          My skills
        </p>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Technologies &amp; Tools
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100/70 sm:text-base sm:leading-7">
          The languages, frameworks, and tools I use to build, develop, and deliver software.
        </p>
      </motion.div>

      {populatedAreas.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {populatedAreas.map((area, index) => (
            <SkillCard
              key={area}
              area={area}
              skills={visibleSkills}
              description={areaDescriptions[area] ?? "Technologies and tools I use in my work."}
              style={areaStyles[area] ?? areaStyles[Area.OTHER]}
              index={index}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-sm text-blue-100/60">
          Skills will appear here once they are available.
        </p>
      )}

      <div className="mt-8 flex items-center justify-center gap-4 pt-2 sm:mt-10">
        <span className="h-px w-10 bg-blue-300/20 sm:w-16" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/50 sm:text-xs">
          Build <span className="px-1 text-cyan-300">/</span> Learn <span className="px-1 text-violet-300">/</span> Improve
        </p>
        <span className="h-px w-10 bg-blue-300/20 sm:w-16" />
      </div>
    </section>
  );
};

export default Skills;
