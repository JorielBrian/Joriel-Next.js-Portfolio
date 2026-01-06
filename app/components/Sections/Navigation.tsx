'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation"; // Changed import
import { House, BriefcaseBusiness, Folder, CircleUser } from "lucide-react";
import { useEffect, useState } from "react";

const Navigation = () =>{
    const [scroll, setScroll] = useState(false);
    const segment = useSelectedLayoutSegment();
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScroll(currentScrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        if (path === '/' && !segment) return true;

        return segment === path.replace('/', '');
    };

    return (
        <motion.section className={scroll ? "navbar" : "flex w-full sm:w-2/3 justify-center"}>
            <div className="flex w-full !py-0 px-5 rounded-sm justify-between">
                {/* Logo */}
                <div className="w-fit !py-0">
                    <img 
                        src="/logo.png" 
                        alt="JB logo" 
                        className="size-14 md:size-16 p-1"
                    />
                </div>

                {/* Navigation */}
                <div className="flex items-center !py-0">
                    {/* MOBILE VIEW */}
                    <ul className="flex lg:hidden">
                        <li>
                            <Link 
                                href='/' 
                                className={`button ${isActive('/') ? 'active' : ''}`}
                            >
                                <House />
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/experiences' 
                                className={`button ${isActive('/experiences') ? 'active' : ''}`}
                            >
                                <BriefcaseBusiness />
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/projects' 
                                className={`button ${isActive('/projects') ? 'active' : ''}`}
                            >
                                <Folder />
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/about' 
                                className={`button ${isActive('/about') ? 'active' : ''}`}
                            >
                                <CircleUser />
                            </Link>
                        </li>
                    </ul>
                    
                    {/* DESKTOP VIEW */}
                    <ul className="hidden lg:flex">
                        <li>
                            <Link 
                                href='/' 
                                className={`button ${isActive('/') ? 'active' : ''}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/experiences' 
                                className={`button ${isActive('/experiences') ? 'active' : ''}`}
                            >
                                Experiences
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/projects' 
                                className={`button ${isActive('/projects') ? 'active' : ''}`}
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/about' 
                                className={`button ${isActive('/about') ? 'active' : ''}`}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* CV Button */}
                <div className="flex items-center !py-0">
                    <a href="Joriel Brian Sudario - CV.pdf" target="_blank"><button className="navbarCV flex lg:hidden">CV</button></a>
                    <a href="Joriel Brian Sudario - CV.pdf" target="_blank"><button className="navbarCV hidden lg:flex">Resume</button></a>
                </div>
            </div>
        </motion.section>
    );
}
export default Navigation;