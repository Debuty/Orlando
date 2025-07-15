import React from 'react';
import { motion } from 'framer-motion';

interface FAQHeroProps {
  title: string;
  subtitle: string;
}

const FAQHero: React.FC<FAQHeroProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-[#00B5E2]/5 py-12 mb-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-cairo font-bold text-center mb-4"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-center max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default FAQHero; 