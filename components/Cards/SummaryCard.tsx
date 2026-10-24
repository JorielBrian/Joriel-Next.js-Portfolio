import Image from "next/image";

import { useEffect, useState } from "react";
import { motion } from 'motion/react';
import { getContentBlock } from "@/app/lib/api";
import { useLoading } from "@/app/lib/loading-context";
import SectionSkeleton from "@/components/SectionSkeleton";

const SummaryCard = () => {
    const [ABOUT, setABOUT] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

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
    const { register, unregister } = useLoading();

    useEffect(() => {
        const key = "summary-about";
        register(key);
        getContentBlock("ABOUT")
            .then((block) => setABOUT(block.paragraphs))
            .catch(() => {})
            .finally(() => { unregister(key); setLoading(false); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="content-center">
            {/* Profile Image */}
            <motion.div 
                initial={{scale: 0.8, opacity:0}} 
                whileInView={{scale: 1, opacity:1}} 
                transition={{ease:"easeOut", duration:0.4}}
                className="float-start shrink-0 m-4 w-full md:w-fit lg:w-full"
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
                    <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold mb-2">
                        {"Hi, I'm Joriel Brian"}
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants}>
                    {loading ? <SectionSkeleton variant="text" count={3} /> : ABOUT.map((about, index) => (
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
            </motion.div>
        </div>
  )
}

export default SummaryCard