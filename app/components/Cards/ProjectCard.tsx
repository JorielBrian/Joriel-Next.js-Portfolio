import { motion } from "framer-motion";
import SkillsUsed from "../SkillsUsed";

interface ProjectCardProps {
  name: string;
  description: string;
  image: string;
  skills: string[];
  link?: string;
}

function ProjectCard({name, description, image, skills, link}: ProjectCardProps) {
  return (
    <article key={name} className="card flex flex-wrap p-2 sm:p-4! lg:p-6! gap-2">
        <motion.h1 initial={{opacity: 0, y: -100}} whileInView={{opacity: 1, y: 0}} transition={{ease:"easeInOut", duration:0.75}}  className="font-bold text-center lg:text-left text-3xl text-blue-600">{name}</motion.h1>
        <motion.img 
            initial={{opacity:0 , x: 100}} 
            whileInView={{opacity: 1, x:0}} 
            transition={{ease:"easeInOut", duration: 0.75}} 
            src={image} 
            alt={name} 
            className="min-w-70 max-w-2xl mx-auto rounded-xl"
        />
        <motion.p 
            initial={{opacity: 0, x: -100}} 
            whileInView={{opacity: 1, x: 0}} 
            transition={{ease:"easeInOut", duration:0.75}}  
            className="max-w-2xl p-2"
        >
            {description}
        </motion.p>
        <motion.span 
            initial={{opacity: 0, x: -100}} 
            whileInView={{opacity: 1, x: 0}} 
            transition={{ease:"easeInOut", duration: 0.75}}  
            className="flex flex-wrap h-fit justify-start my-2 gap-3"
        >
            <SkillsUsed skills={skills} />
        </motion.span>
        
        {link && 
        <motion.a 
            href={link} 
            target="_blank" 
            initial={{opacity: 0, y: 100}} 
            whileInView={{opacity: 1, y: 0}} 
            transition={{ease:"easeInOut", duration: 0.75}}  
            className="w-full text-center bg-cyan-500/50 p-1 px-3 h-fit rounded-2xl"
        >
            Visit Site
        </motion.a>}
    </article>
  )
}

export default ProjectCard