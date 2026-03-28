import React from 'react';
import { motion } from 'framer-motion';
import { WHY_PARTICIPATE } from '../data/mockData';
import { AnimatedHeading } from './ui/AnimatedHeading';

export const WhyParticipate: React.FC = () => {
    return (
        <section className="py-32 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <AnimatedHeading>
                    Why <span className="text-primary">Participate?</span>
                </AnimatedHeading>

                <div className="grid md:grid-cols-3 gap-8">
                    {WHY_PARTICIPATE.map((card, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ backgroundColor: "rgba(253, 191, 31, 0.05)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card p-8 rounded-[2rem] group cursor-pointer"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-3xl">{card.icon}</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-on-surface">{card.title}</h4>
                            <p className="text-on-surface-variant">{card.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
