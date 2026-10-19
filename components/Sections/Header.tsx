'use client'
import Navigation from './Navigation'
import { motion } from 'motion/react'
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

            className={scroll ? "flex sticky top-0 z-50 w-full justify-center" : "flex w-full py-10 justify-center"}
        >
            <Navigation />
        </motion.header>
    )
}

export default Header