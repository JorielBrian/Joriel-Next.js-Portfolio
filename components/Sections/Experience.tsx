'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getQualifications, ApiQualification } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, Building, Briefcase } from "lucide-react";
import SectionSkeleton from "@/components/SectionSkeleton";
import SectionHeading from "@/components/Sections/SectionHeading";

const Experience = () => {
  const [qualifications, setQualifications] = useState<ApiQualification[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, unregister } = useLoading();

  useEffect(() => {
    const key = "section-experience";
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
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="py-12 sm:py-16 lg:py-20"
    >
      <SectionHeading
        eyebrow="Where I’ve worked"
        title="Professional experience"
      />

      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        {loading ? (
          <SectionSkeleton variant="cards" count={3} />
        ) : qualifications.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-3 md:-ml-4">
              {qualifications.map((experience, index) => (
                <CarouselItem key={experience.company + experience.title + index} className="pl-3 md:pl-4 md:basis-1/2 xl:basis-1/3">
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="flex h-full min-h-[30rem] flex-col rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/90 to-slate-950/90 p-5 shadow-lg shadow-black/10 transition-colors hover:border-cyan-300/40 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">{experience.title}</h3>
                        <p className="mt-2 flex items-start gap-2 text-sm font-medium text-cyan-200 sm:text-base">
                          <Building aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                          <span>{experience.company}</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400 sm:text-sm">
                        <span className="inline-flex items-center gap-1.5"><Calendar aria-hidden="true" size={15} />{experience.date}</span>
                        <span className="inline-flex items-center gap-1.5"><Briefcase aria-hidden="true" size={15} />{experience.contract}</span>
                      </div>
                    </div>

                    <ul className="mt-4 flex-1 space-y-3 text-sm leading-6 text-slate-300">
                      {experience.description.slice(0, 3).map((description, descriptionIndex) => (
                        <li key={descriptionIndex} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300" />
                          <span>{description}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      {experience.skills.slice(0, 6).map((skill) => (
                        <span key={skill} className="rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1 text-xs text-cyan-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="md:flex" />
            <CarouselNext className="md:flex" />
          </Carousel>
        ) : (
          <p className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 text-center text-slate-400">
            Experience details are temporarily unavailable.
          </p>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/experiences"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/50 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        >
          Explore all experience <span aria-hidden="true" className="ml-2">↗</span>
        </Link>
      </div>
    </motion.section>
  );
};

export default Experience;
