import React from 'react';
import HeroSection from '../components/hero/HeroSection';
import WhyOrlandoSection from '../components/why-orlando/WhyOrlandoSection';
import FeaturedChaletsSection from '../components/featured-chalets/FeaturedChaletsSection';
import PromoVideoSection from '../components/promo-video/PromoVideoSection';
import ReviewsSection from '../components/reviews/ReviewsSection';
import CTASection from '../components/cta/CTASection';
import HealthCheckButton from '../components/HealthCheckButton';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <HealthCheckButton />
      <WhyOrlandoSection />
      <FeaturedChaletsSection />
      <PromoVideoSection />
      <ReviewsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
