import React from 'react';
import { Link } from 'react-router-dom';
import SectionContainer from '../shared/SectionContainer';
import { HOME_CONTENT } from '../../utils/constants';

const getImagePath = (id: string) => {
  const imageMap: { [key: string]: string } = {
    '1': '/images/sea-turquoise-chalet.jpg',
    '2': '/images/bright-star-chalet.jpg',
    '3': '/images/blue-diamond-chalet.jpg'
  };
  return imageMap[id] || '/images/chalet-default.jpg';
};

const FeaturedChaletsSection: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
      <SectionContainer
        title={HOME_CONTENT.featuredChalets.title}
        subtitle={HOME_CONTENT.featuredChalets.subtitle}
      >
        <div className="relative min-h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOME_CONTENT.featuredChalets.chalets.map((chalet) => (
              <div
                key={chalet.id}
                className="relative"
              >
                <Link 
                  to={`/chalets/${String(chalet.id)}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div 
                      className="h-64 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${getImagePath(chalet.id)})` }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">{chalet.name}</h3>
                      <p className="text-gray-600">{chalet.features}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold text-zinc-500">
                          {chalet.price} {chalet.currency}
                          <span className="text-xl font-bold text-zinc-500">/ليلة</span>
                        </span>
                        <span className="text-gray-400 font-semibold">عرض التفاصيل</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default FeaturedChaletsSection; 