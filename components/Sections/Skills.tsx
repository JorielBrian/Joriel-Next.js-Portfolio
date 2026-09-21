'use client';
import SkillCard from "../Cards/SkillCard";
import { motion } from 'motion/react';
import { Preference } from "../../app/data/enum";
import { useEffect, useState } from "react";
import { getSkills, ApiSkill } from "@/app/lib/api";

const Skills = () =>{
    const [skills, setSkills] = useState<ApiSkill[]>([]);

    useEffect(() => {
        getSkills().then(setSkills).catch(() => setSkills([]));
    }, []);

    return (
        <section id="skills" className="w-4/5 mx-auto my-5 content-center">
            <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{ease:"easeIn", duration:0.5}}  className="m-5 text-4xl text-center font-bold" >Skills</motion.h1>
            <div className="relative flex flex-wrap p-1 rounded-2xl justify-center">
                <SkillCard preference = {Preference.CORE_SKILL} skills={skills}></SkillCard>
                <SkillCard preference = {Preference.SUB_SKILL} skills={skills}></SkillCard>
                <SkillCard preference = {Preference.HARDWARE} skills={skills}></SkillCard>
            </div>
        </section>
    );
}
export default Skills;