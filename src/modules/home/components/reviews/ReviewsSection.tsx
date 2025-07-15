import React from 'react';
import SectionContainer from '../shared/SectionContainer';
import type { Review } from '../../types';
import { HOME_CONTENT } from '../../utils/constants';

const ReviewsSection: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <SectionContainer
        title="آراء عملائنا"
        subtitle="ماذا يقول عملائنا عن تجربتهم معنا"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOME_CONTENT.reviews.testimonials.map((review) => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{review.name}</h3>
                <p className="text-blue-800 font-semibold mb-4">{review.title}</p>
                <p className="text-gray-600">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default ReviewsSection; 