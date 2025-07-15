import { motion } from 'framer-motion';
import { MAIN_SERVICES } from '../../utils/constants';
import ServiceIcon from '../icons/ServiceIcon';

const ServicesList = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {MAIN_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#00B5E2]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00B5E2]/20 transition-colors">
                  <ServiceIcon name={service.icon} className="w-8 h-8 transform group-hover:scale-110 transition-transform" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-cairo font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + (featureIndex * 0.1) }}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <svg className="w-5 h-5 text-[#00B5E2]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList; 