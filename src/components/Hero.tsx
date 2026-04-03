import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HACKATHON_INFO } from '../data/mockData';
import { GravityStarsBackground } from './ui/GravityStarsBackground';

export const Hero: React.FC = () => {
    const targetDate = new Date("April 4, 2026 11:00:00").getTime();
    
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });
    const [isExpired, setIsExpired] = useState(() => new Date().getTime() > targetDate);

    useEffect(() => {
        
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setIsExpired(true);
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[120vh] flex items-center justify-center pt-20 px-6 overflow-hidden ">
            <GravityStarsBackground 
                starColor="#fdbf1f" 
                count={250}
                className="absolute inset-0 z-0 opacity-80" 
            />

            {/* Atmospheric Background Elements */}
            <motion.div 
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ opacity: 0.8, scale: 1.3 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/40 rounded-full blur-[100px] z-0"
            />
            <motion.div 
                initial={{ opacity: 0.1, scale: 1 }}
                animate={{ opacity: 0.7, scale: 1.5 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] z-0"
            />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-primary/40 mb-8 animate-pulse shadow-[0_0_30px_rgba(253,191,31,0.2)]"
                >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_20px_#fdbf1f]"></span>
                    <span className="text-xs font-label font-bold tracking-[0.2em] text-primary uppercase">DEV_IT Student Forum KDKCE PRESENTS</span>
                </motion.div>

                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight"
                >
                    {HACKATHON_INFO.title} <br/>
                    <span className="text-gradient">HackFest {HACKATHON_INFO.year}</span>
                </motion.h1>

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl md:text-2xl text-on-surface-variant font-medium mb-4 max-w-3xl mx-auto"
                >
                    {HACKATHON_INFO.subtitle}
                </motion.p>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex flex-wrap justify-center gap-4 text-sm font-label font-bold tracking-widest text-[#a3aac4] mb-12 uppercase"
                >
                    <span>{HACKATHON_INFO.meta[0]}</span>
                    <span className="text-primary/40">•</span>
                    <span>{HACKATHON_INFO.meta[1]}</span>
                </motion.div>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center mb-10"
                >
                    {isExpired ? (
                        <div className="relative overflow-hidden group bg-gradient-to-br from-red-500/20 to-red-900/40 border border-red-500/50 backdrop-blur-md text-red-100 px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(239,68,68,0.3)] flex items-center justify-center gap-3 cursor-not-allowed">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_#ef4444]"></span>
                            </span>
                            Registration Closed
                        </div>
                    ) : (
                        <button 
                            onClick={() => window.open('https://forms.gle/rB2doC8FYhcFm6g16', '_blank')}
                            className="relative overflow-hidden group bg-gradient-to-br from-primary to-primary-container text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(253,191,31,0.4)] hover:shadow-[0_0_50px_rgba(253,191,31,0.8)] hover:scale-105 active:scale-95">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">rocket_launch</span> Register Now
                            </span>
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                        </button>
                    )}
                    <a 
                        href="/DevYatra-Hackfest-template.pptx"
                        download="DevYatra-Hackfest-template.pptx"
                        className="glass-card px-10 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 group"
                    >
                        <span className="material-symbols-outlined group-hover:-translate-y-1 transition-transform">download</span>
                        Download PPT
                    </a>
                </motion.div>

                {/* Problem Statements Released - Notification Pill */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 200 }}
                    className="mb-10"
                >
                    <Link 
                        to="/problems"
                        className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 backdrop-blur-xl border border-primary/40 text-primary hover:border-primary/70 hover:from-primary/25 hover:via-primary/15 hover:to-primary/25 transition-all duration-500 group shadow-[0_0_25px_rgba(253,191,31,0.15)] hover:shadow-[0_0_40px_rgba(253,191,31,0.35)]"
                    >
                        <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_8px_#fdbf1f]"></span>
                        </span>
                        <span className="text-sm font-black tracking-wider uppercase">🚀 Problem Statements Released!</span>
                        <span className="material-symbols-outlined text-base group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
                    </Link>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <span className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">
                        Registration closed • 4th April 2026
                    </span>
                    {!isExpired && (
                        <div className="flex gap-4 sm:gap-6">
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className="flex flex-col items-center">
                                    <div className="glass-card w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-2 border border-primary/20 shadow-[0_0_15px_rgba(253,191,31,0.1)]">
                                        <span className="text-2xl sm:text-3xl font-black text-primary">{String(value).padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{unit}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};
