import { motion } from "framer-motion";
import { SKILLS } from "@/app/(root)/data/all_skills";
import Image from "next/image";

// Icons
import {
    SiNextdotjs,
    SiLaravel,
    SiTypescript,
    SiTailwindcss,
    SiVercel,
    SiShadcnui,
    SiPostgresql,
    SiDrizzle
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { FaReact } from "react-icons/fa";

const FocusSkills = () => {
    const techStack = [
        { icon: <SiNextdotjs className="hero-icon icons" />, label: "Next.js" },
        { icon: <FaReact className="hero-icon icons" />, label: "React" },
        { icon: <SiLaravel className="hero-icon icons" />, label: "Laravel"},
        { icon: <SiTypescript className="hero-icon icons" />, label: "TypeScript" },
        { icon: <SiTailwindcss className="hero-icon icons" />, label: "Tailwind CSS" },
        { icon: <SiShadcnui className="hero-icon icons" />, label: "Shadcn/UI" },
        { icon: <TbBrandFramerMotion className="hero-icon icons" />, label: "Framer Motion" },
        { icon: <SiVercel className="hero-icon icons" />, label: "Vercel"},
        { icon: <SiPostgresql className="hero-icon icons" />, label: "PostgreSQL" },
        { icon: <SiDrizzle className="hero-icon icons" />, label: "Drizzle" }
    ];

    return (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
            { SKILLS && SKILLS.filter(skill => skill.focus === true).map(skill => {
                const matchedTech = techStack.find(tech => tech.label === skill.skill);

                return (
                    <motion.div
                        key={skill.skill}
                        whileHover={{ y: -4, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        className="group flex w-fit flex-col items-center gap-2 rounded-3xl border border-white/10 text-center shadow-[0_20px_45px_-26px_rgba(14,165,233,0.7)] transition-all duration-300 hover:border-cyan-400/40"
                        title={skill.skill}
                        aria-label={skill.skill}
                    >
                            {matchedTech ? (
                                matchedTech.icon
                            ) : (
                                <Image
                                    width={28}
                                    height={28}
                                    src={skill.image}
                                    alt={skill.skill}
                                    title={skill.skill}
                                    className="h-10 w-10 object-contain"
                                />
                            )}
                    </motion.div>
                );
            }) }
        </div>
    )
}

export default FocusSkills