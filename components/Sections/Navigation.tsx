'use client'
import { motion } from 'motion/react';
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

// Icons


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
        <motion.div className={scroll ? "hidden lg:block navbar navbar--scrolled" : "hidden lg:flex my-0! w-full justify-center lg:w-max"}>
            <div className="flex w-full py-0! px-5 rounded-sm items-center justify-center">
                {/* Navigation */}
                <div className="flex items-center py-0!">
                    {/* DESKTOP VIEW */}
                    <ul className="hidden items-center justify-center lg:flex">
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
        </motion.div>
    );
}
export default Navigation;