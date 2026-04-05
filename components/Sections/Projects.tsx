'use client';
import { motion } from "framer-motion";
import { PROJECTS } from "@/app/data/projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { iframe } from "motion/react-client";
import Link from "next/link";
import Image from "next/image";

const Projects = () => {
  return (
    <motion.section 
        id="projects"
        initial={{x:100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{ease:"easeIn", duration:0.5}}
        className="py-16"
    >   
        <motion.div 
            initial={{opacity:0, y:20}} 
            whileInView={{opacity:1, y:0}} 
            transition={{ease:"easeIn", duration:0.6}}
            className="max-w-6xl mx-auto px-4 text-center mb-12"
        >
            <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm mb-3">Featured work</p>
            <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4">
            <Carousel className="pb-8">
                <CarouselContent className="-ml-3 md:-ml-4">
                    { PROJECTS && PROJECTS.map((project, index) => (
                        <CarouselItem 
                            key={index}
                            className="pl-3 md:pl-4 xl:basis-1/2"
                        >
                            <motion.article 
                                initial={{opacity:0, y:20}} 
                                whileInView={{opacity:1, y:0}} 
                                transition={{ease:"easeIn", duration:0.5, delay: index * 0.08}}
                                className="group overflow-hidden rounded-4xl border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/30 hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className="relative h-72 overflow-hidden bg-slate-900">
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                                    <div className="absolute left-4 bottom-4 right-4 flex flex-col gap-2">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                                            Project {index + 1}
                                        </span>
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">{project.name}</h3>
                                    </div>
                                </div>

                                <div className="p-6 space-y-5">
                                    <p className="text-slate-300 text-sm sm:text-base leading-7 line-clamp-3">{project.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.skills.map((skill, i) => (
                                            <span key={i} className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="text-slate-400 text-xs uppercase tracking-[0.2em]">
                                            {project.link ? 'Live demo available' : 'Concept / assessment'}
                                        </div>

                                        {project.link && 
                                            <Link 
                                                href={project.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={project.link ? 'inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400' : 'hidden'}
                                            >
                                                View Site
                                            </Link>
                                        }
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

            <div className="mt-8 text-center">
                <Link href="/projects" className="inline-flex items-center justify-center rounded-full bg-slate-200 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-300">
                    Explore all projects
                </Link>
            </div>
        </div>
    </motion.section>
  )
}

export default Projects;