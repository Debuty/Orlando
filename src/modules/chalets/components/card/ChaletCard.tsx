import type { Chalet } from "../../types";
import { motion } from "framer-motion";

interface ChaletCardProps {
  chalet: Chalet;
}

const ChaletCard = ({ chalet }: ChaletCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
    >
      <div className="relative h-48">
        <img
          src={chalet.images[0]}
          alt={chalet.name}
          className="w-full h-full object-cover"
        />
        {chalet.rating && (
          <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-sm font-cairo">
            ⭐️ {chalet.rating}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-cairo text-xl font-semibold mb-2">{chalet.name}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{chalet.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-[#00B5E2] font-cairo font-semibold">
            {chalet.price} ريال / ليلة
          </div>
          <div className="text-gray-500 text-sm">
            👥 {chalet.capacity} أشخاص
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {chalet.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-[#00B5E2]/5 text-[#00B5E2] text-sm px-2 py-1 rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChaletCard; 