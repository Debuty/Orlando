import { motion } from 'framer-motion';
import { SERVICES_HERO } from '../../utils/constants';

const ServicesHero = () => {
  return (
    <section className="relative h-[500px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/services-hero.jpg)' }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-cairo font-bold mb-6"
        >
          {SERVICES_HERO.title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl max-w-2xl"
        >
          {SERVICES_HERO.subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesHero; 