import React from 'react';
import { Link } from 'react-router-dom';
import SectionContainer from '../shared/SectionContainer';
import { useTranslation } from 'react-i18next';
import { useGetFeaturedChaletsQuery } from '../../../shared/api/orlandoApi';

const FALLBACK_IMAGE = '/images/chalet-default.jpg';

const FeaturedChaletsSection: React.FC = () => {
  const { t } = useTranslation('home');
  const { data, isLoading, isError } = useGetFeaturedChaletsQuery({ limit: 6 });
  const chalets = data?.items ?? [];

  return (
    <div className="bg-white overflow-hidden">
      <SectionContainer
        title={t('featuredChalets.title')}
        subtitle={t('featuredChalets.subtitle')}
      >
        <div className="relative min-h-[200px]">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-lg bg-gray-100" />
              ))}
            </div>
          )}

          {!isLoading && isError && (
            <p className="text-center text-gray-500 py-8">
              تعذر تحميل الشاليهات المميزة.
            </p>
          )}

          {!isLoading && !isError && chalets.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              لا توجد شاليهات معروضة حالياً.
            </p>
          )}

          {!isLoading && chalets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chalets.map((chalet) => {
                const image = chalet.images?.[0] || FALLBACK_IMAGE;
                const featurePreview = (chalet.features ?? []).slice(0, 3).join(' · ');
                return (
                  <div key={chalet.id} className="relative">
                    <Link to={`/chalets/${chalet.id}`} className="block group">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <div
                          className="h-64 bg-cover bg-center relative bg-gray-100"
                          style={{ backgroundImage: `url(${image})` }}
                        >
                          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3">{chalet.name}</h3>
                          <p className="text-gray-600 line-clamp-2">
                            {featurePreview || chalet.description}
                          </p>
                          <div className="flex justify-between items-center mt-4 gap-2">
                            <span className="text-xl font-bold text-zinc-500">
                              {chalet.price}{' '}
                              <span className="text-base font-semibold">
                                {t('featuredChalets.pricePerNight')}
                              </span>
                            </span>
                            <span className="text-gray-400 font-semibold text-sm shrink-0">
                              {t('featuredChalets.viewDetails')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
};

export default FeaturedChaletsSection;
