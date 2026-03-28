import React from 'react';
import { motion } from 'framer-motion';
import { TopNavBar } from '../components/TopNavBar';
import { Hero } from '../components/Hero';
import { AboutStats } from '../components/AboutStats';
import { WhyParticipate } from '../components/WhyParticipate';
import { EventPhases } from '../components/EventPhases';
import { Prizes } from '../components/Prizes';
import { Organizer } from '../components/Organizer';
import { RulesAndEligibility } from '../components/RulesAndEligibility';
import { FAQ } from '../components/FAQ';
import { HowToSubmit } from '../components/HowToSubmit';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="dark relative min-h-screen text-on-surface">
      {/* Fixed Animated Glassy Background */}
      <div className="fixed inset-0 z-[0] bg-[#020617] overflow-hidden">
        <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[20%] w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"
        />
        <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] left-[40%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[60px]"></div>
      </div>

      {/* Content wrapper to float above background */}
      <div className="relative z-10 font-body">
        <TopNavBar />
        <Hero />
        <AboutStats />
        <WhyParticipate />
        <EventPhases />
        <Prizes />
        <Organizer />
        <RulesAndEligibility />
        <FAQ />
        <HowToSubmit />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};
