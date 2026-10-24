'use client';
import { motion } from 'motion/react';
import { Preference } from "../../app/data/enum";
import { useEffect, useState } from "react";
import { getSkills, ApiSkill } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";
import SectionSkeleton from "@/components/SectionSkeleton";

const Skills = () =>{
    const [skills, setSkills] = useState<ApiSkill[]>([]);
    const [loading, setLoading] = useState(true);
    const { register, unregister } = useLoading();

    useEffect(() => {
        const key = "section-skills";
        register(key);
        getSkills().then(setSkills).catch(() => setSkills([])).finally(() => { unregister(key); setLoading(false); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="w-4/5 mx-auto my-5 content-center">
            <div className="relative flex flex-wrap p-1 rounded-2xl justify-center">
                <div className="flex flex-wrap w-full relative justify-center my-5 items-center">
                    {loading ? <SectionSkeleton variant="chips" count={6} /> : skills.filter(skill => skill.preference === Preference.CORE_SKILL).map(skill => (
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
                                <h5 className="text-center font-bold text-cyan-500 text-[11px] md:text-sm xl:text-lg">{skill.skill}</h5>
                            </motion.div>
                        </span>
                    ))}

                </div>
            </div>
        </section>
    );
}
export default Skills;