import React from 'react';
import type { SectionProps } from '../../types';

const SectionContainer: React.FC<SectionProps> = ({ title, subtitle, children }) => {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto max-w-[1440px] px-2 sm:px-4">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionContainer; 