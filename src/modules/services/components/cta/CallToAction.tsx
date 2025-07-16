import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-cairo font-bold text-gray-900 mb-6"
          >
            استمتع بكل هذه الخدمات وأكثر مع إقامتك في أورلاندو.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-8"
          >
            احجز الآن أو أنشئ حسابك لتجربة لا مثيل لها.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/chalets"
              className="bg-[#00B5E2] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#33C3E7] transition-colors"
            >
              تصفح الشاليهات
            </Link>
            <Link
              to="/signup"
              className="bg-white text-[#00B5E2] border-2 border-[#00B5E2] px-8 py-3 rounded-lg font-bold hover:bg-[#00B5E2]/5 transition-colors"
            >
              أنشئ حسابك
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 