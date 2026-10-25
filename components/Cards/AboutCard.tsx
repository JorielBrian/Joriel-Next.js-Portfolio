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

const AboutCard = ({
  title,
  header,
  image,
  altImage,
  texts,
  position,
}: AboutCardProps) => {
  const reduceMotion = useReducedMotion();
  const SectionIcon =
    title && title in sectionIcons
      ? sectionIcons[title as keyof typeof sectionIcons]
      : UserRound;
  const isImageFirst = position === "left";

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
      aria-labelledby={title ? `about-${title.toLowerCase().replaceAll(" ", "-")}` : "about-intro-heading"}
      className="my-6 scroll-mt-24 overflow-hidden rounded-3xl border border-blue-700/70 bg-gradient-to-br from-blue-950/90 via-blue-950/75 to-slate-950/90 p-5 shadow-xl shadow-blue-950/30 sm:p-7 lg:my-8 lg:p-9"
    >
      <div
        className={`grid items-center gap-7 md:gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] ${isImageFirst ? "" : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)"}`}
      >
        {image && (
          <div className={`relative mx-auto w-full max-w-xs ${isImageFirst ? "lg:order-first" : "lg:order-last"}`}>
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/15 blur-xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-900/50 shadow-2xl">
              <Image
                src={image}
                alt={altImage || ""}
                width={720}
                height={900}
                sizes="(max-width: 768px) 80vw, 320px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="min-w-0">
          {title && (
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              <SectionIcon aria-hidden="true" className="size-4 shrink-0" />
              <span id={`about-${title.toLowerCase().replaceAll(" ", "-")}`}>{title}</span>
            </div>
          )}

          {header && (
            <h1
              id="about-intro-heading"
              className="mb-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {header}
            </h1>
          )}

          <div className="space-y-4 text-blue-100/90">
            {texts.map((text, index) => (
              <p key={`${title ?? "intro"}-${index}`} className="text-base leading-8 sm:text-lg">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutCard;
