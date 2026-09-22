'use client';
import { motion } from 'motion/react'
import { Typewriter} from "react-simple-typewriter";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getContentBlock } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";

import FocusSkills from "../FocusSkills";

// WebGL only exists in the browser — dynamic() with ssr:false skips
// trying to render this on the server, which would just error.
// It's not page-critical data, so it isn't wired into useLoading;
// it just pops in whenever it's ready.
const DevWorkstation3D = dynamic(() => import("../three/DevWorkstation3D"), {
  ssr: false,
  loading: () => <div style={{ height: 420 }} />,
});

function Hero() {
  const [INTRODUCTION, setINTRODUCTION] = useState<string[]>([]);
  const { register, unregister } = useLoading();

  useEffect(() => {
    const key = "hero-introduction";
    register(key);
    getContentBlock("INTRODUCTION")
      .then((block) => setINTRODUCTION(block.paragraphs))
      .catch(() => {})
      .finally(() => unregister(key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="hero" className="h-screen mb-20 xl:mb-0">
        <motion.div 
            initial={{y:100, opacity:0}}
            whileInView={{y:0, opacity:1}}
            transition={{ease:"easeIn", duration:1.5}}
            className="w-full text-center font-sans"
        >
            <h1 className="text-5xl font-bold sm:text-7xl xl:text-8xl 2xl:text-9xl mb-2 tracking-tight">
                Joriel Brian Sudario
            </h1>
            <h3 
                className="pb-5 border-amber-50 text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl bg-linear-to-r from-neutral-400 via-cyan-500 to-blue-800 bg-clip-text text-transparent"
            >
                <Typewriter 
                    // words={['Web Developer', 'Full Stack Developer', 'System Engineer', 'Software Engineer', 'Computer Programmer', 'IT Specialist', 'Circuit Assembler', 'Information Technology']}
                    words={['Software Engineer', 'Full Stack Developer', 'Web Developer', 'System Engineer']}
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