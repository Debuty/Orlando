import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  content: string | string[];
}

interface ContactInfoProps {
  contactMethods: ContactMethod[];
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contactMethods }) => {
  const { t } = useTranslation('contact');
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-cairo font-semibold mb-6">{t('info.title')}</h2>
      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="text-[#00B5E2] p-3 bg-[#00B5E2]/5 rounded-lg">
              {method.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{method.title}</h3>
              {Array.isArray(method.content) ? (
                method.content.map((line, i) => (
                  <p key={i} className="text-gray-600">{line}</p>
                ))
              ) : (
                <p className="text-gray-600">{method.content}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const defaultContactMethods: ContactMethod[] = [
  {
    icon: <FaPhone className="text-xl" />,
    title: 'Phone',
    content: '+1 234 567 8900'
  },
  {
    icon: <FaWhatsapp className="text-xl" />,
    title: 'WhatsApp',
    content: '+1 234 567 8900'
  },
  {
    icon: <FaEnvelope className="text-xl" />,
    title: 'Email',
    content: 'info@orlando.com'
  },
  {
    icon: <FaMapMarkerAlt className="text-xl" />,
    title: 'Address',
    content: '123 Orlando Street, FL 32801'
  },
  {
    icon: <FaClock className="text-xl" />,
    title: 'Hours',
    content: [
      'Mon-Fri: 9:00 AM - 6:00 PM',
      'Sat-Sun: 10:00 AM - 4:00 PM'
    ]
  }
];

export default ContactInfo; 