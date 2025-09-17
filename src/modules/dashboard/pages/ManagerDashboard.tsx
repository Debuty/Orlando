import { useState, lazy, Suspense } from "react";
import { HiOutlineHome, HiOutlineCalendar, HiOutlineCash, HiOutlineChartBar } from "react-icons/hi";
import StatsCard from "../components/stats/StatsCard";
import { mockStats, mockRecentBookings, mockAlerts } from "../utils/mockData";

// Lazy load components
const RecentBookings = lazy(() => import("../components/bookings/RecentBookings"));
const AlertsList = lazy(() => import("../components/alerts/AlertsList"));
const StatisticsCharts = lazy(() => import("../components/stats/StatisticsCharts"));

const LoadingPlaceholder = () => (
  <div className="w-full h-32 bg-gray-100 rounded-lg animate-pulse" />
);

const ManagerDashboard = () => {
  const [alerts, setAlerts] = useState(mockAlerts);

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('ar-SA')} ريال`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="mt-1 text-gray-600">مرحباً بك في لوحة تحكم مدير القرية</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="إجمالي الشاليهات"
          value={mockStats.totalChalets}
          icon={<HiOutlineHome className="w-6 h-6" />}
        />
        <StatsCard
          title="الحجوزات النشطة"
          value={mockStats.activeBookings}
          icon={<HiOutlineCalendar className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="الإيرادات"
          value={formatCurrency(mockStats.totalRevenue)}
          icon={<HiOutlineCash className="w-6 h-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="نسبة الإشغال"
          value={`${mockStats.occupancyRate}%`}
          icon={<HiOutlineChartBar className="w-6 h-6" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Statistics Charts */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <StatisticsCharts />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <Suspense fallback={<LoadingPlaceholder />}>
            <RecentBookings bookings={mockRecentBookings} />
          </Suspense>
        </div>

        {/* Alerts */}
        <div>
          <Suspense fallback={<LoadingPlaceholder />}>
            <AlertsList alerts={alerts} onMarkAsRead={handleMarkAsRead} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard; 