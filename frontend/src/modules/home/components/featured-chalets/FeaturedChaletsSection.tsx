import React from 'react';
import { Link } from 'react-router-dom';
import SectionContainer from '../shared/SectionContainer';
import { HOME_CONTENT } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const getImagePath = (id: string) => {
  const imageMap: { [key: string]: string } = {
    '1': '/images/sea-turquoise-chalet.jpg',
    '2': '/images/bright-star-chalet.jpg',
    '3': '/images/blue-diamond-chalet.jpg'
  };
  return imageMap[id] || '/images/chalet-default.jpg';
};

const FeaturedChaletsSection: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <div className="bg-white overflow-hidden">
      <SectionContainer
        title={t('featuredChalets.title')}
        subtitle={t('featuredChalets.subtitle')}
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
                      <h3 className="text-xl font-bold mb-3">{t(`featuredChalets.chalets.${chalet.tag}.name`)}</h3>
                      <p className="text-gray-600"> {t(`featuredChalets.chalets.${chalet.tag}.features`)}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold text-zinc-500">
                          {chalet.price} {chalet.currency}
                          <span className="text-xl font-bold text-zinc-500">{t('featuredChalets.pricePerNight')}</span>
                        </span>
                        <span className="text-gray-400 font-semibold">{t('featuredChalets.viewDetails')}</span>
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