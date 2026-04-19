'use client';
import { motion } from "framer-motion"
import { INTRODUCTION } from "@/app/(root)/data/index";
import { Typewriter} from "react-simple-typewriter";

import FocusSkills from "../FocusSkills";

function Hero() {
  return (
    <section id="hero" className="h-screen mb-20 xl:mb-0">
        <motion.div 
            initial={{y:100, opacity:0}}
            whileInView={{y:0, opacity:1}}
            transition={{ease:"easeIn", duration:1.5}}
            className="w-full text-center font-sans"
        >
            <h1 className="text-6xl font-bold sm:text-7xl xl:text-8xl 2xl:text-9xl mb-2 tracking-tight">
                Joriel Brian Sudario
            </h1>
            <h3 
                className="pb-5 border-amber-50 text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl bg-linear-to-r from-neutral-400 via-cyan-500 to-blue-800 bg-clip-text text-transparent"
            >
                <Typewriter 
                    // words={['Web Developer', 'Full Stack Developer', 'System Engineer', 'Software Engineer', 'Computer Programmer', 'IT Specialist', 'Circuit Assembler', 'Information Technology']}
                    words={['Full Stack Developer', 'Front-end Developer', 'Web Developer', 'System Engineer']}
                    loop = {true}
                    cursor cursorStyle = {'|'} cursorBlinking = {true} cursorColor="white"
                />
            </h3>
            <FocusSkills />
        </motion.div>
        <motion.div
            initial={{y:-100, opacity:0}}
            whileInView={{y:0, opacity:1}}
            transition={{ease:"easeIn", duration:1.5}}
            className="py-4 mt-10"
        >
                <div className="text-center space-y-2">
                    { INTRODUCTION && INTRODUCTION.map(intro => (
                        <p key={intro} className="font-sans">{ intro }</p>
                    )) }
                </div>
        </motion.div>
    </section>
  )
}

export default Hero