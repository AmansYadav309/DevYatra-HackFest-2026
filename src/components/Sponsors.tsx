import React from 'react';
import { motion } from 'framer-motion';

const sponsors = [
  {
    name: 'PSK TECHNOLOGIES PVT. LTD',
    logo: '/sponsorship/psk-technologies.png',
    link: 'https://pskitservices.com/'
  },
  {
    name: 'Amplemine',
    logo: '/sponsorship/apmplemine.jpeg',
    link: '#' // Placeholder
  }
];

export const Sponsors: React.FC = () => {
  return (
    <section id="sponsors" className="relative py-24 pb-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Our Sponsors
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A huge thank you to our amazing sponsors for making DevYatra HackFest possible.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {sponsors.map((sponsor, index) => (
            <motion.a
              key={index}
              href={sponsor.link}
              target={sponsor.link !== '#' ? '_blank' : '_self'}
              rel={sponsor.link !== '#' ? 'noopener noreferrer' : ''}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex justify-center items-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl hover:shadow-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 w-72 h-40 md:w-80 md:h-48 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} Logo`}
                className="max-h-full max-w-full object-contain filter drop-shadow-md rounded-xl"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
