import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  content: string | string[];
}

interface ContactInfoProps {
  contactMethods: ContactMethod[];
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contactMethods }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-cairo font-semibold mb-6">معلومات التواصل</h2>
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
    title: 'اتصل بنا',
    content: '+966 123 456 789'
  },
  {
    icon: <FaWhatsapp className="text-xl" />,
    title: 'واتساب',
    content: '+966 123 456 789'
  },
  {
    icon: <FaEnvelope className="text-xl" />,
    title: 'البريد الإلكتروني',
    content: 'info@orlando-resort.com'
  },
  {
    icon: <FaMapMarkerAlt className="text-xl" />,
    title: 'العنوان',
    content: 'المملكة العربية السعودية، المنطقة الشرقية'
  },
  {
    icon: <FaClock className="text-xl" />,
    title: 'ساعات العمل',
    content: [
      'السبت - الخميس: 9:00 صباحاً - 10:00 مساءً',
      'الجمعة: 2:00 مساءً - 10:00 مساءً'
    ]
  }
];

export default ContactInfo; 