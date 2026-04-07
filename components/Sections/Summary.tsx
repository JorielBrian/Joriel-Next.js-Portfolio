'use client';
import Link from "next/link";
// import { PROFESSIONAL_SUMMARY } from "../../app/data/index";
import { ABOUT } from "../../app/data/index";
import { motion } from "framer-motion";
import Image from "next/image";

const Summary = () =>{
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };
    return (
        <section id="about">
            <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{ease:"easeIn", duration:0.5}}  className="text-4xl text-center font-bold">Professional Summary</motion.h1>
                <div className="card relative p-4 align-middle sm:rounded-2xl">
                    <div className="2xl:col-span-2 content-center">
                        {/* Profile Image */}
                        <motion.div 
                            initial={{scale: 0.8, opacity:0}} 
                            whileInView={{scale: 1, opacity:1}} 
                            transition={{ease:"easeOut", duration:0.8}}
                            className="shrink-0 m-4 lg:w-fit lg:float-left"
                        >
                            <div className="relative place-self-center lg:mx-0 w-60 h-60 lg:w-70 lg:h-70 xl:w-90 xl:h-90 2xl:w-94 2xl:h-94">
                                {/* Decorative gradient circle */}
                                <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                                <Image
                                    width={340}
                                    height={340}
                                    src="/Profile Picture.png" 
                                    alt="My Image" 
                                    className="relative w-full h-full rounded-full object-cover border-4 border-blue-500/50 shadow-2xl"
                                />
                            </div>
                        </motion.div>
                        {/* Content */}
                        <motion.div 
                            className="flex-1 text-white font-sans"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <motion.div variants={itemVariants}>
                                <h1 className="text-5xl lg:text-6xl font-bold mb-2">{"Hi, I'm Joriel Brian"}</h1>
                            </motion.div>
        
                            <motion.p 
                                variants={itemVariants}
                                className="text-lg text-gray-200 font-semibold mb-6 leading-relaxed"
                            >
                                Full-Stack Developer | System Engineer | Tech Enthusiast
                            </motion.p>
        
                            <motion.div variants={itemVariants}>
                                {ABOUT && ABOUT.map((about, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="mb-5"
                                    >
                                        <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                                            {about}
                                        </p>
                                        {index < ABOUT.length - 1 && (
                                            <div className="h-px bg-linear-to-r from-blue-500/30 via-purple-500/30 to-transparent my-5"></div>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
        
                            {/* Key Qualities */}
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-blue-500/20">
                                {['Problem Solver', 'Quick Learner', 'Team Player', 'Detail Oriented'].map((quality, idx) => (
                                    <motion.span 
                                        key={idx}
                                        whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
                                        transition={{ duration: 0.2 }}
                                        className="px-4 py-2 rounded-full border border-blue-500/40 text-sm text-gray-200 bg-blue-500/10 hover:bg-blue-500/30 cursor-default transition-colors"
                                    >
                                        {quality}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                    <Link 
                        href="/about"
                        className="button active mt-4! sm:w-1/4! place-content-center! place-self-center"
                    >
                        Read More...
                    </Link>
                </div>    
        </section>
    );
}
export default Summary;