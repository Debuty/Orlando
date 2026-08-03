import { useState } from 'react';
import { motion } from 'framer-motion';
import type { BookingFormData } from '../../types';

interface BookingFormProps {
  chaletId: string;
  pricePerNight: number;
  capacity: number;
  isLoading?: boolean;
  error?: string | null;
  onSubmit: (data: BookingFormData) => void | Promise<void>;
}

const BookingForm = ({
  chaletId: _chaletId,
  pricePerNight,
  capacity,
  isLoading = false,
  error = null,
  onSubmit,
}: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: '',
    checkOut: '',
    guestCount: 1,
    specialRequests: '',
    totalPrice: pricePerNight,
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const calculateTotalPrice = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return pricePerNight;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights < 1) return pricePerNight;
    return nights * pricePerNight;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalError(null);
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: name === 'guestCount' ? Number(value) || 1 : value,
      };
      if (name === 'checkIn' || name === 'checkOut') {
        newData.totalPrice = calculateTotalPrice(
          name === 'checkIn' ? value : prev.checkIn,
          name === 'checkOut' ? value : prev.checkOut
        );
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.checkIn || !formData.checkOut) {
      setLocalError('يرجى اختيار تواريخ الوصول والمغادرة');
      return;
    }
    if (formData.checkOut <= formData.checkIn) {
      setLocalError('تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول');
      return;
    }
    if (formData.guestCount < 1 || formData.guestCount > capacity) {
      setLocalError(`عدد الضيوف يجب أن يكون بين 1 و ${capacity}`);
      return;
    }

    await onSubmit({  
      ...formData,
      guestCount: Number(formData.guestCount),
      specialRequests: formData.specialRequests?.trim() || undefined,
    });
  };

  const today = new Date().toISOString().split('T')[0];
  const displayError = localError || error;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h3 className="text-xl font-semibold mb-6">احجز الآن</h3>

      {displayError && (
        <div
          role="alert"
          className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {displayError}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="checkIn" className="block text-gray-700 mb-2">
            تاريخ الوصول
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            min={today}
            value={formData.checkIn}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent disabled:opacity-60"
            required
          />
        </div>

        <div>
          <label htmlFor="checkOut" className="block text-gray-700 mb-2">
            تاريخ المغادرة
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            min={formData.checkIn || today}
            value={formData.checkOut}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent disabled:opacity-60"
            required
          />
        </div>

        <div>
          <label htmlFor="guestCount" className="block text-gray-700 mb-2">
            عدد الضيوف (حتى {capacity})
          </label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            min={1}
            max={capacity}
            value={formData.guestCount}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent disabled:opacity-60"
            required
          />
        </div>

        <div>
          <label htmlFor="specialRequests" className="block text-gray-700 mb-2">
            طلبات خاصة
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent h-24 disabled:opacity-60"
            placeholder="أي طلبات أو ملاحظات خاصة..."
          />
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700">السعر لكل ليلة:</span>
            <span className="font-semibold">{pricePerNight} ريال</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">المجموع:</span>
            <span className="font-bold text-[#00B5E2]">
              {formData.totalPrice} ريال
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#00B5E2] text-white py-3 rounded-lg font-semibold hover:bg-[#33C3E7] transition-colors mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? 'جاري تأكيد الحجز...' : 'تأكيد الحجز'}
        </button>
      </div>
    </motion.form>
  );
};

export default BookingForm;
