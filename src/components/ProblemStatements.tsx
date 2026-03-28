import React from 'react';
import { motion } from 'framer-motion';
import { PROBLEMS } from '../data/mockData';

export const ProblemStatements: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-white/[0.02] backdrop-blur-xl border-t border-white/5" id="problems">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black tracking-tight mb-4">Problem Statements</h2>
                        <p className="text-on-surface-variant max-w-xl text-lg">Choose a track that excites you and build a solution that transforms industries.</p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2"
                    >
                        <button className="bg-primary text-on-primary-fixed px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">All Tracks</button>
                        {['AI & ML', 'AgriTech', 'HealthTech'].map(track => (
                            <button key={track} className="bg-surface-variant/40 hover:bg-surface-variant transition-colors px-5 py-2 rounded-full font-bold text-sm">
                                {track}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROBLEMS.map((prob, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ y: -5, borderColor: '#fdbf1f' }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="glass-card p-8 rounded-3xl border-t-2 border-primary/20 transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-black uppercase">{prob.track}</span>
                                <span className="material-symbols-outlined text-on-surface-variant">{prob.icon}</span>
                            </div>
                            <h4 className="text-xl font-bold mb-6 text-on-surface">{prob.title}</h4>
                            <p className="text-on-surface-variant mb-6 text-sm">{prob.desc}</p>
                            <a className="text-primary font-bold text-sm flex items-center gap-2" href="#!">
                                Explore Problem <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
