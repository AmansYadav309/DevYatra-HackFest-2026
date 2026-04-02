import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RollingText } from './ui/RollingText';
import { Link, useLocation } from 'react-router-dom';

export const TopNavBar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#060e20]/80 backdrop-blur-xl border-b border-primary/20 shadow-lg' : 'bg-transparent'}`}
        >
            <div className="flex justify-between items-center px-8 h-20 max-w-screen-2xl mx-auto">
                <Link to="/" className="text-2xl font-black tracking-tighter text-on-background">DevYatra</Link>
                <div className="hidden md:flex gap-8 items-center">
                    {['About', 'Timeline', 'Prizes', 'Rules'].map((nav) => (
                        <a key={nav} href={isHome ? `#${nav.toLowerCase()}` : `/#${nav.toLowerCase()}`} className="font-headline font-bold tracking-tight text-sm text-on-surface-variant hover:text-on-background transition-colors">
                            <RollingText text={nav} hoverColorClass="text-primary" />
                        </a>
                    ))}
                    <Link to="/problems" className="font-headline font-bold tracking-tight text-sm text-primary hover:text-primary transition-colors relative flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <RollingText text="Problem Statements" hoverColorClass="text-primary" />
                    </Link>
                    <Link to="/submit" className="font-headline font-bold tracking-tight text-sm text-on-surface-variant hover:text-on-background transition-colors">
                        <RollingText text="Submit" hoverColorClass="text-primary" />
                    </Link>
                </div>
                <button 
                    onClick={() => window.open('https://forms.gle/rB2doC8FYhcFm6g16', '_blank')}
                    className="relative overflow-hidden group bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(253,191,31,0.2)] hover:shadow-[0_0_40px_rgba(253,191,31,0.7)] hover:scale-105 active:scale-95">
                    <span className="relative z-10 flex items-center justify-center">
                        <RollingText text="Register NOW" hoverColorClass="text-black" />
                    </span>
                    <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                </button>
            </div>
        </motion.nav>
    );
};
