import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopNavBar } from '../components/TopNavBar';
import { Footer } from '../components/Footer';
import { GravityStarsBackground } from '../components/ui/GravityStarsBackground';
import { PROBLEM_STATEMENTS, DOMAINS } from '../data/problemStatements';

export const ProblemStatementsPage: React.FC = () => {
    const [selectedDomain, setSelectedDomain] = useState<string>('All');

    const filteredProblems = selectedDomain === 'All' 
        ? PROBLEM_STATEMENTS 
        : PROBLEM_STATEMENTS.filter(ps => ps.domain === selectedDomain);

    const allDomainsWithAll = ['All', ...DOMAINS];

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
                animate={{ opacity: 0.6, scale: 1.3 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] z-0"
            />
            <motion.div 
                initial={{ opacity: 0.1, scale: 1 }}
                animate={{ opacity: 0.5, scale: 1.5 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] z-0"
            />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] z-0"
            />

            <main className="flex-1 relative z-10 pt-32 pb-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-primary/40 mb-6 shadow-[0_0_30px_rgba(253,191,31,0.1)]"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#fdbf1f]"></span>
                            <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Innovation Challenge 2026</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white"
                        >
                            Problem <span className="text-gradient">Statements</span>
                        </motion.h1>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="flex items-center justify-center gap-4 text-on-surface-variant font-medium text-sm md:text-base mb-8"
                        >
                            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">11 Domains</span>
                            <span className="text-primary/40">•</span>
                            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">16 Problem Statements</span>
                        </motion.div>
                    </div>

                    {/* Domain Tabs - Wrapped for full visibility */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14 px-2"
                    >
                        {allDomainsWithAll.map((domain, i) => (
                            <motion.button
                                key={domain}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedDomain(domain)}
                                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
                                    selectedDomain === domain 
                                    ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(253,191,31,0.3)]' 
                                    : 'bg-white/5 text-on-surface-variant border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                            >
                                {domain}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Problem Statements Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-20">
                        <AnimatePresence mode="popLayout">
                            {filteredProblems.map((ps, index) => (
                                <motion.div
                                    key={ps.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }}
                                    transition={{ delay: index * 0.05, duration: 0.5, type: "spring", stiffness: 120 }}
                                    whileHover={{ 
                                        y: -8,
                                        rotateX: -1.5,
                                        rotateY: 1.5,
                                        scale: 1.02,
                                        transition: { duration: 0.25 }
                                    }}
                                    style={{ perspective: 1000 }}
                                    className="group relative"
                                >
                                    <div className="h-full p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl flex flex-col transition-all duration-500 group-hover:border-primary/40 group-hover:bg-white/[0.06] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(253,191,31,0.08)]">
                                        
                                        {/* Card Header: ID & Domain */}
                                        <div className="flex justify-between items-start mb-5">
                                            <motion.span 
                                                className="text-primary font-black text-2xl tracking-tighter opacity-40 group-hover:opacity-70 transition-opacity"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {ps.id}
                                            </motion.span>
                                            <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary shrink-0">
                                                {ps.domain}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg sm:text-xl font-bold mb-5 text-white group-hover:text-primary transition-colors duration-300 leading-tight">
                                            {ps.title}
                                        </h3>

                                        {/* Problem Section with heading */}
                                        <div className="mb-6">
                                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/60 mb-2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-xs">report</span>
                                                Problem
                                            </h4>
                                            <p className="text-on-surface-variant text-sm leading-relaxed">
                                                {ps.problem}
                                            </p>
                                        </div>

                                        {/* Expected Solutions - Full Point-wise list */}
                                        <div className="mt-auto pt-5 border-t border-white/5">
                                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/60 mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-xs">lightbulb</span>
                                                Expected Solutions
                                            </h4>
                                            <ul className="space-y-2">
                                                {ps.expectedSolutions.map((sol, i) => (
                                                    <motion.li 
                                                        key={i}
                                                        initial={{ x: -5, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: index * 0.05 + i * 0.05 }}
                                                        className="flex items-start gap-2.5 text-sm text-white/60 group-hover:text-white/75 transition-colors"
                                                    >
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0"></span>
                                                        <span>{sol}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Decorative hover glow */}
                                        <div className="absolute -top-4 -right-4 w-40 h-40 bg-primary/5 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/3 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Registration CTA */}
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-center border border-primary/20 bg-gradient-to-br from-primary/5 via-white/[0.02] to-transparent relative overflow-hidden backdrop-blur-xl"
                    >
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                        
                        <motion.h2 
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-black mb-6 relative z-10"
                        >
                            Ready to <span className="text-gradient">Innovate?</span>
                        </motion.h2>
                        <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-base sm:text-lg relative z-10">
                            Pick your challenge, gather your team, and start building the future today. Registrations are closing soon!
                        </p>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/submit'}
                            className="relative overflow-hidden group bg-gradient-to-br from-primary to-primary-container text-black px-10 sm:px-12 py-4 sm:py-5 rounded-full font-black text-lg sm:text-xl transition-all duration-300 shadow-[0_0_30px_rgba(253,191,31,0.3)] hover:shadow-[0_0_50px_rgba(253,191,31,0.6)] z-10"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <span className="material-symbols-outlined font-black">cloud_upload</span> Submit your Project
                            </span>
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                        </motion.button>
                    </motion.div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};
