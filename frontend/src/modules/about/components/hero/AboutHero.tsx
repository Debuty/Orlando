import { motion } from 'framer-motion';
import { ABOUT_HERO } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const AboutHero = () => {
  const { t } = useTranslation('about');
  return (
    <section className="relative py-20 overflow-hidden bg-[#00B5E2]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-cairo font-bold text-gray-900 mb-6"
          >
            {t('aboutHero.title')}
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-cairo text-gray-700 mb-8"
          >
            {t('aboutHero.subtitle')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            {t('aboutHero.description')}
          </motion.p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#00B5E2]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#00B5E2]/10 rounded-full translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default AboutHero; 