import { forwardRef } from "react";
import type { Chalet } from "../../types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "/images/chalet-default.jpg";

interface ChaletCardProps {
  chalet: Chalet;
}

const ChaletCard = forwardRef<HTMLDivElement, ChaletCardProps>(
  ({ chalet }, ref) => {
    const image = chalet.images?.[0] || FALLBACK_IMAGE;
    const features = chalet.features ?? [];

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
      >
        <Link to={`/chalets/${chalet.id}`} className="block">
          <div className="relative h-48">
            <img
              src={image}
              alt={chalet.name}
              className="w-full h-full object-cover bg-gray-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
            {chalet.rating != null && chalet.rating > 0 && (
              <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-sm font-cairo">
                ⭐️ {chalet.rating}
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-cairo text-xl font-semibold mb-2">
              {chalet.name}
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-2">
              {chalet.description}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="text-[#00B5E2] font-cairo font-semibold">
                {chalet.price} ريال / ليلة
              </div>
              <div className="text-gray-500 text-sm">
                👥 {chalet.capacity} أشخاص
              </div>
            </div>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="bg-[#00B5E2]/5 text-[#00B5E2] text-sm px-2 py-1 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            <span className="block w-full bg-[#00B5E2] hover:bg-[#33C3E7] text-white font-medium py-2 px-4 rounded-lg transition-colors text-center">
              عرض التفاصيل
            </span>
          </div>
        </Link>
      </motion.div>
    );
  }
);

ChaletCard.displayName = "ChaletCard";

export default ChaletCard;
