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
import { iframe } from "motion/react-client";
import Link from "next/link";

const Projects = () => {
  return (
    <motion.section 
        id="projects"
        initial={{x:100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{ease:"easeIn", duration:0.5}}
    >   
        <motion.h1 
            initial={{opacity:0}} 
            whileInView={{opacity:1}} 
            transition={{ease:"easeIn", duration:0.5}}  
            className="text-4xl font-bold text-center mb-10"
        >
            Projects
        </motion.h1>
        <Carousel>
            <CarouselContent>
                { PROJECTS && PROJECTS.map((project, index) => (
                    <CarouselItem 
                        key={index}
                        className="xl:basis-1/3"
                    >
                        <article className="h-100 relative overflow-hidden rounded-2xl">
                            <div className="absolute bottom-0 w-full p-4 bg-black/60 z-1">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{project.name}</h3>
                                <p className="text-gray-300 mb-2 line-clamp-1">{project.description}</p>
                            </div>
                            <div className="p-0! -z-1 w-full h-full rounded-2xl overflow-hidden">
                                {project.link ? <iframe className="w-full h-full" src={project.link} /> : <img src={project.image} alt={project.name} className="w-full h-full object-cover" />}
                            </div>
                        </article>                        
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <span className="flex w-full justify-center">
                <Link href="/projects" className="button active w-11/12">View Projects</Link>
            </span>
        </Carousel>
    </motion.section>
  )
}

export default Projects;