import React from 'react';
import { motion } from 'framer-motion';

export const RollingText: React.FC<{ text: string, hoverColorClass?: string }> = ({ text, hoverColorClass = "text-primary" }) => {
    return (
        <motion.div 
            className="relative overflow-hidden inline-flex items-center justify-center h-[1.2em] leading-none"
            initial="rest"
            whileHover="hover"
            animate="rest"
        >
            <motion.span 
                variants={{
                    rest: { y: 0 },
                    hover: { y: "-100%" }
                }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                className="block"
            >
                {text}
            </motion.span>
            <motion.span 
                variants={{
                    rest: { y: "100%", position: "absolute", left: 0, right: 0, textAlign: "center" },
                    hover: { y: 0, position: "absolute", left: 0, right: 0, textAlign: "center" }
                }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                className={`block ${hoverColorClass}`}
            >
                {text}
            </motion.span>
        </motion.div>
    );
};
