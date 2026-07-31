import React from 'react';
import { motion } from 'framer-motion';
import type { FAQCategory } from '../../types';
import { useTranslation } from 'react-i18next';

interface FAQCategoriesProps {
  categories: FAQCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const FAQCategories: React.FC<FAQCategoriesProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const { t } = useTranslation('faq');
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeCategory === category.id
              ? 'bg-[#00B5E2] text-white'
              : 'bg-white text-gray-600 hover:bg-[#00B5E2]/5'
          }`}
        >
          {t(`categories.${category.key}`)}
        </motion.button>
      ))}
    </div>
  );
};

export default FAQCategories; 