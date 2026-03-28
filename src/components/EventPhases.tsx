import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';

const TIMELINE_NODES = [
    { id: 'reg-open', label: 'Registration Open', date: 'Now', details: 'Registration is currently open for all eligible students.' },
    { id: 'reg-close', label: 'Registration Closes', date: '4 April 2026', details: 'Last day to register your team. No late entries accepted.' },
    { id: 'round-1', label: 'Round 1', date: '4-5 April 2026', details: 'Online 24-Hour Hackathon Phase.' },
    { id: 'round-2', label: 'Round 2', date: '8 April 2026', details: 'Offline Finals at KDKCE Nagpur  Campus.' }
];

export const EventPhases: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <section className="py-32 px-6 bg-black/20 backdrop-blur-3xl border-y border-white/5 relative overflow-hidden" id="timeline">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 font-body">
                <AnimatedHeading>
                    Event <span className="text-primary">Rounds</span>
                </AnimatedHeading>
                <p className="text-center text-on-surface-variant max-w-2xl mx-auto mb-16 -mt-10 font-medium">
                    Online 24h coding marathon <span className="text-primary font-bold">→</span> Offline presentation finals
                </p>

                {/* 2-Column Cards Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-24">
                    {/* ROUND 1 CARD */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col relative group hover:border-primary/50 transition-colors duration-500"
                    >
                        {/* Header Block */}
                        <div className="p-8 border-b border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px]"></div>
                            <div className="flex justify-between items-start relative z-10 w-full">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="material-symbols-outlined text-primary text-3xl">laptop_mac</span>
                                        <h3 className="text-2xl font-black text-on-surface tracking-tight">Round 1: Online Hackathon</h3>
                                    </div>
                                    <p className="text-sm text-on-surface-variant font-medium">4-5 April 2026 · 24-Hour Online Coding Challenge</p>
                                </div>
                                <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(34,197,94,0.3)] whitespace-nowrap ml-4">FREE</span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-8 flex-grow">
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0 shadow-[0_0_8px_#f97316]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed">🌐 Online inauguration & problem statement reveal via Google Meet</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0 shadow-[0_0_8px_#f97316]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed">⏱ 24-hour continuous development window begins immediately after</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0 shadow-[0_0_8px_#f97316]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed">🧑‍🏫 2 structured mentorship sessions to support your team</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0 shadow-[0_0_8px_#f97316]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed font-bold text-white">✅ Shortlisted teams will advance to Round 2</span>
                                </li>
                            </ul>

                            {/* Nested Checklist Box */}
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-6">
                                <h4 className="text-xs tracking-[0.15em] uppercase text-primary font-bold mb-4">Round 1 Submission Checklist</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                                        <span className="text-green-500 font-bold mt-[-2px]">✓</span> 
                                        <span><strong>PPT Presentation</strong> — using the official template (PPT/PPTX only)</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                                        <span className="text-green-500 font-bold mt-[-2px]">✓</span> 
                                        <span><strong>Data Report</strong> — project description, problem statement chosen, approach & findings</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                                        <span className="text-green-500 font-bold mt-[-2px]">✓</span> 
                                        <span><strong>GitHub Repository URL</strong> — public repo with all source code</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                                        <span className="text-white/40 font-bold mt-[-2px]">○</span> 
                                        <span><strong>Deployment URL</strong> — live demo / hosted link (optional but recommended)</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                                        <span className="text-green-500 font-bold mt-[-2px]">✓</span> 
                                        <span><strong>Video Submission</strong> — working prototype video</span>
                                    </li>
                                </ul>
                                <a href="#submission" className="inline-flex items-center gap-2 mt-6 text-primary hover:text-white transition-colors text-sm font-bold group/link">
                                    All items to be submitted via the Project Submission Portal <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Footer Banner */}
                        <div className="bg-green-500/10 border-t border-green-500/20 p-5 text-center mt-auto">
                            <span className="text-green-400 font-bold text-sm tracking-wide flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">check_circle</span> Round 1 is completely FREE to participate
                            </span>
                        </div>
                    </motion.div>

                    {/* ROUND 2 CARD */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col relative group hover:border-amber-500/50 transition-colors duration-500"
                    >
                        {/* Header Block */}
                        <div className="p-8 border-b border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-[50px]"></div>
                            <div className="flex justify-between items-start relative z-10 w-full">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="material-symbols-outlined text-amber-500 text-3xl">emoji_events</span>
                                        <h3 className="text-2xl font-black text-on-surface tracking-tight">Round 2: Offline Final Round</h3>
                                    </div>
                                    <p className="text-sm text-on-surface-variant font-medium">8 April 2026 · KDKCE Nagpur Campus</p>
                                </div>
                                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.3)] whitespace-nowrap ml-4">PAID</span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-8 flex-grow">
                            <ul className="space-y-5 mb-8">
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_#f59e0b]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed">🏆 Shortlisted teams from Round 1 present their projects offline</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_#f59e0b]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed">⏱ Each team gets 10 minutes total: 5 min pitch + 5 min Q&A</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_#f59e0b]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed">📊 Presentation must highlight: Problem solving, Technical execution, Scalability & future potential</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_#f59e0b]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed">🖥 Live demos strongly encouraged</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_#f59e0b]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed">⚖ Judges evaluate: Impact, Implementation quality, Originality</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_#f59e0b]"></span>
                                    <span className="text-on-surface-variant text-sm leading-relaxed font-bold text-white">🏅 Winners announced; Trophies + Certificates awarded</span>
                                </li>
                            </ul>
                        </div>

                        {/* Footer Pill/Banner */}
                        <div className="bg-amber-500/10 border-t border-amber-500/20 p-5 text-center flex justify-center items-center gap-2 mt-auto">
                            <span className="material-symbols-outlined text-amber-500 text-lg">local_offer</span>
                            <span className="text-amber-400 font-bold text-sm tracking-wide">Entry Fee: ₹300 per team</span>
                        </div>
                    </motion.div>
                </div>

                {/* Horizontal Timeline Strip */}
                <div className="max-w-4xl mx-auto relative pt-8 pb-16">
                    {/* The track */}
                    <div className="absolute top-[3.25rem] left-[10%] w-[80%] h-1 bg-white/10 rounded-full hidden md:block"></div>
                    
                    {/* The glowing progress line (up to Registration started / Node 0) */}
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "10%" }} 
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute top-[3.25rem] left-[10%] h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(253,191,31,0.8)] hidden md:block"
                    ></motion.div>

                    <div className="relative flex flex-col md:flex-row justify-between w-full h-full pb-8 md:pb-0 gap-12 md:gap-0">
                        {TIMELINE_NODES.map((node, index) => {
                            const isActive = index === 0; // Registration started point
                            
                            return (
                                <div 
                                    key={node.id} 
                                    className="flex flex-col items-center relative group w-full md:w-1/4"
                                    onMouseEnter={() => setHoveredNode(node.id)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                >
                                    {/* Node Dot */}
                                    <div className={`w-6 h-6 rounded-full border-4 mb-4 mt-8 transition-colors duration-300 z-10 mx-auto
                                        ${isActive 
                                            ? 'bg-primary border-[#0f172a] shadow-[0_0_20px_rgba(253,191,31,1)]' 
                                            : 'bg-[#0f172a] border-white/20 group-hover:bg-primary/50 group-hover:border-primary/50'
                                        }`}
                                    ></div>
                                    
                                    {/* Node Label */}
                                    <h5 className={`font-bold text-sm md:text-base text-center transition-colors 
                                        ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-white'}`}
                                    >
                                        {node.label}
                                    </h5>
                                    <span className="text-xs text-on-surface-variant/60 font-mono mt-1 text-center">{node.date}</span>

                                    {/* Hover Tooltip Details */}
                                    <AnimatePresence>
                                        {hoveredNode === node.id && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                className="absolute bottom-full mb-4 w-[200px] left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl z-20 text-center pointer-events-none"
                                            >
                                                <div className="absolute -bottom-2 left-1/2 -ml-2 w-4 h-4 bg-black/90 border-b border-r border-white/10 transform rotate-45"></div>
                                                <span className="text-xs text-white/90 relative z-10 leading-relaxed block">{node.details}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => window.open('https://forms.gle/rB2doC8FYhcFm6g16', '_blank')}
                        className="relative overflow-hidden group bg-gradient-to-br from-primary to-primary-container text-black px-12 py-5 rounded-full font-black text-xl transition-all duration-300 shadow-[0_0_30px_rgba(253,191,31,0.4)] hover:shadow-[0_0_50px_rgba(253,191,31,0.8)] hover:-translate-y-1 active:scale-95">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-black">rocket_launch</span> Register NOW
                        </span>
                        <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                    </button>
                </div>
            </div>
        </section>
    );
};
