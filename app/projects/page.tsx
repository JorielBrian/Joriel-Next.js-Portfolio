'use client'
import { PROJECTS } from "../data/projects"
import ProjectCard from "@/components/Cards/ProjectCard";
import { useEffect } from "react";

const Projects = () => {
  if (typeof window !== 'undefined') {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  }
  
  return (
    <div className="xl:grid xl:grid-cols-2 w-4/5 mx-auto my-5 p-2 gap-4 rounded-2xl content-center">
        {PROJECTS && PROJECTS.map(project => (
            <ProjectCard key={project.name} name={project.name} description={ project.description} image={project.image} skills={project.skills} link={project.link} />
        ))}
    </div>
  )
}

export default Projects