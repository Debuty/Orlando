import React, { useMemo } from 'react';
import SectionContainer from '../shared/SectionContainer';
import FeatureCard from './FeatureCard';
import { HOME_CONTENT } from '../../utils/constants';

const WhyOrlandoSection: React.FC = () => {
  const { title, subtitle, features } = HOME_CONTENT.whyOrlando;

  // Memoize the features grid to prevent unnecessary re-renders
  const featuresGrid = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          id={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  ), [features]);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
        style={{
          backgroundImage: 'url(/images/city-aerial.jpg)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <SectionContainer title={title} subtitle={subtitle}>
          {featuresGrid}
        </SectionContainer>
      </div>
    </section>
  );
};

// Memoize the entire section since it's static
export default React.memo(WhyOrlandoSection); 