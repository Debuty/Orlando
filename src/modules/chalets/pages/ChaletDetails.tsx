import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ChaletInfo } from '../types';
import BookingForm from '../../booking/components/form/BookingForm';
import type { BookingFormData } from '../../booking/types';

const ChaletDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock data - replace with actual API call
  const [chaletInfo] = useState<ChaletInfo>({
    id: id || '',
    name: 'شاليه البحر الأزرق',
    price: 850,
    rating: 4.5,
    images: ['/images/blue-diamond-chalet.jpg'],
    description: 'شاليه فاخر مطل على البحر مع مسبح خاص وإطلالة خلابة',
    amenities: ['مسبح خاص', 'إطلالة على البحر', 'مطبخ مجهز', 'واي فاي', 'موقف سيارات'],
    capacity: 6,
    bookings: [
      {
        checkIn: '2024-03-20',
        checkOut: '2024-03-22',
        status: 'confirmed'
      }
    ]
  });

  const handleBookingSubmit = async (formData: BookingFormData) => {
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock booking ID
      const bookingId = 'BK' + Date.now();
      
      // Navigate to confirmation page
      navigate(`/booking/${bookingId}/confirmation`);
    } catch (error) {
      console.error('Error creating booking:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chalet Details */}
        <div className="lg:col-span-2">
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
              <h3 className="text-xl font-semibold mb-3">وصف الشاليه</h3>
              <p className="text-gray-600">{chaletInfo.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">المميزات</h3>
              <div className="grid grid-cols-2 gap-3">
                {chaletInfo.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00B5E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Calendar */}
            <div>
              <h3 className="text-xl font-semibold mb-3">الحجوزات الحالية</h3>
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
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <BookingForm
            chaletId={chaletInfo.id}
            pricePerNight={chaletInfo.price}
            onSubmit={handleBookingSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ChaletDetails; 