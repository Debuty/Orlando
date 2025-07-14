import React from 'react';
import type { Review } from '../../types';

const ReviewCard: React.FC<Review> = ({
  name,
  title,
  avatar = '/images/avatar-placeholder.jpg'
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-20 h-20 rounded-full mx-auto object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 italic">{title}</p>
    </div>
  );
};

export default ReviewCard; 