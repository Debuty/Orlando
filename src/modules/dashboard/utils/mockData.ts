import type { DashboardStats, RecentBooking, ChaletOwner, AlertNotification } from "../types";

export const mockStats: DashboardStats = {
  totalChalets: 24,
  activeBookings: 18,
  totalRevenue: 45600,
  occupancyRate: 75
};

export const mockRecentBookings: RecentBooking[] = [
  {
    id: "1",
    chaletName: "شاليه البحر التركوازي",
    customerName: "أحمد محمد",
    checkIn: "2024-07-20",
    checkOut: "2024-07-22",
    status: "confirmed",
    amount: 1200
  },
  {
    id: "2",
    chaletName: "شاليه النجمة المضيئة",
    customerName: "سارة عبدالله",
    checkIn: "2024-07-21",
    checkOut: "2024-07-23",
    status: "pending",
    amount: 900
  },
  {
    id: "3",
    chaletName: "شاليه الماسة الزرقاء",
    customerName: "خالد عمر",
    checkIn: "2024-07-22",
    checkOut: "2024-07-25",
    status: "confirmed",
    amount: 1500
  }
];

export const mockChaletOwners: ChaletOwner[] = [
  {
    id: "1",
    name: "محمد العلي",
    phoneNumber: "0501234567",
    totalChalets: 3,
    activeBookings: 2,
    revenue: 12000
  },
  {
    id: "2",
    name: "فاطمة السعيد",
    phoneNumber: "0507654321",
    totalChalets: 2,
    activeBookings: 1,
    revenue: 8000
  },
  {
    id: "3",
    name: "عبدالله الأحمد",
    phoneNumber: "0509876543",
    totalChalets: 4,
    activeBookings: 3,
    revenue: 15000
  }
];

export const mockAlerts: AlertNotification[] = [
  {
    id: "1",
    type: "warning",
    message: "شاليه البحر التركوازي بحاجة إلى صيانة",
    date: "2024-07-16T09:00:00",
    isRead: false
  },
  {
    id: "2",
    type: "info",
    message: "تم تأكيد 5 حجوزات جديدة",
    date: "2024-07-16T08:30:00",
    isRead: true
  },
  {
    id: "3",
    type: "error",
    message: "فشل في معالجة الدفع للحجز #12345",
    date: "2024-07-16T08:00:00",
    isRead: false
  }
]; 