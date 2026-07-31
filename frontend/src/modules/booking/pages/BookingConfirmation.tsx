import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import type { BookingConfirmation as BookingConfirmationType } from '../types';

const BookingConfirmation = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState<BookingConfirmationType | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string>('');

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockConfirmation: BookingConfirmationType = {
      booking: {
        id: bookingId || '',
        userId: 'user123',
        chaletId: 'chalet456',
        checkIn: '2024-03-25',
        checkOut: '2024-03-27',
        guestCount: 2,
        totalPrice: 1700,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        qrCode: '',
        bookingCode: 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase()
      },
      paymentStatus: 'success',
      transactionId: 'TXN' + Date.now()
    };

    setConfirmation(mockConfirmation);

    // Generate QR code
    const generateQRCode = async () => {
      try {
        const qrData = JSON.stringify({
          bookingCode: mockConfirmation.booking.bookingCode,
          chaletId: mockConfirmation.booking.chaletId,
          validFrom: mockConfirmation.booking.checkIn,
          validTo: mockConfirmation.booking.checkOut
        });

        const qrImage = await QRCode.toDataURL(qrData, {
          width: 300,
          margin: 2,
          color: {
            dark: '#00B5E2',
            light: '#FFFFFF'
          }
        });

        setQrCodeImage(qrImage);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQRCode();
  }, [bookingId]);

  if (!confirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00B5E2] border-t-transparent"></div>
      </div>
    );
  }

  const { booking } = confirmation;

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">تم تأكيد الحجز!</h1>
          <p className="text-gray-600">شكراً لاختيارك أورلاندو. تم تأكيد حجزك بنجاح.</p>
        </div>

        <div className="border-t border-b py-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-1">رقم الحجز</p>
              <p className="font-semibold">{booking.bookingCode}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">الحالة</p>
              <p className="font-semibold text-green-600">تم التأكيد</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">تاريخ الوصول</p>
              <p className="font-semibold">{new Date(booking.checkIn).toLocaleDateString('ar-SA')}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">تاريخ المغادرة</p>
              <p className="font-semibold">{new Date(booking.checkOut).toLocaleDateString('ar-SA')}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">عدد الضيوف</p>
              <p className="font-semibold">{booking.guestCount} أشخاص</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">المبلغ الإجمالي</p>
              <p className="font-semibold">{booking.totalPrice} ريال</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold mb-4">رمز QR للدخول</h2>
          <p className="text-gray-600 mb-4">
            يرجى إظهار رمز QR عند تسجيل الوصول للدخول إلى الشاليه
          </p>
          <div className="bg-white p-4 rounded-lg inline-block shadow-sm">
            {qrCodeImage && (
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="mx-auto"
                style={{ maxWidth: '200px' }}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              // Download QR code
              const link = document.createElement('a');
              link.href = qrCodeImage;
              link.download = `orlando-booking-${booking.bookingCode}.png`;
              link.click();
            }}
            className="bg-[#00B5E2] text-white px-6 py-2 rounded-lg hover:bg-[#33C3E7] transition-colors"
          >
            تحميل رمز QR
          </button>
          <button
            onClick={() => navigate('/chalets')}
            className="border border-[#00B5E2] text-[#00B5E2] px-6 py-2 rounded-lg hover:bg-[#00B5E2]/5 transition-colors"
          >
            العودة للشاليهات
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation; 