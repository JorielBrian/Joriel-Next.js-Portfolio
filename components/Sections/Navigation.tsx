'use client'
import { motion } from 'motion/react';
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

// Icons
import { House, BriefcaseBusiness, Folder, CircleUser } from "lucide-react";
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
                {/* Navigation */}
                <div className="flex items-center py-0!">
                    {/* MOBILE VIEW */}
                    <ul className="fixed inset-x-0 bottom-0 z-60 flex items-center justify-center gap-1 border-t border-blue-700/80 bg-blue-950/95 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-[0_-8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md lg:hidden">
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
            </div>
        </motion.section>
    );
}
export default Navigation;