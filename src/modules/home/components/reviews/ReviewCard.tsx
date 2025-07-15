import React from 'react';
import type { Review } from '../../types';

const ReviewCard: React.FC<Review> = ({
  name,
  title,
  content,
  avatar = '/images/avatar-placeholder.jpg'
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex flex-col items-center text-center">
        <img
          src={avatar}
          alt={name}
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-slate-600 font-semibold mb-4">{title}</p>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );
};

export default ReviewCard; 