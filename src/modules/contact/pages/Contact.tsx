import React from 'react';
import { motion } from 'framer-motion';
import ContactHero from '../components/hero/ContactHero';
import ContactForm from '../components/form/ContactForm';
import ContactInfo, { defaultContactMethods } from '../components/info/ContactInfo';
import LocationMap from '../components/map/LocationMap';
import { CONTACT_CONTENT } from '../utils/constants';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <ContactHero {...CONTACT_CONTENT.hero} />
      
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm onSubmit={handleSubmit} />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <ContactInfo contactMethods={defaultContactMethods} />
            <LocationMap {...CONTACT_CONTENT.map} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 