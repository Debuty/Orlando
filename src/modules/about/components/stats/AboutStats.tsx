import { motion } from 'framer-motion';
import { ABOUT_STATS } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const AboutStats = () => {
  const { t } = useTranslation('about');
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {ABOUT_STATS.map((stat, index) => (
            <motion.div
              key={stat.tag}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-2">
                <span className="text-4xl font-cairo font-bold text-[#00B5E2]">
                  {t(`stats.${stat.tag}.value`)}
                </span>
              </div>
              <p className="text-lg text-gray-600">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats; 