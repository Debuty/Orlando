import React from 'react';
import { useSelector } from 'react-redux';
import SectionContainer from '../shared/SectionContainer';
import ReviewCard from './ReviewCard';
import { HOME_CONTENT } from '../../utils/constants';
import type { RootState } from '../../../../store';
import type { Review } from '../../types';

const ReviewsSection: React.FC = () => {
  const { title, subtitle } = HOME_CONTENT.reviews;
  const reviews = useSelector((state: RootState) => state.home.reviews);

  return (
    <section className="relative py-16 bg-gray-50">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5"
        style={{
          backgroundImage: 'url(/images/palm-pattern.jpg)',
          backgroundSize: '200px'
        }}
      />
      
      <div className="relative z-10">
        <SectionContainer title={title} subtitle={subtitle}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review: Review) => (
              <ReviewCard
                key={review.id}
                {...review}
              />
            ))}
          </div>
        </SectionContainer>
      </div>
    </section>
  );
};

export default ReviewsSection; 