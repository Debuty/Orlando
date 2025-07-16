import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CHALETS } from '../utils/constants';
import { motion } from 'framer-motion';

const ChaletDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chalet = MOCK_CHALETS.find(c => String(c.id) === String(id));

  const handleBack = () => {
    // Navigate back to chalets page
    navigate('/chalets', { state: { scrollToChaletId: id } });
  };

  if (!chalet) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" dir="rtl">
        <h1 className="text-2xl font-cairo text-gray-900">عذراً، لم يتم العثور على الشاليه</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl" dir="rtl">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#00B5E2] hover:text-[#33C3E7] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transform rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          العودة إلى الشاليهات
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="relative h-72">
          <img
            src={chalet.images[0]}
            alt={chalet.name}
            className="w-full h-full object-cover"
          />
          {chalet.rating && (
            <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-lg text-base font-cairo">
              ⭐️ {chalet.rating}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-2xl font-cairo font-bold text-gray-900">{chalet.name}</h1>
            <div className="text-xl font-cairo text-[#00B5E2] font-semibold">
              {chalet.price} ريال / ليلة
            </div>
          </div>

          <p className="text-gray-600 text-base mb-4">{chalet.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span>👥</span>
              <span>السعة: {chalet.capacity} أشخاص</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>📍</span>
              <span>الموقع: {chalet.location}</span>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-cairo font-semibold mb-2">المميزات</h2>
            <div className="flex flex-wrap gap-2">
              {chalet.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-[#00B5E2]/5 text-[#00B5E2] px-2 py-1 rounded-lg text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <button
            className="w-full bg-[#00B5E2] hover:bg-[#33C3E7] text-white font-medium py-2 px-4 rounded-lg transition-colors text-base"
          >
            احجز الآن
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChaletDetails; 