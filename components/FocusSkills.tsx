import { motion } from "framer-motion";
import { SKILLS } from "@/app/data/all_skills";
import Image from "next/image";

// Icons
// import {
//     SiNextdotjs,
//     SiLaravel,
//     SiTypescript,
//     SiTailwindcss,
//     SiVercel,
//     SiShadcnui,
//     SiPostgresql,
//     SiDrizzle
// } from "react-icons/si";
// import { TbBrandFramerMotion } from "react-icons/tb";
// import { FaReact } from "react-icons/fa";

const FocusSkills = () => {

    return (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
            { SKILLS && SKILLS.filter(skill => skill.focus === true).map(skill => {

                return (
                    <motion.div
                        key={skill.skill}
                        whileHover={{ y: -4, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        className="group flex w-fit flex-col items-center gap-2 rounded-3xl border border-white/10 text-center shadow-[0_20px_45px_-26px_rgba(14,165,233,0.7)] transition-all duration-300 hover:border-cyan-400/40 overflow-hidden"
                        title={skill.skill}
                        aria-label={skill.skill}
                    >
                        <Image
                            width={28}
                            height={28}
                            src={skill.image}
                            alt={skill.skill}
                            title={skill.skill}
                            className="size-15 object-contain"
                        />
                    </motion.div>
                );
            }) }
        </div>
    )
}

export default FocusSkills