'use client';
import Link from "next/link";
import { motion } from 'motion/react';

import SummaryCard from "../Cards/SummaryCard";
import SummarySkillsCard from "@/components/Cards/SummarySkillsCard";


const Summary = () =>{
    return (
        <section id="about">
            <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{ease:"easeIn", duration:0.5}}  className="text-4xl text-center font-bold">Professional Summary</motion.h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 relative p-4 align-middle sm:rounded-2xl">
                    <SummaryCard />
                    <SummarySkillsCard />
                    <Link 
                        href="/about"
                        className="button active lg:col-span-2 mt-4! sm:w-1/4! place-content-center! place-self-center"
                    >
                        Read More...
                    </Link>
                </div>    
        </section>
    );
}
export default Summary;