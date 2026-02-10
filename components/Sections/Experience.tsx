'use client';
import { motion } from "framer-motion";
import { QUALIFICATIONS } from "@/app/data/qualifications";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const Experience = () => {
  return (
    <motion.section 
        id="experience"
        initial={{x:100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{ease:"easeIn", duration:0.5}}
        className=""
    >
        <motion.h1 
            initial={{opacity:0}} 
            whileInView={{opacity:1}} 
            transition={{ease:"easeIn", duration:0.5}}  
            className="text-4xl font-bold text-center mb-10"
        >
            Experiences
        </motion.h1>
        <Carousel>
            <CarouselContent>
                { QUALIFICATIONS && QUALIFICATIONS.map((experience, index) => (
                    <CarouselItem 
                        key={index}
                        className="lg:basis-1/2 xl:basis-1/3"
                    >
                        <div className="card h-70">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{experience.title}</h3>
                            <p className="text-xl sm:text-2xl md:text-3xl text-cyan-300">{experience.company}</p>
                            <ul className="text-gray-300 mb-2 line-clamp-3">
                                {experience.description.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <span className="flex w-full justify-center">
                <Link href="/experiences" className="button active w-11/12">View Experiences</Link>
            </span>
        </Carousel>
    </motion.section>
  )
}

export default Experience