import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Button from '../shared/Button';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Zoom + Fade */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero-beach-real.jpg)',
          filter: 'brightness(0.8)'
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title with Slide Up + Fade */}
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl font-bold mb-6"
        >
          مرحبًا بك في منتجع أورلاندو
        </motion.h1>

        {/* Subtitle with Slide Up + Fade */}
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl mb-12"
        >
          عطلتك الصيفية تبدأ من هنا
        </motion.p>
        
        {/* Button Container for both buttons */}
        <div className="flex gap-4 justify-center">
          {/* Primary Button - Start Browsing */}
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              delay: 0.7,
              type: "spring",
              stiffness: 300
            }}
            onClick={() => navigate('/chalets')}
            className="bg-[#00B5E2] hover:bg-[#33C3E7] text-white px-8 py-3 rounded-lg text-xl font-bold tracking-wide transition-all duration-200"
          >
            ابدأ التصفح
          </motion.button>

          {/* Secondary Button - Create Account */}
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              delay: 0.8,
              type: "spring",
              stiffness: 300
            }}
            onClick={() => navigate('/signup')}
            className="bg-transparent border-2 border-[#00B5E2] text-[#00B5E2] hover:bg-[#00B5E2] hover:text-white px-8 py-3 rounded-lg text-xl font-bold tracking-wide transition-all duration-200"
          >
            أنشئ حساب الآن
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 