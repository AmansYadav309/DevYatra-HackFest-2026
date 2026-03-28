import React from 'react';
import { RollingText } from './ui/RollingText';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black/95 backdrop-blur-2xl border-t border-white/10 w-full pt-16 pb-8 px-8 relative z-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 max-w-screen-2xl mx-auto mb-10 border-b border-white/10 pb-10">
                <div className="flex flex-col gap-3">
                    <span className="text-3xl font-black tracking-tighter text-white">DevYatra</span>
                    <p className="font-headline text-sm text-[#a3aac4] max-w-xs">Connecting student innovators across the globe through 24-hour coding sprints.</p>
                </div>
                
                {/* Site Navigation Links */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold text-sm tracking-widest uppercase mb-1">Explore</span>
                        {['About', 'Timeline', 'Prizes'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm opacity-50">arrow_right</span>
                                <RollingText text={item} />
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold text-sm tracking-widest uppercase mb-1">Information</span>
                        {['Rules', 'FAQ', 'Contact'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm opacity-50">arrow_right</span>
                                <RollingText text={item} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-screen-2xl mx-auto">
                <p className="font-headline text-xs uppercase tracking-[0.1em] text-[#a3aac4]">© 2026 DEV-IT Student Forum KDKCE. All rights reserved.</p>
                <div className="flex gap-8 cursor-pointer">
                    {['Instagram', 'LinkedIn', 'YouTube', 'Discord'].map(social => {
                        const href = social === 'Instagram' ? "https://www.instagram.com/dev_it__?igsh=bDYxNm01NjFzYmpq" : "#!";
                        return (
                            <a key={social} className="font-headline text-xs uppercase tracking-[0.1em] text-[#a3aac4] hover:text-white transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110" href={href} target={social === 'Instagram' ? "_blank" : undefined} rel={social === 'Instagram' ? "noopener noreferrer" : undefined}>
                                <span className="sr-only">{social}</span>
                                <RollingText text={social} hoverColorClass="text-primary" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
};
