import React from 'react';

const PromoVideoSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: 'url(/images/wave-pattern.jpg)'
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="relative aspect-video bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl overflow-hidden flex items-center justify-center group">
          {/* Video Thumbnail */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: 'url(/images/beach-aerial.jpg)',
              opacity: 0.6
            }}
          />
          
          {/* Play Button */}
          <button
            className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            aria-label="Play video"
          >
            <svg
              className="w-10 h-10 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoVideoSection; 