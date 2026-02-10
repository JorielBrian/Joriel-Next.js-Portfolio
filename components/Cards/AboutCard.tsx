'use client';
// import { ABOUT } from "../../data/index";
import { motion } from "framer-motion";

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
            {title && <h3 className="text-3xl text-center font-bold mb-6">{ title }</h3>}
            { image && 
                <motion.img 
                    initial={{x:100, opacity:0}} 
                    whileInView={{x:0, opacity:1}} 
                    transition={{ease:"easeIn", duration:1.5}}
                    src={ image }
                    alt={ altImage } 
                    className={ `${imageClasses} sm:float-left w-fit size-50 lg:size-70 2xl:size-80 m-4 my-5 rounded-full` }>
                </motion.img>
            }
            
            <div className="text-white font-sans space-y-2">
                {header && <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{ease:"easeIn", duration:0.5}}  className="text-4xl text-center lg:text-left font-bold">{ header }</motion.h1>}
                { texts && texts.map(text => (
                    <motion.p key={text} initial={{x:100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{ease:"easeIn", duration:0.5}}>{text}</motion.p>
                )) }
            </div>
        </motion.section>
    );
}
export default AboutCard;