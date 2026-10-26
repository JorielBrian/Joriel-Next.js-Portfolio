'use client';

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

interface AboutCardProps {
  title?: string;
  header?: string;
  image?: string;
  altImage?: string;
  texts: string[];
}

const AboutCard = ({ title, header, image, altImage, texts }: AboutCardProps) => {
  const reduceMotion = useReducedMotion();
  const heading = header ?? title ?? "About me";
  const headingId = title ? `about-${title.toLowerCase().replaceAll(" ", "-")}` : "about-intro-heading";
  const label = title ? "ABOUT / " + title.toUpperCase() : "INTRODUCTION";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
      aria-labelledby={headingId}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-blue-400/20 bg-slate-950 shadow-lg shadow-blue-950/20 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-xl hover:shadow-blue-950/30"
    >
      {image && (
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-slate-900">
          <Image
            src={image}
            alt={altImage || ""}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col px-5 py-6 sm:px-7 sm:py-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
          {label}
        </p>
        <h2 id={headingId} className="mb-5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
        <div className="mb-5 h-px w-full bg-linear-to-r from-cyan-300/60 via-blue-400/20 to-transparent" aria-hidden="true" />
        <div className="space-y-4 text-base leading-7 text-blue-100/80">
          {texts.map((text, index) => <p key={`${heading}-${index}`}>{text}</p>)}
        </div>
      </div>
    </motion.article>
  );
};

export default AboutCard;
