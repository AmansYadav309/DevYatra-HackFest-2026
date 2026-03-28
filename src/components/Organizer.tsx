import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';
import DevItLogo from '../assets/DEV-IT logo .jpeg';

export const Organizer: React.FC = () => {
    return (
        <section className="py-32 px-6 relative z-10" id="organizers">
            <div className="max-w-7xl mx-auto">
                <AnimatedHeading>
                    Organized by <span className="text-primary">DEV_IT</span>
                    <span className="block text-2xl mt-4 font-bold text-on-surface-variant">Student Forum – KDKCE</span>
                </AnimatedHeading>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 rounded-3xl border border-white/10 md:flex flex-row-reverse gap-12 items-center shadow-[0_0_50px_rgba(253,191,31,0.05)]"
                >
                    <div className="md:w-1/3 flex justify-center mb-10 md:mb-0">
                        {/* Organizer Logo Glow Wrap */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px]"></div>
                            <div className="w-full h-full rounded-full border border-primary/30 flex items-center justify-center p-2 glass-card bg-black inset-shadow-sm overflow-hidden">
                                <img src={DevItLogo} alt="DEV-IT Logo" className="w-full h-full object-cover rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3 space-y-6 text-lg text-on-surface-variant leading-relaxed">
                        <p>
                            <strong className="text-on-surface">DEV-IT Forum</strong> is a student-driven technical community under the Department of Information Technology at K.D.K. College of Engineering. The forum is dedicated to fostering innovation, collaboration, and practical learning among students through various technical and cultural initiatives.
                        </p>
                        <p>
                            DEV-IT regularly organizes workshops, hackathons, coding events, and technical sessions to help students enhance their skills and gain real-world experience in modern technologies. The forum aims to build a strong developer community where students can learn, create, and grow together.
                        </p>
                        <p>
                            With a focus on creativity, problem-solving, and teamwork, DEV-IT provides a platform for students to showcase their talents and transform ideas into impactful solutions.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
