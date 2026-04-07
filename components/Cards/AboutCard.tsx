'use client';
// import { ABOUT } from "../../data/index";
import { motion } from "framer-motion";
import Image from "next/image";

interface AboutCardProps {
    title?: string,
    header?: string,
    image?: string,
    altImage?: string,
    texts: string[],
    position: 'left' | 'right'
};

const AboutCard = ({title, header, image, altImage, texts, position}: AboutCardProps) =>{

    const imageClasses = position === "left" ? "md:float-right" : "md:float-left";
    const textAnimationInitial = position === "left" ? {x:-100, opacity:0} : {x:100, opacity:0};
    const sectionPositionClass = position === "left" ? "sectionLeft" : "sectionRight";

    return (
        <motion.section 
            initial={ textAnimationInitial } 
            whileInView={{x:0, opacity:1}} 
            transition={{ease:"easeIn", duration:0.5}}
            className={ `${sectionPositionClass} card flex flex-wrap sm:block justify-center` }
        >   
            { image && 
                <motion.div
                    initial={{x:100, opacity:0}} 
                    whileInView={{x:0, opacity:1}} 
                    transition={{ease:"easeIn", duration:1.5}}
                    className={ `${imageClasses} sm:float-left w-fit size-50 md:size-60 lg:size-70 xl:size-80 m-4 my-5 rounded-full` }
                    >
                    <Image
                        width={360}
                        height={360}
                        src={ image }
                        alt={ altImage || "About image" }
                        className="relative w-full h-full rounded-full object-cover border-4 border-blue-500/50 shadow-2xl"
                        />
                </motion.div>
            }
            
            <div className="text-white font-sans space-y-2">
                {title && (
                    <div className="flex mb-4 md:w-1/2 place-content-center">
                        <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-md uppercase tracking-[0.3em] text-cyan-300">
                            {title}
                        </span>
                    </div>
                )}
                {header && 
                    <motion.h1 
                        initial={{opacity:0}}
                        whileInView={{opacity:1}}
                        transition={{ease:"easeIn", duration:0.5}}
                        className="text-2xl text-start md:text-3xl xl:text-4xl lg:text-left font-bold mb-4"
                    >
                        { header }
                    </motion.h1>}

                { texts && texts.map((text, index) => (
                    <div key={index} className="space-y-4" >
                        <motion.p
                            initial={{x:100, opacity:0}}
                            whileInView={{x:0, opacity:1}}
                            transition={{ease:"easeIn", duration:0.5}}
                        >
                            {text}
                        </motion.p>
                        
                        {index < text.length - 1 && (
                            <div className="h-px bg-linear-to-r from-blue-500/30 via-purple-500/30 to-transparent my-5"></div>
                        )}
                    </div>
                )) }
            </div>
        </motion.section>
    );
}
export default AboutCard;