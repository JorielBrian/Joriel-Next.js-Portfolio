import SkillsUsed from "@/components/SkillsUsed";
import { motion } from "framer-motion";
import { Qualification } from "@/app/(root)/data/types";
import { Calendar, Building, Briefcase } from "lucide-react";

interface ExperienceCardProps {
    title: string,
    contract: 'Full Time' | 'Contractual / Project' | 'Internship',
    experiences: Qualification[]
}

function ExperienceCard({title, contract, experiences}: ExperienceCardProps) {
  const filtered = experiences.filter(exp => exp.contract === contract);
  
  return (
    <section className="w-full">
        <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white inline-flex items-center gap-3">
                <span className="h-1 w-12 bg-linear-to-r from-cyan-400 to-cyan-600"></span>
                {title}
            </h2>
            <p className="mt-2 text-slate-400 text-sm">{filtered.length} experience{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        
        {/* Timeline Container */}
        <article className="space-y-12">
            {filtered.map((experience, index) => {
                return (
                    <motion.article 
                        key={experience.title + experience.company}
                        initial={{opacity:0, y:20}} 
                        whileInView={{opacity:1, y:0}} 
                        transition={{ease:"easeOut", duration:0.6, delay: index * 0.1}}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300"
                    >
                        {/* Header Section */}
                        <div className="mb-6">
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-2">
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                                        {experience.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Building className="h-4 w-4 text-cyan-300" />
                                        <span className="text-base">{experience.company}</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1">
                                        <Briefcase className="h-3 w-3 text-cyan-300" />
                                        <span className="text-xs uppercase tracking-[0.2em] text-cyan-300 font-semibold">
                                            {experience.contract}
                                        </span>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-blue-800 bg-blue-950/90 px-4 py-3 text-sm">
                                    <div className="flex items-center gap-2 text-cyan-300 mb-2">
                                        <Calendar className="h-4 w-4" />
                                        {experience.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Description */}
                        <ul className="mb-6 space-y-3">
                            {experience.description.map((task, idx) => (
                                <li key={idx} className="flex gap-3 text-slate-300">
                                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                                    <span className="text-sm leading-7">{task}</span>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Skills */}
                        <div className="pt-6 border-t border-cyan-600">
                            <SkillsUsed skills={experience.skills} />
                        </div>
                    </motion.article>    
                );
            })}
        </article>
    </section>
  );
}

export default ExperienceCard;