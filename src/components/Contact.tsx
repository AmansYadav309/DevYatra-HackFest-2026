import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';

export const Contact: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-black/20 backdrop-blur-xl border-t border-white/5 relative z-10" id="contact">
            <div className="max-w-6xl mx-auto">
                <AnimatedHeading>
                    Get in <span className="text-primary">Touch</span>
                </AnimatedHeading>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 rounded-3xl border-l-[4px] border-primary/50 text-center"
                    >
                        <span className="material-symbols-outlined text-5xl text-primary mb-6">support_agent</span>
                        <h3 className="text-2xl font-bold mb-8">Event Coordinators</h3>
                        
                        <div className="space-y-6 text-on-surface-variant">
                            <div>
                                <span className="block text-xs uppercase tracking-widest text-[#a3aac4] mb-1 font-bold">Event Head</span>
                                <span className="text-lg text-on-surface font-semibold block">AMAN YADAV</span>
                                <span className="text-sm block mt-1">+91 8380045733</span>
                                
                            </div>
                            <div>
                                <span className="block text-xs uppercase tracking-widest text-[#a3aac4] mb-1 font-bold">Technical Lead</span>
                                <span className="text-lg text-on-surface font-semibold block">GOSHANK MESHRAM4</span>
                                <span className="text-sm block mt-1">+91 7620032348</span>
                            </div>
                            <div className="pt-6 border-t border-white/10 mt-6 text-sm">
                                Feel free to reach out to us for any doubts regarding registration or event tracking.
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 rounded-3xl border-white/10 flex flex-col justify-center"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-center md:text-left">Important Links</h3>
                        
                        <div className="space-y-4">
                            <a href="https://chat.whatsapp.com/CYOdFUn8VbJ44PQd0ouLaf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-xl transition-all group">
                                <div className="w-12 h-12 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">forum</span>
                                </div>
                                <div>
                                    <span className="block font-bold text-on-surface">Join WhatsApp Group</span>
                                    <span className="text-sm text-on-surface-variant">Official updates and Q&A</span>
                                </div>
                            </a>

                            <a href="https://www.instagram.com/dev_it__?igsh=bDYxNm01NjFzYmpq" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-xl transition-all group">
                                <div className="w-12 h-12 rounded-lg bg-[#E1306C]/20 flex items-center justify-center text-[#E1306C] group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">photo_camera</span>
                                </div>
                                <div>
                                    <span className="block font-bold text-on-surface">Follow on Instagram</span>
                                    <span className="text-sm text-on-surface-variant">@devit_kdkce snippets and reels</span>
                                </div>
                            </a>

                            <a href="https://devitkdk.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-xl transition-all group">
                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">language</span>
                                </div>
                                <div>
                                    <span className="block font-bold text-on-surface">DEV_IT Official Website</span>
                                    <span className="text-sm text-on-surface-variant">Learn more about our community</span>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
