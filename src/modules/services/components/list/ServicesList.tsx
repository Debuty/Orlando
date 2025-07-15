import { motion } from 'framer-motion';
import { MAIN_SERVICES } from '../../utils/constants';
import ServiceIcon from '../icons/ServiceIcon';

const ServicesList = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-cairo font-bold text-center mb-4"
        >
          الخدمات الأساسية لدينا
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-center mb-12"
        >
          كل ما تحتاجه لإقامة لا تُنسى
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {MAIN_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-[#00B5E2]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ServiceIcon name={service.icon} className="w-8 h-8 text-[#00B5E2]" />
              </div>
              
              <h3 className="text-lg font-cairo font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList; 