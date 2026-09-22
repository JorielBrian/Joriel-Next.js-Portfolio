'use client'
import ProjectCard from "@/components/Cards/ProjectCard";
import { useEffect, useState } from "react";
import { getProjects, ApiProject } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

const Projects = () => {
  const [PROJECTS, setProjects] = useState<ApiProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { register, unregister } = useLoading();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    const key = "page-projects";
    register(key);
    getProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => unregister(key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-cyan-300 uppercase tracking-[0.3em] text-sm font-semibold">
            Work Showcase
          </span>
          <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-white">
            Featured Projects
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-slate-400 text-lg leading-8">
            A collection of projects built with modern technologies, demonstrating problem-solving, design thinking, and full-stack development capabilities.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-400 mb-8">
            Couldn&apos;t load projects right now. Please try again later.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-0!">
          {PROJECTS && PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} index={index} name={project.name} description={project.description} image={project.image} skills={project.skills} link={project.link ?? undefined} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects