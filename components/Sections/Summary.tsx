'use client';

import Link from "next/link";
import SummaryCard from "@/components/Cards/SummaryCard";
import SummarySkillsCard from "@/components/Cards/SummarySkillsCard";
import SectionHeading from "@/components/Sections/SectionHeading";

const Summary = () => (
  <section id="about" className="py-12 sm:py-16 lg:py-20">
    <SectionHeading
      eyebrow="A little about me"
      title="Building useful things with code"
      description="A snapshot of my background, the technologies I work with, and the direction I’m growing as an engineer."
    />
    <div className="grid grid-cols-1 items-center gap-6 rounded-3xl border border-white/10 bg-slate-950/30 p-4 sm:gap-8 sm:p-6 lg:grid-cols-2 lg:p-8">
      <SummaryCard />
      <SummarySkillsCard />
      <div className="flex justify-center lg:col-span-2">
        <Link
          href="/about"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-300/40 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        >
          More about me <span aria-hidden="true" className="ml-2">↗</span>
        </Link>
      </div>
    </div>
  </section>
);

export default Summary;
