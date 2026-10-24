'use client';

import ExperienceCard from "@/components/Cards/ExperienceCard";
import SectionSkeleton from "@/components/SectionSkeleton";
import { useEffect, useState } from "react";
import { getQualifications, ApiQualification } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

const Qualifications = () => {
  const [QUALIFICATIONS, setQualifications] = useState<ApiQualification[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, unregister } = useLoading();

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    const key = "page-experiences";
    register(key);
    getQualifications()
      .then(setQualifications)
      .catch(() => setQualifications([]))
      .finally(() => {
        unregister(key);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
        <header className="mb-10 text-center sm:mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Career Path</span>
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">Professional Journey</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            Detailed breakdown of my professional experiences, achievements, and the skills I have developed across full-time roles and contract-based projects.
          </p>
        </header>

        {loading ? (
          <div className="space-y-12">
            <SectionSkeleton variant="cards" count={3} />
            <SectionSkeleton variant="cards" count={3} />
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-20">
            <ExperienceCard title="Full-Time Roles" contract="Full Time" experiences={QUALIFICATIONS} />
            <ExperienceCard title="Contract & Projects" contract="Contractual / Project" experiences={QUALIFICATIONS} />
            <ExperienceCard title="Internships" contract="Internship" experiences={QUALIFICATIONS} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Qualifications;
