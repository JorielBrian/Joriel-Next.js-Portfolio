import { motion } from "framer-motion";
// import SkillsUsed from "@/components/SkillsUsed";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  image: string;
  skills: string[];
  link?: string;
  index?: number;
}

function ProjectCard({name, description, image, skills, link, index = 0}: ProjectCardProps) {
  return (
    <motion.article
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{ease: "easeOut", duration: 0.6, delay: index * 0.1}}
      className="group overflow-hidden rounded-2xl border border-blue-900 bg-blue-950 shadow-xl shadow-slate-950/30"
    >
      {/* Image Container */}
      <div className="relative p-0! h-80 overflow-hidden">
        {link ? (
          <iframe
            src={link}
            loading="lazy"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105 scrollbar-hide z-1"
            style={{
              border: 'none',
              pointerEvents: 'auto'
            }}
          />
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 to-transparent opacity-80 group-hover:opacity-60 transition duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {name}
        </h2>

        <p className="text-slate-300 text-sm leading-6 mb-4">
          {description}
        </p>

        {/* Skills */}
        <div className="mb-5 pb-5 border-b border-slate-800 p-0!">
          <div className="flex flex-wrap gap-2 p-0!">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-0.5 text-xs text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            <span>View Project</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default ProjectCard