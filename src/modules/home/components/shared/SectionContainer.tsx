import React from 'react';
import type { SectionProps } from '../../types';

const SectionContainer: React.FC<SectionProps> = ({ title, subtitle, children }) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionContainer; 