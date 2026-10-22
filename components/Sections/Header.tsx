'use client'
import Navigation from './Navigation'
import { motion } from 'motion/react'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react'
import { useSelectedLayoutSegment } from "next/navigation";
import { House, BriefcaseBusiness, Folder, CircleUser } from "lucide-react";
import { GrSend } from "react-icons/gr";
import { getResumeViewUrl } from "@/app/lib/api";
import { getResumeDownloadUrl } from "@/app/lib/api";

function MobileNavigation() {
    const [activeSection, setActiveSection] = useState('');
    const segment = useSelectedLayoutSegment();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection('#' + entry.target.id);
            });
        }, { root: null, rootMargin: '0px', threshold: 0.3 });

        const sections = document.querySelectorAll('section[id], footer[id]');
        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const isActive = (href: string) => {
        if (href === '/' && !segment) return true;
        if (segment) return false;
        if (href.startsWith('/#')) return activeSection === href.substring(1);
        return false;
    };

    return (
        <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-60 lg:hidden">
            <ul className="flex items-center justify-around gap-1 border-t border-blue-700/80 bg-blue-950/95 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-[0_-8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <li><Link href="/" aria-label="Home" className={`button ${isActive('/#hero') ? 'active' : ''}`}><House /></Link></li>
                <li><Link href="/#about" aria-label="About" className={`button ${isActive('/#about') ? 'active' : ''}`}><CircleUser /></Link></li>
                <li><Link href="/#experience" aria-label="Experiences" className={`button ${isActive('/#experience') ? 'active' : ''}`}><BriefcaseBusiness /></Link></li>
                <li><Link href="/#projects" aria-label="Projects" className={`button ${isActive('/#projects') ? 'active' : ''}`}><Folder /></Link></li>
                <li><Link href="/#connect" aria-label="Connect" className={`button ${isActive('/#connect') ? 'active' : ''}`}><GrSend /></Link></li>
            </ul>
        </nav>
    );
}

function Header() {
    const [scroll, setScroll] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('up');
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1023px)');
        const handleViewportChange = () => setIsMobile(mediaQuery.matches);

        handleViewportChange();
        mediaQuery.addEventListener('change', handleViewportChange);
        return () => mediaQuery.removeEventListener('change', handleViewportChange);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            setScroll(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const resumeUrl = getResumeViewUrl();

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: 0 }}
                animate={{
                    opacity: isMobile || scrollDirection === 'up' ? 1 : 0,
                    y: !isMobile && scrollDirection === 'down' ? -100 : 0
                }}
                transition={{
                    ease: "easeInOut",
                    duration: 0.3
                }}
                className={scroll ? "flex lg:sticky top-0 z-50 w-full px-15 items-center justify-between gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4" : "flex w-full px-15 py-10 items-center justify-between gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4"}
            >
                <Link href="/" className="w-fit shrink-0 py-0! lg:justify-self-start">
                    <Image
                        width={64}
                        height={64}
                        src="/logo.png"
                        alt="JB logo"
                        className="size-11 sm:size-12 md:size-14"
                    />
                </Link>
                <Navigation />
                <div className="flex shrink-0 items-center py-0! lg:justify-self-end">
                    <a href={resumeUrl} target="_blank" rel="noreferrer" className="navbarCV flex lg:hidden">View CV</a>
                    <a href={resumeUrl} target="_blank" rel="noreferrer" className="navbarCV hidden lg:flex">View CV</a>
                </div>
            </motion.header>
            <MobileNavigation />
        </>
    );
}

export default Header;
