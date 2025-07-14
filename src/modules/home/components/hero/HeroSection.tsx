import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import { HOME_CONTENT } from '../../utils/constants';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { welcomeText, subText, buttons } = HOME_CONTENT.hero;

  const handleBrowse = () => navigate('/chalets');
  const handleCreateAccount = () => navigate('/auth/register');

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero-beach-real.jpg)',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">{welcomeText}</h1>
        <p className="text-2xl md:text-3xl mb-12 text-shadow-md">{subText}</p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            label={buttons.browse}
            onClick={handleBrowse}
            variant="primary"
          />
          <Button
            label={buttons.createAccount}
            onClick={handleCreateAccount}
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 