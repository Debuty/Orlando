import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Variants, Transition } from 'framer-motion';
import { motion } from 'framer-motion';

type AnimationType = {
  initial: Record<string, number>;
  animate: Record<string, number>;
  transition: Transition;
};

const backgroundAnimation: AnimationType = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 1.5, ease: "easeOut" }
};

const textAnimation: AnimationType = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8 }
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string): void => {
    navigate(path);
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Zoom + Fade */}
      <motion.div 
        initial={backgroundAnimation.initial}
        animate={backgroundAnimation.animate}
        transition={backgroundAnimation.transition}
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
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={{ ...textAnimation.transition, delay: 0.3 }}
          className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.75rem] font-medium mb-6 font-cairo leading-relaxed"
        >
          مرحبًا بك في منتجع أورلاندو
        </motion.h1>

        {/* Subtitle with Slide Up + Fade */}
        {/* <motion.p 
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={{ ...textAnimation.transition, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white/75"
        >
          عطلتك الصيفية تبدأ من هنا
        </motion.p> */}
        
        {/* Button Container for both buttons */}
        <div className="flex gap-2 sm:gap-4 justify-center">
          {/* Primary Button - Start Browsing */}
          <button
            onClick={() => handleNavigation('/chalets')}
            className="bg-[#00B5E2] hover:bg-[#33C3E7] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg text-base sm:text-lg md:text-xl font-bold tracking-wide transition-all duration-200"
          >
            ابدأ التصفح
          </button>

          {/* Secondary Button - Create Account */}
          <button
            onClick={() => handleNavigation('/signup')}
            className="bg-transparent border-2 border-[#00B5E2] text-white hover:bg-[#00B5E2] hover:text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg text-base sm:text-lg md:text-xl font-bold tracking-wide transition-all duration-200"
          >
            أنشئ حساب الآن
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 