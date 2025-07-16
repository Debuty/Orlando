import { useParams } from 'react-router-dom';
import { MOCK_CHALETS } from '../utils/constants';
import { motion } from 'framer-motion';

const ChaletDetails = () => {
  const { id } = useParams<{ id: string }>();
  // Convert both IDs to strings for comparison
  const chalet = MOCK_CHALETS.find(c => String(c.id) === String(id));

  if (!chalet) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" dir="rtl">
        <h1 className="text-2xl font-cairo text-gray-900">عذراً، لم يتم العثور على الشاليه</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="relative h-96">
          <img
            src={chalet.images[0]}
            alt={chalet.name}
            className="w-full h-full object-cover"
          />
          {chalet.rating && (
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg text-lg font-cairo">
              ⭐️ {chalet.rating}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-cairo font-bold text-gray-900">{chalet.name}</h1>
            <div className="text-2xl font-cairo text-[#00B5E2] font-semibold">
              {chalet.price} ريال / ليلة
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-6">{chalet.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <span>👥</span>
              <span>السعة: {chalet.capacity} أشخاص</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>📍</span>
              <span>الموقع: {chalet.location}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-cairo font-semibold mb-3">المميزات</h2>
            <div className="flex flex-wrap gap-2">
              {chalet.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-[#00B5E2]/5 text-[#00B5E2] px-3 py-2 rounded-lg text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <button
            className="w-full bg-[#00B5E2] hover:bg-[#33C3E7] text-white font-medium py-3 px-6 rounded-lg transition-colors text-lg"
          >
            احجز الآن
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChaletDetails; 