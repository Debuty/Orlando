import React from 'react';
import type { Chalet } from '../../types';

const defaultImages = {
  'blue-diamond': '/images/blue-diamond-chalet.jpg',
  'sea-turquoise': '/images/sea-turquoise-chalet.jpg',
  'bright-star': '/images/bright-star-chalet.jpg'
};

const ChaletCard: React.FC<Chalet> = ({
  id,
  name,
  englishName,
  features,
  price,
  currency,
  imageUrl
}) => {
  const cardImage = imageUrl || defaultImages[id as keyof typeof defaultImages] || '/images/chalet-default.jpg';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div 
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${cardImage})` }}
      >
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{englishName}</p>
        <p className="text-gray-500 mb-4">{features}</p>
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            {price} {currency}
            <span className="text-sm text-gray-500">/ليلة</span>
          </div>
          <button className="text-primary-600 hover:text-primary-700 font-semibold">
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChaletCard; 