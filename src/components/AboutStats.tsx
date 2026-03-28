import React from 'react';
import { motion } from 'framer-motion';
import { HACKATHON_INFO, METRICS } from '../data/mockData';
import { AnimatedHeading } from './ui/AnimatedHeading';

export const AboutStats: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-white/[0.02] backdrop-blur-xl border-t border-white/5  relative overflow-hidden" id="about">
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
                <div className="pr-4 md:pr-0">
                    <AnimatedHeading align="left">
                        <span className="text-primary">About</span> the Event
                    </AnimatedHeading>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                        {HACKATHON_INFO.aboutText}
                    </p>
                    <div className="p-8 glass-card rounded-3xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <span className="text-primary font-bold text-sm block mb-2 tracking-widest uppercase">The Hybrid Edge</span>
                            <p className="text-on-surface leading-snug">Combining the accessibility of virtual building with the high-stakes pressure of a live offline pitch.</p>
                        </div>
                    </div>
                </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {METRICS.map((metric, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card p-10 rounded-3xl border-l-4 border-primary/40 cursor-default"
                        >
                            <span className="text-primary material-symbols-outlined text-4xl mb-4">{metric.icon}</span>
                            <h3 className="text-3xl font-black mb-1">{metric.value}</h3>
                            <p className="text-on-surface-variant font-medium">{metric.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
