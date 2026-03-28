import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';

const FAQ_ITEMS = [
    {
        q: "What is DevYatra HackFest?",
        a: "DevYatra HackFest is an intense hybrid coding hackathon designed to push your limits, promoting problem-solving, innovation, and real-world application building on modern cloud stacks."
    },
    {
        q: "Who is eligible to participate?",
        a: "The hackathon is open strictly to currently enrolled Undergraduate (UG) students. PG students and working professionals are not eligible."
    },
    {
        q: "How many members can be in a team?",
        a: "A team must strictly consist of 2–3 members. Solo participation is not allowed under any circumstances."
    },
    {
        q: "Are there any tech stack restrictions?",
        a: "No! There runs no fixed tech stack—participants are absolutely free to use any technology or frameworks (React, Python, Node, Flutter, etc.) they are comfortable with."
    },
    {
        q: "Can we use AI Tools like GitHub Copilot?",
        a: "Yes, you can leverage AI tools to assist in your development. However, outright plagiarism of pre-existing complete solutions is strictly forbidden."
    },
    {
        q: "Is there a registration fee?",
        a: "The 1st round (online) is free. For the shortlisted teams, the 2nd round (offline) has a registration fee of ₹300."
    },
    {
        q: "What is the prize pool?",
        a: "The total prize pool is ₹20,000."
    }, {
           q: "Will there be mentorship ",
        a: "Yes! Two structured mentorship sessions will be conducted during Round 1."
    }, {
           q: "How is Round 1 conducted?",
        a: "Round 1 begins with an online kickoff on Google Meet, followed by a continuous 24-hour coding window starting 15 March 2026."
    }, {
           q: "How are teams shortlisted?",
        a: "Based on innovation, technical quality, AWS service usage, and overall feasibility of the solution."
    },{
        q:"what do we need to submit? ",
        a:"Your Round 1 submission must include: (1) PPT Presentation using the official template (PPT/PPTX format, max 15 MB); (2) Data Report — a written description of your project, the problem chosen, your solution approach, and expected impact; (3) Public GitHub Repository URL with all source code; and (4) Deployment/Live Demo URL (optional but strongly recommended). All submissions are made via the Project Submission Portal."
    },{
        q:"How do we submit our project ?  ",
        a:"Go to the Project Submission Portal on this website. Only the Team Leader should submit the form on behalf of the entire team. Fill in your team details, paste your GitHub and deployment URLs, describe your project in the Data Report field, and upload your PPT file using the official template. Download the template from the Submission section on this page."
    },{
    q: "Where is the Submission Portal on this website?",
    a: "Currently, we are in the registration phase, so the submission portal is not visible. The portal will automatically appear on the website once the hackathon officially starts and the submission phase begins."
  },
  {
    q: "Where can I find the problem statements?",
    a: "The problem statements are currently under wraps! They will be revealed and published on the website exactly two days before the hackathon begins so everyone has a fair start."
  }
];

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 px-6 relative z-10" id="faq">
            <div className="max-w-4xl mx-auto">
                <AnimatedHeading>
                    Frequently Asked <span className="text-primary">Questions</span>
                </AnimatedHeading>

                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, idx) => {
                        const isOpen = openIndex === idx;

                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`glass-card rounded-2xl overflow-hidden border transition-colors ${isOpen ? 'border-primary/40 bg-white/[0.04]' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
                            >
                                <button 
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full text-left px-8 py-6 flex justify-between items-center outline-none"
                                >
                                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-on-surface'}`}>
                                        {item.q}
                                    </span>
                                    <motion.span 
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        className={`material-symbols-outlined transition-colors ${isOpen ? 'text-primary' : 'text-on-surface-variant'}`}
                                    >
                                        keyboard_arrow_down
                                    </motion.span>
                                </button>
                                
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-8 pb-6 pt-0"
                                        >
                                            <div className="w-full h-px bg-white/5 mb-6"></div>
                                            <p className="text-on-surface-variant leading-relaxed">
                                                {item.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
