import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingForm from '../../booking/components/form/BookingForm';
import BookingLoginPrompt from '../../booking/components/BookingLoginPrompt';
import type { BookingFormData } from '../../booking/types';
import { useAuth } from '../../auth/hooks/useAuth';
import {
  useCreateBookingMutation,
  useGetChaletByIdQuery,
} from '../../shared/api/orlandoApi';

const FALLBACK_IMAGE = '/images/chalet-default.jpg';

function bookingStatusLabel(status: string) {
  const s = status.toUpperCase();
  if (s === 'CONFIRMED') return { text: 'مؤكد', className: 'bg-green-100 text-green-800' };
  if (s === 'PENDING') return { text: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-800' };
  if (s === 'CANCELLED' || s === 'CANCELED')
    return { text: 'ملغي', className: 'bg-red-100 text-red-800' };
  return { text: status, className: 'bg-gray-100 text-gray-800' };
}

const ChaletDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const [bookingError, setBookingError] = useState<string | null>(null);

  const { data: chalet, isLoading, isError, error } = useGetChaletByIdQuery(id ?? '', {
    skip: !id,
  });
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!chalet) return;
    setBookingError(null);

    try {
      const result = await createBooking({
        chaletId: chalet.id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guestCount: formData.guestCount,
        specialRequests: formData.specialRequests || undefined,
      }).unwrap();

      navigate(`/booking/${result.booking.id}/confirmation`);
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'فشل إنشاء الحجز. حاول مرة أخرى.';
      setBookingError(message);
    }
  };

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-gray-600" dir="rtl">
        معرّف الشاليه غير صالح.
        <div className="mt-4">
          <Link to="/chalets" className="text-[#00B5E2] hover:underline">
            العودة للشاليهات
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 animate-pulse rounded-lg bg-gray-100" />
          <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
        </div>
      </div>
    );
  }

  if (isError || !chalet) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" dir="rtl">
        <p className="text-red-600">
          {(error && 'message' in error && String(error.message)) ||
            'الشاليه غير موجود أو تعذر تحميله.'}
        </p>
        <Link
          to="/chalets"
          className="mt-4 inline-block text-[#00B5E2] hover:underline"
        >
          العودة للشاليهات
        </Link>
      </div>
    );
  }

  const mainImage = chalet.images?.[0] || FALLBACK_IMAGE;
  const features = chalet.features ?? [];
  const bookings = chalet.bookings ?? [];

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{chalet.name}</h2>
                {chalet.location && (
                  <p className="mt-1 text-sm text-gray-500">{chalet.location}</p>
                )}
                {chalet.rating != null && chalet.rating > 0 && (
                  <div className="flex items-center mt-2">
                    <span className="text-[#00B5E2] font-semibold">
                      {chalet.rating} ★
                    </span>
                  </div>
                )}
              </div>
              <div className="text-left shrink-0">
                <p className="text-2xl font-bold text-[#00B5E2]">
                  {chalet.price} جنيه
                  <span className="text-sm text-gray-600 font-normal">/ليلة</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  السعة: {chalet.capacity} أشخاص
                </p>
              </div>
            </div>

            <div className="mb-6">
              <img
                src={mainImage}
                alt={chalet.name}
                className="w-full h-64 object-cover rounded-lg bg-gray-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
              {chalet.images.length > 1 && (
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {chalet.images.slice(1, 5).map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt=""
                      className="h-20 w-full object-cover rounded-md bg-gray-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">وصف الشاليه</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{chalet.description}</p>
            </div>

            {features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">المميزات</h3>
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#00B5E2] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold mb-3">الحجوزات الحالية</h3>
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-sm">لا توجد حجوزات معروضة حالياً.</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking, index) => {
                    const status = bookingStatusLabel(booking.status);
                    return (
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
                          className={`px-3 py-1 rounded-full text-sm ${status.className}`}
                        >
                          {status.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          {isGuest ? (
            <BookingLoginPrompt />
          ) : (
            <BookingForm
              chaletId={chalet.id}
              pricePerNight={chalet.price}
              capacity={chalet.capacity}
              isLoading={isBooking}
              error={bookingError}
              onSubmit={handleBookingSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChaletDetails;
