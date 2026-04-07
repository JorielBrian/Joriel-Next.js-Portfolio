'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

// Icons
import { House, BriefcaseBusiness, Folder, CircleUser } from "lucide-react";
import { GiSkills } from "react-icons/gi";
import { GrSend } from "react-icons/gr";

const Navigation = () =>{
    const [scroll, setScroll] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const segment = useSelectedLayoutSegment();
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScroll(currentScrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection('#' + entry.target.id);
                }
            });
        }, observerOptions);
        const sections = document.querySelectorAll('section[id], footer[id]');
        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);
    
    const isActive = (href: string) => {
        if (href === '/' && !segment) return true;
        if (segment) return false;
        if (href.startsWith('/#')) {
            return activeSection === href.substring(1);
        }
        return false;
    };

    return (
        <motion.section className={scroll ? "navbar" : "flex my-0! w-full sm:w-4/5 justify-center"}>
            <div className="flex w-full py-0! px-5 rounded-sm justify-between items-center">
                {/* Logo */}
                <Link href={"/"} className="w-fit py-0!">
                    <Image
                        width={64}
                        height={64} 
                        src="/logo.png" 
                        alt="JB logo" 
                        className="size-11 sm:size-12 md:size-14"
                    />
                </Link>

                {/* Navigation */}
                <div className="flex items-center py-0!">
                    {/* MOBILE VIEW */}
                    <ul className="flex lg:hidden">
                        <li>
                            <Link 
                                href='/' 
                                className={`button ${isActive('/#hero') ? 'active' : ''}`}
                            >
                                <House />
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#about' 
                                className={`button ${isActive('/#about') ? 'active' : ''}`}
                            >
                                <CircleUser />
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#skills' 
                                className={`button ${isActive('/#skills') ? 'active' : ''}`}
                            >
                                <GiSkills />
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#experience' 
                                className={`button ${isActive('/#experience') ? 'active' : ''}`}
                            >
                                <BriefcaseBusiness />
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#projects' 
                                className={`button ${isActive('/#projects') ? 'active' : ''}`}
                            >
                                <Folder />
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#connect' 
                                className={`button ${isActive('/#connect') ? 'active' : ''}`}
                            >
                                <GrSend />
                            </Link>
                        </li>
                    </ul>
                    
                    {/* DESKTOP VIEW */}
                    <ul className="hidden lg:flex">
                        <li>
                            <Link 
                                href='/' 
                                className={`button ${isActive('/#hero') ? 'active' : ''}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#about' 
                                className={`button ${isActive('/#about') ? 'active' : ''}`}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#skills' 
                                className={`button ${isActive('/#skills') ? 'active' : ''}`}
                            >
                                Skills
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#experience' 
                                className={`button ${isActive('/#experience') ? 'active' : ''}`}
                            >
                                Experiences
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#projects' 
                                className={`button ${isActive('/#projects') ? 'active' : ''}`}
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/#connect' 
                                className={`button ${isActive('/#connect') ? 'active' : ''}`}
                            >
                                Connect
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* CV Button */}
                <div className="flex items-center py-0!">
                    <a href="Joriel Brian Sudario - CV.pdf" target="_blank"><button className="navbarCV flex lg:hidden">CV</button></a>
                    <a href="Joriel Brian Sudario - CV.pdf" target="_blank"><button className="navbarCV hidden lg:flex">Resume</button></a>
                </div>
            </div>
        </motion.section>
    );
}
export default Navigation;