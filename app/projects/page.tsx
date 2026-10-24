'use client';

import ProjectCard from "@/components/Cards/ProjectCard";
import SectionSkeleton from "@/components/SectionSkeleton";
import { useEffect, useState } from "react";
import { getProjects, ApiProject } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

const Projects = () => {
  const [PROJECTS, setProjects] = useState<ApiProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { register, unregister } = useLoading();

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    const key = "page-projects";
    register(key);
    getProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => {
        unregister(key);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
        <header className="mb-10 text-center sm:mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Work Showcase</span>
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">Featured Projects</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            A collection of projects built with modern technologies, demonstrating problem-solving, design thinking, and full-stack development capabilities.
          </p>
        </header>

        {error && (
          <p role="alert" className="mb-8 text-center text-red-400">
            Couldn&apos;t load projects right now. Please try again later.
          </p>
        )}

        {loading ? (
          <SectionSkeleton variant="cards" count={6} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.name} index={index} name={project.name} description={project.description} image={project.image} skills={project.skills} link={project.link ?? undefined} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Projects;
