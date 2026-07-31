export interface DashboardStats {
  totalChalets: number;
  activeBookings: number;
  totalRevenue: number;
  occupancyRate: number;
}

export interface RecentBooking {
  id: string;
  chaletName: string;
  customerName: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  amount: number;
}

export interface ChaletOwner {
  id: string;
  name: string;
  phoneNumber: string;
  totalChalets: number;
  activeBookings: number;
  revenue: number;
}

export interface AlertNotification {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  date: string;
  isRead: boolean;
} 