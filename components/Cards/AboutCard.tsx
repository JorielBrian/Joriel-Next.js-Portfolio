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
  const imageOnLeft = position === "left";

  const imagePanel = image && (
    <div
      className={`group relative min-h-[16rem] overflow-hidden bg-slate-950 sm:min-h-[20rem] md:min-h-full ${imageOnLeft ? "md:order-first" : "md:order-last"}`}
    >
      <Image
        src={image}
        alt={altImage || ""}
        fill
        priority={!title}
        sizes="(max-width: 767px) 100vw, 45vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/65 via-slate-950/5 to-slate-950/10 md:bg-linear-to-r md:from-slate-950/10 md:via-transparent md:to-slate-950/35" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      aria-labelledby={title ? `about-${title.toLowerCase().replaceAll(" ", "-")}` : "about-intro-heading"}
      className="my-6 scroll-mt-24 overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-950/80 shadow-xl shadow-blue-950/25 sm:my-8 lg:my-10"
    >
      <div className="grid min-w-0 grid-rows-[minmax(16rem,38svh)_auto] md:min-h-[34rem] md:grid-cols-[0.9fr_1.1fr] md:grid-rows-1">
        {imagePanel}

        <div
          className={`relative flex min-w-0 flex-col justify-center bg-linear-to-br from-blue-950/80 via-slate-950 to-slate-950 px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-14 ${imageOnLeft ? "md:order-last" : "md:order-first"}`}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative">
            {title && (
              <div className="mb-5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:text-sm">
                <span className="flex size-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10">
                  <SectionIcon aria-hidden="true" className="size-4" />
                </span>
                <span id={`about-${title.toLowerCase().replaceAll(" ", "-")}`}>{title}</span>
              </div>
            )}

            {header && (
              <h2
                id="about-intro-heading"
                className="mb-5 max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {header}
              </h2>
            )}

            <div className="max-w-prose space-y-4 text-base leading-7 text-blue-100/85 sm:space-y-5 sm:text-lg sm:leading-8">
              {texts.map((text, index) => (
                <p key={`${title ?? "intro"}-${index}`}>{text}</p>
              ))}
            </div>

            <div className="mt-8 h-px w-16 bg-linear-to-r from-cyan-300/80 to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutCard;
