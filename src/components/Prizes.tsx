import React from 'react';
import { motion } from 'framer-motion';
import { PRIZES } from '../data/mockData';
import { AnimatedHeading } from './ui/AnimatedHeading';

export const Prizes: React.FC = () => {
    return (
        <section className="py-32 px-6 relative overflow-hidden" id="prizes">
            <div className="max-w-7xl mx-auto">
                <AnimatedHeading>
                    <span className="text-primary">Prizes</span>
                </AnimatedHeading>

                <div className="grid md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto mb-16">
                    {PRIZES.map((prize, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className={`glass-card rounded-3xl border-2 flex flex-col items-center justify-start pt-12 pb-8 px-6 text-center transition-transform hover:scale-105 relative ${prize.border} ${prize.bg}`}
                        >
                            {/* Inner glow for champion */}
                            {i === 1 && <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/20 to-transparent rounded-t-3xl pointer-events-none"></div>}
                            
                            <span className={`material-symbols-outlined text-6xl mb-6 ${prize.color} drop-shadow-lg`}>{prize.icon}</span>
                            <h3 className={`text-xl font-bold mb-2 uppercase tracking-widest ${prize.color}`}>{prize.place}</h3>
                            <div className="text-4xl font-black text-on-surface mb-6 drop-shadow-md">{prize.amount}</div>
                            <p className="text-on-surface-variant text-sm font-medium">{prize.perks}</p>
                            <p className="text-on-surface-variant text-xs font-normal mt-2">{prize.perks2}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto glass-card border border-white/10 rounded-2xl p-8 mb-12 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 text-primary">
                        <span className="material-symbols-outlined">redeem</span> Consolation Prizes
                    </h3>
                    <p className="text-on-surface-variant text-lg">
                        Swag & goodies for the most creative / best ideas — even if not in top 3!<br/>
                        Also certificates for all round one and round two members.
                    </p>
                </motion.div>

                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-on-surface-variant/60 text-sm max-w-2xl mx-auto"
                >
                    All participants receive Participation Certificates. Shortlisted teams receive Certificates of Merit. Trophies awarded to top 3 teams.
                </motion.p>
            </div>
        </section>
    );
};
