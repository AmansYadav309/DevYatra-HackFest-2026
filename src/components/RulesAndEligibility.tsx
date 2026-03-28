import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';

const rulesData = [
  {
    icon: "school",
    title: "Eligibility",
    items: [
      "Open to currently enrolled Undergraduate (UG) students only",
      "PG students and working professionals are not eligible",
      "Valid student ID / proof of enrollment is required during registration"
    ]
  },
  {
    icon: "gavel",
    title: "General Rules",
    items: [
      "Participants must work on problem statements provided officially",
      "Custom problem statements are not allowed",
      "Teams must consist of 2–3 members (solo participation not allowed)"
    ]
  },
  {
    icon: "code",
    title: "Development Guidelines",
    items: [
      "No fixed tech stack — participants can use any technology (React, Python, Node, Flutter, etc.)",
      "All code must be developed within the 24-hour hackathon window",
      "A public GitHub repository is mandatory"
    ]
  },
  {
    icon: "smart_toy",
    title: "Tools & Conduct",
    items: [
      "AI tools are allowed (e.g., GitHub Copilot, etc.)",
      "No plagiarism — any violation will lead to immediate disqualification",
      "Participants must attend at least one mentorship session"
    ]
  }
];

const submissionReqs = [
  { icon: "bar_chart", text: "Presentation (PPT) (official template)" },
  { icon: "description", text: "Data Report" },
  { icon: "link", text: "GitHub Repository Link" },
  { icon: "language", text: "Deployment Link (optional)" },
  { icon: "videocam", text: "Working Prototype Video" }
];

export const RulesAndEligibility: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-white/[0.02] backdrop-blur-xl border-t border-white/5 relative overflow-hidden" id="rules">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatedHeading>
                    Rules & <span className="text-white">Eligibility</span>
                </AnimatedHeading>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center text-lg text-on-surface-variant max-w-2xl mx-auto mb-16 -mt-10"
                >
                    DevYatra HackFest 2026 Participation Guidelines
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {rulesData.map((rule, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-card p-8 rounded-3xl border-l-[3px] border-primary/40 hover:border-primary transition-colors"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-on-surface">
                                <span className="material-symbols-outlined text-primary text-3xl">{rule.icon}</span>
                                {rule.title}
                            </h3>
                            <ul className="space-y-4">
                                {rule.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary/60 text-sm mt-1">check_circle</span>
                                        <span className="text-on-surface-variant text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-primary/10 border border-primary/30 rounded-3xl p-8 md:p-10 backdrop-blur-sm"
                >
                    <div className="text-center mb-8">
                        <span className="material-symbols-outlined text-5xl text-primary mb-2">inventory_2</span>
                        <h3 className="text-2xl font-black text-on-surface">Submission Requirements</h3>
                        <p className="text-on-surface-variant mt-2 text-sm">All submissions must be made via the official portal and include:</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {submissionReqs.map((req, i) => (
                            <div key={i} className="flex items-center gap-3 bg-black/40 px-4 py-3 rounded-xl border border-white/5">
                                <span className="material-symbols-outlined text-primary/80">{req.icon}</span>
                                <span className="text-sm font-bold text-on-surface-variant">{req.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
