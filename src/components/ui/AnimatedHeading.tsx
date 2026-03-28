import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
    children: React.ReactNode;
    className?: string;
    align?: 'center' | 'left';
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ children, className = "", align = "center" }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
        >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                {children}
            </h2>
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "96px", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className={`h-1.5 bg-primary rounded-full shadow-[0_0_15px_#fdbf1f] ${align === 'center' ? 'mx-auto' : ''}`}
            />
        </motion.div>
    );
};
