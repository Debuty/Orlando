import React, { useState } from 'react';
import FAQHero from '../components/hero/FAQHero';
import FAQCategories from '../components/categories/FAQCategories';
import FAQAccordion from '../components/accordion/FAQAccordion';
import { FAQ_CONTENT, FAQ_SECTIONS } from '../utils/constants';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(FAQ_SECTIONS[0].category.id);

  const categories = FAQ_SECTIONS.map(section => section.category);
  const activeSection = FAQ_SECTIONS.find(section => section.category.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50" >
      <FAQHero {...FAQ_CONTENT.hero} />
      
      <div className="container mx-auto px-4 mb-16">
        <FAQCategories
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {activeSection && (
          <FAQAccordion items={activeSection.items} />
        )}
      </div>
    </div>
  );
};

export default FAQ; 