'use client';

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { BookOpen, Guitar, Target, UserRound } from "lucide-react";

interface AboutCardProps {
  title?: string;
  header?: string;
  image?: string;
  altImage?: string;
  texts: string[];
  position: "left" | "right";
}

const sectionIcons = {
  "My Story": BookOpen,
  "My Goal": Target,
  "Outside Work": Guitar,
} as const;

const AboutCard = ({ title, header, image, altImage, texts }: AboutCardProps) => {
  const reduceMotion = useReducedMotion();
  const SectionIcon = title && title in sectionIcons ? sectionIcons[title as keyof typeof sectionIcons] : UserRound;
  const heading = header ?? title ?? "About me";
  const headingId = title ? `about-${title.toLowerCase().replaceAll(" ", "-")}` : "about-intro-heading";

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
      aria-labelledby={headingId}
      className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-950/80 shadow-lg shadow-blue-950/20 transition-colors duration-300 hover:border-cyan-300/40"
    >
      {image && (
        <div className="relative h-56 shrink-0 overflow-hidden bg-slate-900 sm:h-64">
          <Image
            src={image}
            alt={altImage || ""}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/35 via-transparent to-slate-950/10" />
        </div>
      )}
      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-7">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
            <SectionIcon aria-hidden="true" className="size-5" />
          </span>
          <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {heading}
          </h2>
        </div>
        <div className="space-y-3 text-base leading-7 text-blue-100/80">
          {texts.map((text, index) => <p key={`${heading}-${index}`}>{text}</p>)}
        </div>
        <div className="mt-6 h-px w-12 bg-linear-to-r from-cyan-300/80 to-transparent" aria-hidden="true" />
      </div>
    </motion.section>
  );
};

export default AboutCard;
