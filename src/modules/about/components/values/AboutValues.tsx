import { motion } from 'framer-motion';
import { ABOUT_VALUES } from '../../utils/constants';

const ValueIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'quality-star':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-125">
          <path d="M12 2L14.6 7.4L20.5 8.2L16.25 12.3L17.2 18.2L12 15.4L6.8 18.2L7.75 12.3L3.5 8.2L9.4 7.4L12 2Z" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'comfort-bed':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-125">
          <path d="M3 18V8C3 6.89543 3.89543 6 5 6H19C20.1046 6 21 6.89543 21 8V18" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M2 18H22" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 10H20V14H4V10Z" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'privacy-shield':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-125">
          <path d="M12 2L3 7V11C3 15.9706 7.02944 20 12 20C16.9706 20 21 15.9706 21 11V7L12 2Z" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V14" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 11H15" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'innovation-bulb':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-125">
          <path d="M12 2V4" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 16C9.23858 16 7 13.7614 7 11C7 8.23858 9.23858 6 12 6C14.7614 6 17 8.23858 17 11C17 13.7614 14.7614 16 12 16Z" stroke="#00B5E2" strokeWidth="2"/>
          <path d="M10 20H14" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 16V18" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 16V18" stroke="#00B5E2" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
};

const AboutValues = () => {
  return (
    <section className="py-16 bg-[#00B5E2]/5">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-cairo font-bold text-gray-900 text-center mb-12"
        >
          قيمنا
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {ABOUT_VALUES.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-20 h-20 bg-[#00B5E2]/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-[#00B5E2]/20 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 transform group-hover:scale-110 transition-transform">
                  <ValueIcon name={value.icon} />
                </div>
              </div>
              
              <h3 className="text-xl font-cairo font-bold text-gray-900 text-center mb-3">
                {value.title}
              </h3>
              
              <p className="text-gray-600 text-center leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues; 