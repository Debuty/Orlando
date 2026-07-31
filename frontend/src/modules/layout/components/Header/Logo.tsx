import React from 'react';

export const Logo = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="40" 
      height="40" 
      viewBox="0 0 40 40"
      className="w-10 h-10 md:w-12 md:h-12"
    >
      {/* Modern abstract beach/wave shape */}
      <path 
        d="M8 20C12 16 16 24 20 20C24 16 28 24 32 20"
        stroke="#00B5E2"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path 
        d="M4 28C8 24 12 32 16 28C20 24 24 32 28 28C32 24 36 32 40 28"
        stroke="#33C3E7"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Abstract sun/horizon */}
      <circle
        cx="28"
        cy="12"
        r="4"
        fill="#00B5E2"
        opacity="0.9"
      />
      <path
        d="M12 12L20 12"
        stroke="#33C3E7"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}; 