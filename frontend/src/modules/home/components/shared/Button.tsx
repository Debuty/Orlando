import React from 'react';
import type { CTAButton } from '../../types';

const Button: React.FC<CTAButton> = ({ label, onClick, variant = 'primary' }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-bold transition-all duration-300 text-lg';
  const variantStyles = {
    primary: 'bg-yellow-500 hover:bg-yellow-600 text-black',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {label}
    </button>
  );
};

export default Button; 