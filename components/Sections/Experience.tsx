'use client';
import { motion } from "framer-motion";
import { QUALIFICATIONS, QUALIFICATIONS_PROJECTS } from "@/app/data/qualifications";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Experience = () => {
  return (
    <motion.section 
        initial={{x:100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{ease:"easeIn", duration:0.5}}
        className="card"
    >
        <Carousel>
            <CarouselContent>
                { QUALIFICATIONS && QUALIFICATIONS.map((experience, index) => (
                    <CarouselItem 
                        key={index}
                        className="basis-1/3"
                    >
                        <div className="p-5">
                            <h3 className="text-md font-bold mb-2">{experience.title}</h3>
                            <p className="text-gray-600 mb-4">{experience.company} | {experience.date}</p>
                            <ul className="list-disc list-inside text-gray-700">
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
        </Carousel>
    </motion.section>
  )
}

export default Experience