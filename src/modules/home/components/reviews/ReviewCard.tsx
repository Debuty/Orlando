import React from 'react';
import type { Review } from '../../types';
import { useTranslation } from 'react-i18next';

const ReviewCard: React.FC<Review> = ({
  tag,
  avatar = '/images/avatar-placeholder.jpg'
}) => {
  const { t } = useTranslation('home');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex flex-col items-center text-center">
        <img
          src={avatar}
          alt={t(`reviews.testimonials.${tag}.name`)}
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />
        <h3 className="text-xl font-bold mb-2">{t(`reviews.testimonials.${tag}.name`)}</h3>
        <p className="text-slate-600 font-semibold mb-4">{t(`reviews.testimonials.${tag}.title`)}</p>
        <p className="text-gray-400">{t(`reviews.testimonials.${tag}.content`)}</p>
      </div>
    </div>
  );
};

export default ReviewCard; 