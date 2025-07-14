import React from 'react';
import {
  ShieldCheckIcon,
  BanknotesIcon as CurrencyDollarIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import type { Feature } from '../../types';

// Define the icon components mapping
const ICON_COMPONENTS = {
  ShieldCheckIcon: ShieldCheckIcon,
  CurrencyDollarIcon: CurrencyDollarIcon,
  MapPinIcon: MapPinIcon,
  StarIcon: StarIcon
} as const;

const FeatureCard: React.FC<Feature> = ({ title, description, icon }) => {
  // Get the icon component from our mapping
  const Icon = ICON_COMPONENTS[icon as keyof typeof ICON_COMPONENTS];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
      <div className="flex justify-center mb-6">
        {Icon ? (
          <Icon className="h-12 w-12 text-primary-600" />
        ) : (
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
            <StarIcon className="h-8 w-8 text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

// Custom comparison function for memo
const arePropsEqual = (prevProps: Feature, nextProps: Feature): boolean => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.id === nextProps.id &&
    prevProps.icon === nextProps.icon
  );
};

// Wrap component with memo using custom comparison
export default React.memo(FeatureCard, arePropsEqual); 