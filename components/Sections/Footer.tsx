'use client';
import { motion } from "motion/react";
import { 
  FiMail, 
  FiPhone, 
  FiDownload, 
  FiFileText,
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiArrowRight
} from "react-icons/fi";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiVercel, SiShadcnui  } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const Footer = () =>{
    const contactInfo = [
        { icon: <FiMail />, text: "jorielsudario@gmail.com", href: "mailto:jorielsudario@gmail.com" },
        { icon: <FiPhone />, text: "+63 965 447 5177", href: "tel:+639654475177" }
    ];

    const cvLinks = [
        { icon: <FiFileText />, text: "View CV", href: "Joriel Brian Sudario - CV.pdf", variant: "outline" },
        { icon: <FiDownload />, text: "Download CV", href: "Joriel Brian Sudario - CV.pdf", download: true, variant: "primary" }
    ];

    const socialMedia = [
        { icon: <FiFacebook />, href: "https://www.facebook.com/jorielbrian.sudario?mibextid=ZbWKwL", label: "Facebook" },
        { icon: <FiGithub />, href: "https://github.com/JorielBrian", label: "GitHub" },
        { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/joriel-brian-sudario-b14728265", label: "LinkedIn" },
        { icon: <FiInstagram />, href: "https://instagram.com/jorielbrian?igshid=MzNlNGNkZWQ4Mg==", label: "Instagram" }
    ];

    const techStack = [
        { icon: <SiNextdotjs />, label: "Next.js" },
        { icon: <SiTypescript />, label: "TypeScript" },
        { icon: <SiTailwindcss />, label: "Tailwind CSS" },
        { icon: <SiShadcnui />, label: "Shadcn UI" },
        { icon: <TbBrandFramerMotion />, label: "Framer Motion" },
        { icon: <SiVercel />, label: "Vercel"}
    ];
    
    return (
        <motion.footer 
            id="connect" 
            initial={{y:100, opacity:0}} 
            whileInView={{y:0, opacity:1}} 
            transition={{ease:"easeIn", duration:1}}  
            className="w-full py-20 bg-blue-950/50 border-t-2 border-blue-800/80"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Section */}
                    <motion.section 
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="text-center lg:text-left p-6 rounded-xl bg-linear-to-b from-blue-950/30 to-blue-950 border-2 border-blue-700/80 hover:border-blue-600 transition-colors"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 justify-center lg:justify-start">
                            <FiMail className="text-blue-200" /> Contact
                        </h2>
                        <div className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    whileHover={{x: 4}}
                                    className="flex items-center gap-3 text-gray-300 hover:text-blue-200 transition-colors duration-300 group"
                                >
                                    <span className="text-blue-400 group-hover:text-blue-200 text-lg">{item.icon}</span>
                                    <span className="text-sm sm:text-base">{item.text}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.section>
                    
                    {/* CV Section */}
                    <motion.section 
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.1}}
                        className="text-center p-6 rounded-xl bg-linear-to-b from-blue-900/40 to-blue-950/60 border-2 border-blue-700/80 hover:border-blue-600 transition-colors"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 justify-center">
                            <FiFileText className="text-blue-200" /> CV
                        </h2>
                        <div className="flex flex-col gap-3">
                            {cvLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    download={link.download}
                                    target={link.variant === "outline" ? "_blank" : undefined}
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                        link.variant === "primary"
                                            ? "bg-linear-to-b from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg hover:shadow-blue-500/50"
                                            : "border-2 border-blue-600/80 text-blue-200 hover:bg-blue-600/20"
                                    }`}
                                >
                                    {link.icon}
                                    {link.text}
                                </motion.a>
                            ))}
                        </div>
                    </motion.section>

                    {/* Social Media Section */}
                    <motion.section 
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                        className="text-center lg:text-left p-6 rounded-xl bg-linear-to-b from-blue-950/30 to-blue-950 border-2 border-blue-700/80 hover:border-blue-600 transition-colors"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 justify-center lg:justify-start">
                            <FiLinkedin className="text-blue-200" /> Connect
                        </h2>
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            {socialMedia.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    whileHover={{scale: 1.1, y: -4}}
                                    whileTap={{scale: 0.95}}
                                    className="p-3 bg-linear-to-b from-blue-900 to-blue-950 border-2 border-blue-700/80 rounded-full hover:border-blue-600/80 hover:bg-blue-800 transition-all duration-300 text-blue-200 hover:text-white"
                                >
                                    <span className="text-xl">{social.icon}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* Tech Stack Section */}
                <motion.div 
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.3}}
                    className="border-t-2 border-blue-700/80 pt-12"
                >
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        Built with <FiArrowRight className="text-blue-400" />
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={index}
                                whileHover={{y: -4}}
                                className="flex items-center gap-2 px-3 py-3 bg-linear-to-b from-blue-900/40 to-blue-950/60 border border-blue-700/80 hover:border-blue-600 rounded-lg transition-colors hover:bg-blue-900/50 cursor-pointer"
                            >
                                <span className="text-blue-400 text-lg">{tech.icon}</span>
                                <span className="text-xs sm:text-sm font-medium text-gray-200">{tech.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer Bottom */}
                <motion.div 
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.4}}
                    className="border-t-2 border-blue-700/80 mt-12 pt-8 text-center"
                >
                    <p className="text-gray-400 text-sm mb-1">
                        © {new Date().getFullYear()} Joriel Brian Sudario. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs">
                        Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
export default Footer;