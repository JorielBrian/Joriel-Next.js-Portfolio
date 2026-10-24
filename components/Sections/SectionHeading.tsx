"use client";

import { motion } from "motion/react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="mx-auto mb-10 max-w-3xl px-4 text-center sm:mb-14"
  >
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300 sm:text-sm">
      {eyebrow}
    </p>
    <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    {description && (
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
        {description}
      </p>
    )}
    <div aria-hidden="true" className="mx-auto mt-6 h-1 w-16 rounded-full bg-linear-to-r from-cyan-400 to-blue-500" />
  </motion.div>
);

export default SectionHeading;
