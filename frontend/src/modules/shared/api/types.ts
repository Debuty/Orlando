export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'ADMIN' | 'TENANT';
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

export type Paginated<T> = {
  items: T[];
  pagination: Pagination;
};

export type Chalet = {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  capacity: number;
  rating: number | null;
  features: string[];
  isActive: boolean;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type ChaletDetails = Chalet & {
  bookings: Array<{
    checkIn: string;
    checkOut: string;
    status: string;
  }>;
};

export type ChaletsListParams = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  page?: number;
  perPage?: number;
};

export type ChaletPayload = {
  name: string;
  description: string;
  location: string;
  price: number;
  capacity: number;
  rating?: number | null;
  features?: string[];
  images?: string[];
  isActive?: boolean;
};

export type Booking = {
  id: string;
  userId: string;
  chaletId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  specialRequests?: string;
  totalPrice: number;
  status: string;
  bookingCode: string;
  createdAt: string;
  paymentStatus?: string;
  transactionId?: string;
  qrCode?: {
    id: string;
    token: string;
    status: string;
    validFrom: string;
    validTo: string;
    usedAt: string | null;
  } | null;
  customerName?: string;
  chaletName?: string;
};

export type CreateBookingPayload = {
  chaletId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  specialRequests?: string;
};

export type CreateBookingResponse = {
  booking: Booking;
  paymentStatus: string;
  transactionId: string;
};

export type BookingConfirmationResponse = {
  booking: Booking;
  paymentStatus: string;
  transactionId: string | null;
};

export type BookingsListParams = {
  status?: string;
  chaletId?: string;
  from?: string;
  to?: string;
  page?: number;
  perPage?: number;
};

export type DashboardStats = {
  totalChalets: number;
  activeBookings: number;
  totalRevenue: number;
  occupancyRate: number;
};

export type DashboardCharts = {
  labels: string[];
  revenue: number[];
  bookings: number[];
  occupancy: number[];
};

export type RecentBooking = {
  id: string;
  chaletName: string;
  customerName: string;
  checkIn: string;
  checkOut: string;
  status: string;
  amount: number;
};

export type AlertItem = {
  id: string;
  type: string;
  message: string;
  date: string;
  isRead: boolean;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type QrValidateResponse =
  | {
      valid: true;
      qrCode: {
        id: string;
        token: string;
        status: string;
        usedAt: string | null;
      };
      booking: {
        id: string;
        bookingCode: string;
        checkIn: string;
        checkOut: string;
        guestCount: number;
        customerName: string;
        chaletName: string;
      };
    }
  | {
      valid: false;
      reason: string;
    };
