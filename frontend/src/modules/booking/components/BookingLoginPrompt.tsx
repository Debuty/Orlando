import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const BookingLoginPrompt = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-900">
        {t('booking.loginRequiredTitle')}
      </h3>
      <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
        {t('booking.loginRequiredMessage')}
      </p>
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="w-full bg-[#00B5E2] hover:bg-[#33C3E7] text-white py-3 rounded-lg font-semibold transition-colors"
      >
        {t('booking.loginToBook')}
      </button>
    </motion.div>
  );
};

export default BookingLoginPrompt;
