import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TopNavBar } from '../components/TopNavBar';
import { Footer } from '../components/Footer';
import { GravityStarsBackground } from '../components/ui/GravityStarsBackground';

export const ProblemStatementsPage: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        // 2 days before April 4, 2026
        const targetDate = new Date("April 2, 2026 23:59:59").getTime();
        
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
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
        <div className="dark min-h-screen text-on-surface bg-[#020617] flex flex-col relative overflow-hidden">
            <TopNavBar />
            
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

            <main className="flex-1 flex items-center justify-center relative z-10 pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-primary/40 mb-8 animate-pulse shadow-[0_0_30px_rgba(253,191,31,0.2)]"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_20px_#fdbf1f]"></span>
                        <span className="text-xs font-label font-bold tracking-[0.2em] text-primary uppercase">Unlock Innovation</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight"
                    >
                        Problem Statements <br/>
                        <span className="text-gradient">Coming Soon</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-xl text-on-surface-variant font-medium mb-12"
                    >
                        Get ready to solve some of the most challenging problems. The problem statements will be released exactly 2 days before the hackathon begins. Stay tuned!
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col items-center justify-center gap-6 mb-16"
                    >
                        <span className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">
                            Problems Reveal In
                        </span>
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
                    </motion.div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <button 
                            onClick={() => window.open('https://forms.gle/rB2doC8FYhcFm6g16', '_blank')}
                            className="relative overflow-hidden group bg-gradient-to-br from-primary to-primary-container text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(253,191,31,0.4)] hover:shadow-[0_0_50px_rgba(253,191,31,0.8)] hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">rocket_launch</span> Register Now
                            </span>
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                        </button>
                    </motion.div>
                </div>
            </main>
            
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};
