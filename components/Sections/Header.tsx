'use client'
import Navigation from './Navigation'
import { motion } from 'motion/react'
import Link from 'next/dist/client/link';
import Image from "next/image";
import { useEffect, useState } from 'react'

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
        
        // Detect scroll direction
        if (currentScrollY > lastScrollY) {
            setScrollDirection('down');
        } else {
            setScrollDirection('up');
        }
        
        // For sticky effect
        setScroll(currentScrollY > 50);
        
        setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <motion.header
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
                // Keep the logo and CV button visible on mobile/tablet.
                opacity: isMobile || scrollDirection === 'up' ? 1 : 0,
                y: !isMobile && scrollDirection === 'down' ? -100 : 0
            }}
            transition={{ 
                ease: "easeInOut",
                duration: 0.3
            }}
            className={scroll ? "flex lg:sticky top-0 z-50 w-full justify-center items-center" : "flex w-full py-10 justify-center items-center"}
        >
            {/* Logo stays in the top header */}
            <Link href={"/"} className="w-fit py-0!">
                <Image
                    width={64}
                    height={64} 
                    src="/logo.png" 
                    alt="JB logo" 
                    className="size-11 sm:size-12 md:size-14"
                />
            </Link>
            <Navigation />
            {/* CV button stays in the top header */}
            <div className="flex items-center py-0!">
                <a href="Joriel Brian Sudario - CV.pdf" target="_blank" rel="noreferrer"><button className="navbarCV flex lg:hidden">CV</button></a>
                <a href="Joriel Brian Sudario - CV.pdf" target="_blank" rel="noreferrer"><button className="navbarCV hidden lg:flex">Resume</button></a>
            </div>
        </motion.header>
    )
}

export default Header