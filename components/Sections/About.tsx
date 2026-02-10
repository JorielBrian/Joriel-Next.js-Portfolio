// 'use client';
import { ABOUT } from "../../app/data/index";
import { motion } from "framer-motion";

const About = () =>{
    return (
        <motion.section 
            initial={{x:100, opacity:0}} 
            whileInView={{x:0, opacity:1}} 
            transition={{ease:"easeIn", duration:0.5}}
            className="card sectionLeft"
        >
            <motion.img 
                initial={{x:100, opacity:0}} 
                whileInView={{x:0, opacity:1}} 
                transition={{ease:"easeIn", duration:1.5}}
                src="/Profile Picture.png" 
                alt="My Image" 
                className="float-right w-fit size-90 m-4 my-5 rounded-full"
            />
            <div className="text-white font-sans">
                <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{ease:"easeIn", duration:0.5}}  className="text-4xl text-center lg:text-left font-bold">Hi, I'm Joriel</motion.h1>
                { ABOUT && ABOUT.map(about => (
                    <motion.p key={about} initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>{about}</motion.p>
                )) }
            </div>
        </motion.section>
    );
}
export default About;