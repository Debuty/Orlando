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
  status: string;
  amount: number;
}

export interface AlertNotification {
  id: string;
  type: string;
  message: string;
  date: string;
  isRead: boolean;
}
