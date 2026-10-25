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
    <div className={`relative min-h-0 min-w-0 overflow-hidden bg-slate-950 ${imageOnLeft ? "md:order-first" : "md:order-last"}`}>
      <Image
        src={image}
        alt={altImage || ""}
        fill
        priority={!title}
        sizes="(max-width: 767px) 100vw, 50vw"
        className="object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/10 md:bg-gradient-to-r md:from-slate-950/20 md:via-transparent md:to-slate-950/30" />
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
      className="my-5 h-[90svh] scroll-mt-24 overflow-hidden rounded-3xl border border-blue-400/25 bg-slate-950/95 shadow-2xl shadow-blue-950/40 sm:my-7 md:h-[90svh] lg:my-8"
    >
      <div className="grid h-full min-h-0 grid-rows-[41%_59%] md:grid-cols-2 md:grid-rows-1">
        {imagePanel}

        <div className={`relative min-h-0 min-w-0 overflow-hidden bg-gradient-to-br from-blue-950/95 via-slate-950/95 to-slate-950 ${imageOnLeft ? "md:order-last" : "md:order-first"}`}>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-slate-950/50 to-transparent" />
          <div
            className="h-full min-h-0 overflow-y-auto overscroll-auto px-5 py-5 [scrollbar-color:rgba(125,211,252,0.35)_transparent] [scrollbar-width:thin] sm:px-8 sm:py-7 lg:px-10 lg:py-9"
            tabIndex={0}
            aria-label={title ? `${title} text` : "Introduction text"}
          >
            {title && (
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:text-sm">
                <SectionIcon aria-hidden="true" className="size-4 shrink-0" />
                <span id={`about-${title.toLowerCase().replaceAll(" ", "-")}`}>{title}</span>
              </div>
            )}

            {header && (
              <h2
                id="about-intro-heading"
                className="mb-4 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
              >
                {header}
              </h2>
            )}

            <div className="space-y-4 text-sm leading-7 text-blue-100/90 sm:text-base sm:leading-8 lg:text-lg">
              {texts.map((text, index) => (
                <p key={`${title ?? "intro"}-${index}`}>{text}</p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default AboutCard;
