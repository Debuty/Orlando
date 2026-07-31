import React from 'react';
import HeroSection from '../components/hero/HeroSection';
import WhyOrlandoSection from '../components/why-orlando/WhyOrlandoSection';
import FeaturedChaletsSection from '../components/featured-chalets/FeaturedChaletsSection';
import PromoVideoSection from '../components/promo-video/PromoVideoSection';
import ReviewsSection from '../components/reviews/ReviewsSection';
import CTASection from '../components/cta/CTASection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhyOrlandoSection />
      <FeaturedChaletsSection />
      <PromoVideoSection />
      <ReviewsSection />
      <CTASection />
    </>
  );
};

export default HomePage; 