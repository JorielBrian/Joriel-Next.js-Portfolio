'use client';
import Link from "next/link";
import { PROFESSIONAL_SUMMARY } from "../../app/data/index";
import { motion } from "framer-motion";

const Summary = () =>{
    return (
        <section>
            <motion.h1 id="about" initial={{opacity:0}} whileInView={{opacity:1}} transition={{ease:"easeIn", duration:0.5}}  className="text-4xl text-center font-bold">Professional Summary</motion.h1>
                <div className="card relative p-4 align-middle sm:rounded-2xl">
                    <div className="2xl:col-span-2 content-center">
                        <motion.img 
                            initial={{x:100, opacity:0}} 
                            whileInView={{x:0, opacity:1}} 
                            transition={{ease:"easeIn", duration:1.5}}
                            src="/Profile Picture.png" 
                            alt="My Image" 
                            className="hidden lg:block lg:float-left w-fit m-4 size-70  xl:size-90 2xl:120 my-5 rounded-full"
                        />
                        <div className="text-white font-sans justify-center flex-col">
                            { PROFESSIONAL_SUMMARY && PROFESSIONAL_SUMMARY.map(summary => (
                                <motion.p 
                                    key={summary}  
                                    initial={{x:100, opacity:0}} 
                                    whileInView={{x:0, opacity:1}} 
                                    transition={{ease:"easeIn", duration:0.5}}
                                >
                                    {summary}
                                </motion.p>
                            )) }
                        </div>
                    </div>
                    <Link href="/about" className="button active w-11/12">Read More...</Link>
                </div>    
        </section>
    );
}
export default Summary;