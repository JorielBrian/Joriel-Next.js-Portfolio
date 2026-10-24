'use client';

import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProjects, ApiProject } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";
import SectionSkeleton from "@/components/SectionSkeleton";
import SectionHeading from "@/components/Sections/SectionHeading";

const Projects = () => {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, unregister } = useLoading();

  useEffect(() => {
    const key = "section-projects";
    register(key);
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => {
        unregister(key);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="py-12 sm:py-16 lg:py-20"
    >
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
      />

      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        {loading ? (
          <SectionSkeleton variant="cards" count={3} />
        ) : projects.length > 0 ? (
          <Carousel className="w-full pb-6">
            <CarouselContent className="-ml-3 md:-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={project.name} className="pl-3 md:pl-4 md:basis-1/2 xl:basis-1/3">
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
                    className="group flex h-full min-h-[34rem] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
                  >
                    <div className="relative h-56 shrink-0 overflow-hidden bg-slate-900 sm:h-64">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
                      <div className="absolute inset-x-4 bottom-4">
                        <span className="mb-2 inline-flex rounded-full border border-cyan-200/20 bg-slate-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur">
                          Featured project {index + 1}
                        </span>
                        <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">{project.name}</h3>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="line-clamp-4 text-sm leading-7 text-slate-300 sm:text-base">{project.description}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                        <span className="text-xs uppercase tracking-[0.12em] text-slate-400">
                          {project.link ? "Live demo available" : "Project overview"}
                        </span>
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-10 items-center justify-center rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                          >
                            View project <span aria-hidden="true" className="ml-2">↗</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-between gap-4 px-3 md:px-4">
              <CarouselPrevious className="md:flex" />
              <CarouselNext className="md:flex" />
            </div>
          </Carousel>
        ) : (
          <p className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 text-center text-slate-400">
            Projects are temporarily unavailable.
          </p>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/50 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
          >
            Explore all projects <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
