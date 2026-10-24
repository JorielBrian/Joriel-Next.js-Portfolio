'use client';

import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getContentBlock, getResumeViewUrl } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

import FocusSkills from "@/components/FocusSkills";
import SectionSkeleton from "@/components/SectionSkeleton";

const DEFAULT_TITLES = ["Full-Stack Developer", "Software Engineer", "Data Engineer"];

const Hero = () => {
  const [introduction, setIntroduction] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>(DEFAULT_TITLES);
  const [introductionLoading, setIntroductionLoading] = useState(true);
  const { register, unregister } = useLoading();

  useEffect(() => {
    const introductionKey = "hero-introduction";
    register(introductionKey);
    getContentBlock("INTRODUCTION")
      .then((block) => setIntroduction(block.paragraphs))
      .catch(() => setIntroduction([]))
      .finally(() => {
        unregister(introductionKey);
        setIntroductionLoading(false);
      });

    const titlesKey = "hero-titles";
    register(titlesKey);
    getContentBlock("TITLES")
      .then((block) => {
        if (block.paragraphs.length > 0) setTitles(block.paragraphs);
      })
      .catch(() => {})
      .finally(() => unregister(titlesKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="hero"
      className="relative !my-0 flex min-h-[calc(80svh-5rem)] flex-col justify-center overflow-hidden py-4 sm:min-h-[calc(100svh-8rem)] sm:py-6 lg:min-h-[calc(100svh-8rem)] lg:py-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl sm:h-96 sm:w-96" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl text-center"
      >
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 sm:text-sm">
          <span aria-hidden="true" className="size-2 rounded-full bg-cyan-300" />
          Software Engineer · Full-Stack & Data Systems
        </p>

        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Joriel Brian Sudario
        </h1>

        <div className="mt-4 min-h-12 text-2xl font-semibold tracking-tight text-transparent sm:min-h-14 sm:text-3xl lg:min-h-16 lg:text-4xl">
          <span className="bg-linear-to-r from-cyan-200 via-cyan-400 to-blue-400 bg-clip-text">
            <Typewriter
              words={titles}
              loop
              cursor
              cursorStyle="|"
              cursorBlinking
              cursorColor="#67e8f9"
            />
          </span>
        </div>

        <div className="mx-auto mt-4 max-w-3xl space-y-2 px-4 text-slate-300">
          {introductionLoading ? (
            <SectionSkeleton variant="text" count={2} />
          ) : introduction.length > 0 ? (
            introduction.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 sm:text-lg sm:leading-8">
                {paragraph}
              </p>
            ))
          ) : null}
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row">
          <Link
            href="/#projects"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:w-auto"
          >
            Explore my work
            <ArrowDown aria-hidden="true" size={18} />
          </Link>
          <a
            href={getResumeViewUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:w-auto"
          >
            View résumé
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>

        <div className="mt-7 sm:mt-8">
          <FocusSkills />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
