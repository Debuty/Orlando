import { motion } from 'framer-motion';
import { useState } from 'react';

interface ChaletDetailsProps {
  chaletId: string;
}

interface ChaletInfo {
  id: string;
  name: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
  amenities: string[];
  bookings: {
    checkIn: string;
    checkOut: string;
    status: 'pending' | 'confirmed' | 'cancelled';
  }[];
}

const ChaletDetails = ({ chaletId }: ChaletDetailsProps) => {
  // Mock data - replace with actual API call
  const [chaletInfo] = useState<ChaletInfo>({
    id: chaletId,
    name: 'شاليه البحر الأزرق',
    price: 850,
    rating: 4.5,
    images: ['/images/blue-diamond-chalet.jpg'],
    description: 'شاليه فاخر مطل على البحر مع مسبح خاص وإطلالة خلابة',
    amenities: ['مسبح خاص', 'إطلالة على البحر', 'مطبخ مجهز', 'واي فاي', 'موقف سيارات'],
    bookings: [
      {
        checkIn: '2024-03-20',
        checkOut: '2024-03-22',
        status: 'confirmed'
      }
    ]
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{chaletInfo.name}</h2>
          <div className="flex items-center mt-2">
            <span className="text-[#00B5E2] font-semibold">
              {chaletInfo.rating} ★
            </span>
          </div>
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold text-[#00B5E2]">
            {chaletInfo.price} ريال
            <span className="text-sm text-gray-600 font-normal">/ليلة</span>
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-6">
        <img
          src={chaletInfo.images[0]}
          alt={chaletInfo.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">الوصف</h3>
        <p className="text-gray-600">{chaletInfo.description}</p>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">المميزات</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {chaletInfo.amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center bg-[#00B5E2]/5 rounded-lg p-3"
            >
              <span className="text-gray-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings */}
      <div>
        <h3 className="text-lg font-semibold mb-2">الحجوزات القادمة</h3>
        <div className="space-y-3">
          {chaletInfo.bookings.map((booking, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="text-gray-600">
                  من: {new Date(booking.checkIn).toLocaleDateString('ar-SA')}
                </p>
                <p className="text-gray-600">
                  إلى: {new Date(booking.checkOut).toLocaleDateString('ar-SA')}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {booking.status === 'confirmed'
                  ? 'مؤكد'
                  : booking.status === 'pending'
                  ? 'قيد الانتظار'
                  : 'ملغي'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChaletDetails; 