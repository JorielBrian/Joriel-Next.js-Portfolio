import SkillsUsed from "../SkillsUsed";
import { motion } from "framer-motion";
import { Qualification } from "../../data/types";

interface ExperienceCardProps {
    title: string,
    experiences: Qualification[]
}

function Experiences({title, experiences}: ExperienceCardProps) {
  return (
    <section className="w-full 2xl:p-3 rounded-sm">
        <div className="rounded-sm">
            <motion.h1 
                initial={{opacity:0}} 
                whileInView={{opacity:1}} 
                transition={{ease:"easeIn", duration:0.5}}  
                className="text-4xl font-bold text-center mb-10"
            >
                {title}
            </motion.h1>
            
            {/* Timeline Container */}
            <article className="relative">
                {/* Central Timeline Line */}
                {/* <div className="absolute left-1/2 transform -translate-x-1/2 w-[0.5px] h-full bg-blue-400"></div> */}
                
                {/* Timeline Experiences */}
                { experiences.map((experience, index) => {
                    const isLeft = index % 2 === 0;
                    
                    return (
                        <article 
                            key={experience.company} 
                            className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} min-h-50 mb-10`}
                        >
                            {/* Timeline Dot */}
                            {/* <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                                <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-gray-900"></div>
                            </div> */}
                            
                            {/* Content Card - Alternating Sides */}
                            <motion.div 
                                initial={{x: isLeft ? -50 : 50, opacity:0}} 
                                whileInView={{x:0, opacity:1}} 
                                transition={{ease:"easeIn", duration:0.5}}
                                className={`card w-full lg:w-4/5 xl:w-3/4 2xl:w-1/2 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}
                            >
                                {/* Header Section */}
                                <div className="mb-4">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{experience.title}</h1>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl text-cyan-300">{experience.company}</h3>
                                    <span className="flex gap-4">
                                        <h4 className="text-sm sm:text-md md:text-lg text-blue-300">{experience.date}</h4>
                                        <h4 className="text-sm sm:text-md md:text-lg text-cyan-300">{experience.contract}</h4>
                                    </span>
                                </div>
                                
                                {/* Description */}
                                <div className="mb-4">
                                    {experience.description.map(task => (
                                        <p key={task} className="text-gray-300 mb-2">{task}</p>
                                    ))}
                                </div>
                                
                                {/* Skills */}
                                <SkillsUsed skills={experience.skills} />
                            </motion.div>
                        </article>    
                    );
                })}
            </article>
        </div>
    </section>
  );
}

export default Experiences;