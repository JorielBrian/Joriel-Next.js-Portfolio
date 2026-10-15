import { motion } from 'motion/react';
import { Preference, Proficiency } from "../../app/data/enum";
import { ApiSkill } from "@/app/lib/api";

interface SkillCardProps {
  preference: Preference;
  skills: ApiSkill[];
}

function SkillCard({ preference, skills: SKILLS }: SkillCardProps) {
    const skillrate = (proficiency: Proficiency) => {
        if (proficiency === Proficiency.ADVANCE) {
            return"★★★★★"
        } else if (proficiency === Proficiency.PROFICIENT) {
            return "★★★★✩"
        } else if (proficiency === Proficiency.INTERMEDIATE) {
            return "★★★✩✩"
        } else if (proficiency === Proficiency.FUNCTIONAL) {
            return "★★✩✩✩"
        } else if (proficiency === Proficiency.BEGINNER){
            return "★✩✩✩✩"
        } else {
            return "✩✩✩✩✩"
        };
    }
        
    return (
        <div className="flex flex-wrap w-full relative justify-center my-5 items-center">
            <motion.h2 
                initial={{opacity:0}} 
                whileInView={{opacity:1}} 
                transition={{ease:"easeIn", duration:0.4}}  
                className="absolute content-center text-5xl md:text-7xl lg:text-9xl text-white/30 w-full h-full text-center font-bold "
            >
                {preference}
            </motion.h2>

            { SKILLS && SKILLS.filter(skill => skill.preference === preference).map(skill => (
                <span key={skill.skill}>
                    <motion.div
                        className="group relative p-3 justify-center"
                        whileHover={{ scale: 1.1 }}
                    >
                        <motion.img
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            src={skill.image}
                            alt={skill.skill}
                            title={skill.skill}
                            className="icons m-auto"
                        />
                        <h5 className="text-center font-bold text-amber-200 text-[11px] md:text-sm xl:text-lg">{skillrate(skill.proficiency)}</h5>
                        <h5 className="text-center font-bold text-cyan-500 text-[11px] md:text-sm xl:text-lg">{skill.skill}</h5>
                    </motion.div>
                </span>
            ))}

        </div>
    )
}

export default SkillCard