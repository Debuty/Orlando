import React from 'react';
import { MapPinIcon, ShieldCheckIcon, CurrencyDollarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import SectionContainer from '../shared/SectionContainer';
import { useTranslation } from 'react-i18next';

const features = [
  {
    id: 'security',
    title: 'آمن وصيانة',
    description: 'فريق أمني وصيانة متاحة على مدار الساعة',
    Icon: ShieldCheckIcon
  },
  {
    id: 'pricing',
    title: 'أسعار تنافسية',
    description: 'أفضل قيمة مقابل خدمات ومنتجات فاخرة',
    Icon: CurrencyDollarIcon
  },
  {
    id: 'location',
    title: 'موقع متميز',
    description: 'موقع الشاليهات على السواحل الراقية',
    Icon: MapPinIcon
  },
  {
    id: 'services',
    title: 'خدمات متكاملة',
    description: 'خدمات ضيافة متكاملة للتسوق والطبخ والتنظيف',
    Icon: Cog6ToothIcon
  }
];

const WhyOrlandoSection: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <div className="bg-gray-50">
      <SectionContainer
        title={t('whyOrlando.title')}
        subtitle={t('whyOrlando.subtitle')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ id, Icon }) => (
            <div key={id} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(`whyOrlando.features.${id}.title`)}</h3>
              <p className="text-gray-600 text-sm">{t(`whyOrlando.features.${id}.description`)}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default WhyOrlandoSection; 