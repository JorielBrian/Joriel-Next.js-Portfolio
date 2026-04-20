'use client'
import { PROJECTS } from "@/data/projects"
import ProjectCard from "@/components/Cards/ProjectCard";
import { useEffect } from "react";

const Projects = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-0!">
          {PROJECTS && PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} index={index} name={project.name} description={project.description} image={project.image} skills={project.skills} link={project.link} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects