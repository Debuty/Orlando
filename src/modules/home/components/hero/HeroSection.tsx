import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[600px] flex items-center justify-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero-beach-real.jpg)',
          filter: 'brightness(0.8)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-6">مرحبًا بك في منتجع أورلاندو</h1>
        <p className="text-2xl mb-12">عطلتك الصيفية تبدأ من هنا</p>
        
        <button
          onClick={() => navigate('/chalets')}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg text-xl font-bold transition-all duration-300"
        >
          ابدأ التصفح
        </button>
      </div>
    </section>
  );
};

export default HeroSection; 