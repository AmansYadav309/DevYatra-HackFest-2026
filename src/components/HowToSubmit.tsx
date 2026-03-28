import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';

const SUBMIT_STEPS = [
    {
        title: "1. PPT PRESENTATION",
        icon: "summarize",
        color: "border-orange-500",
        shadow: "shadow-[0_0_30px_rgba(249,115,22,0.1)]",
        text: <>Prepare your presentation using the <strong>official PPT template</strong>. It must cover the problem, solution, implementation approach, tech stack, and expected impact. Only PPT/PPTX format, max 15MB.</>
    },
    {
        title: "2. DATA REPORT",
        icon: "description",
        color: "border-purple-500",
        shadow: "shadow-[0_0_30px_rgba(168,85,247,0.1)]",
        text: <>A written project description entered in the submission form — include the <strong>problem statement chosen, your solution approach, tech stack used, and expected real-world impact.</strong></>
    },
    {
        title: "3. GITHUB REPOSITORY",
        icon: "folder_zip",
        color: "border-green-500",
        shadow: "shadow-[0_0_30px_rgba(34,197,94,0.1)]",
        text: <>Submit the URL of your <strong>public GitHub repository</strong> containing all source code written during the 24-hour hackathon window. Private repos will not be accepted.</>
    },
    {
        title: "4. DEPLOYMENT URL (Optional)",
        icon: "language",
        color: "border-blue-500",
        shadow: "shadow-[0_0_30px_rgba(59,130,246,0.1)]",
        text: <>If your project is hosted (Vercel, Netlify, AWS, etc.), paste the <strong>live demo link</strong>. Deployed projects score higher during evaluation.</>
    }
];

export const HowToSubmit: React.FC = () => {
    return (
        <section className="py-32 px-6 relative z-10" id="submission">
            <div className="max-w-7xl mx-auto">
                <AnimatedHeading>
                    How to <span className="text-primary">Submit Your Project</span>
                </AnimatedHeading>
                
                <p className="text-center text-on-surface-variant mb-16 max-w-2xl mx-auto">
                    Round 1 submission is done entirely online via the Project Submission Portal
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {SUBMIT_STEPS.map((step, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-card p-8 rounded-2xl border-t-2 ${step.color} ${step.shadow} hover:bg-white/[0.04] transition-colors`}
                        >
                            <span className="material-symbols-outlined text-4xl mb-6 text-on-surface opacity-80">{step.icon}</span>
                            <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-primary">{step.title}</h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                {step.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Submission Process Footer Box */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto glass-card border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-green-500 rounded-l-3xl"></div>
                    
                    <div className="flex gap-6 mb-8 items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold font-mono text-sm shrink-0">i</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 tracking-widest uppercase text-green-400">Submission Process</h3>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                Only the <strong>Team Leader</strong> submits the form on behalf of the entire team. Download the official PPT template, complete all slides, then open the Project Submission Portal and fill in your team details, paste your links, describe your project, and upload the PPT file. Each team submits <strong>only once</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pl-0 md:pl-14">
                        <a 
                            href="/DevYatra-Hackfest-template.pptx"
                            download="DevYatra-Hackfest-template.pptx"
                            className="bg-[#6b46c1] hover:bg-[#805ad5] text-white px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">download</span> Download PPT Template
                        </a>
                        <button 
                            onClick={() => window.open('https://forms.gle/rB2doC8FYhcFm6g16', '_blank')}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                            <span className="material-symbols-outlined text-lg">rocket_launch</span> Register NOW
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
