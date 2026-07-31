export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guestCount: number;
  specialRequests?: string;
  totalPrice: number;
}

export interface Booking extends BookingFormData {
  id: string;
  userId: string;
  chaletId: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  qrCode: string; // Base64 encoded QR code image
  bookingCode: string; // Unique booking code for QR
}

export interface BookingConfirmation {
  booking: Booking;
  paymentStatus: 'success' | 'failed';
  transactionId: string;
} 