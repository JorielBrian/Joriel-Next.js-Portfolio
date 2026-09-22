'use client';
import { motion } from 'motion/react';
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSkills, ApiSkill } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

const FocusSkills = () => {
    const [SKILLS, setSKILLS] = useState<ApiSkill[]>([]);
    const { register, unregister } = useLoading();

    useEffect(() => {
        const key = "focus-skills";
        register(key);
        getSkills().then(setSKILLS).catch(() => setSKILLS([])).finally(() => unregister(key));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            className="size-10 lg:size-12 xl:size-15 object-contain"
                        />
                    </motion.div>
                );
            }) }
        </div>
    )
}

export default FocusSkills