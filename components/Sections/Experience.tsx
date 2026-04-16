'use client';

import { motion } from "framer-motion";
import { QUALIFICATIONS } from "@/app/data/qualifications";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, Building, Briefcase } from "lucide-react";

const Experience = () => {
  return (
    <motion.section 
        id="experience"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="py-16"
    >
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-4xl font-bold text-center mb-12"
        >
            Professional Experience
        </motion.h1>
        <div className="max-w-7xl mx-auto px-4">
            <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                    { QUALIFICATIONS && QUALIFICATIONS.map((experience, index) => (
                        <CarouselItem 
                            key={index}
                            className="pl-2 md:pl-4 lg:basis-1/2"
                        >
                            <motion.article
                                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                                whileHover={{ y: -4 }}
                                className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl p-6 h-full border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
                            >
                                <div className="grid mb-4 xl:grid-cols-1 2xl:grid-cols-3 items-start justify-between">
                                    <span className="flex-1 2xl:col-span-2">
                                        <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-white mb-1">{experience.title}</h3>
                                        <span className="flex items-center text-cyan-300 mb-2">
                                            <Building className="w-4 h-4 mr-2" />
                                            <span className="text-lg">{experience.company}</span>
                                        </span>
                                    </span>
                                    <span className="text-right">
                                        <span className="flex items-center text-gray-400 text-sm 2xl:text-md mb-1">
                                            <Calendar className="w-5 h-5 mr-1" />
                                            {experience.date}
                                        </span>
                                        <span className="flex items-center text-gray-400 2xl:text-md">
                                            <Briefcase className="w-4 h-4 mr-1" />
                                            {experience.contract}
                                        </span>
                                    </span>
                                </div>
                                
                                <ul className="text-gray-300 mb-4 space-y-1">
                                    {experience.description.slice(0, 3).map((desc, i) => (
                                        <li key={i} className="text-sm xl:text-md 2xl:text-lg leading-relaxed flex items-start">
                                            <span className="text-cyan-400 mr-2 mt-1">•</span>
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="flex flex-wrap gap-2">
                                    {experience.skills.slice(0, 6).map((skill, i) => (
                                        <span 
                                            key={i} 
                                            className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.article>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="md:flex" />
                <CarouselNext className="md:flex" />
            </Carousel>
        </div>
        <div className="mt-8 text-center">
            <Link href="/experiences" className="button active inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-slate-950 transition place-self-center">
                Explore all experiences
            </Link>
        </div>
    </motion.section>
  );
}

export default Experience