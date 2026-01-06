'use client';
import Link from "next/link";
import { ABOUT } from "../../data/index";
import { motion } from "framer-motion";

const About = () =>{
    return (
        <section>
            <motion.h1 id="about" initial={{opacity:0}} whileInView={{opacity:1}} transition={{ease:"easeIn", duration:0.5}}  className="text-4xl text-center font-bold">About Me</motion.h1>
                <div className="relative p-4 align-middle bg-sky-900/80 sm:rounded-2xl">
                    <div className="2xl:col-span-2 content-center">
                        <motion.img 
                        initial={{x:100, opacity:0}} 
                        whileInView={{x:0, opacity:1}} 
                        transition={{ease:"easeIn", duration:1.5}}
                        src="/Profile Picture.png" 
                        alt="My Image" 
                        className="float-left w-fit m-4 size-120 my-5 rounded-full"
                        />
                        <div className="text-white font-sans">
                            { ABOUT && ABOUT.map(about => (
                                <motion.p key={about} initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>{about}</motion.p>
                            )) }
                        </div>
                        
                    
                    </div>
                    <Link href="/about" className="button active w-11/12">Read More...</Link>
                </div>    
        </section>
    );
}
export default About;