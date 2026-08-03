import { useState, lazy, Suspense } from "react";
import { HiOutlineHome, HiOutlineCalendar, HiOutlineCash, HiOutlineChartBar } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import StatsCard from "../components/stats/StatsCard";
import { mockStats, mockRecentBookings, mockAlerts } from "../utils/mockData";
import CreateChaletForm from "../components/chalets/CreateChaletForm";

const RecentBookings = lazy(() => import("../components/bookings/RecentBookings"));
const AlertsList = lazy(() => import("../components/alerts/AlertsList"));
const StatisticsCharts = lazy(() => import("../components/stats/StatisticsCharts"));

const LoadingPlaceholder = () => (
  <div className="w-full h-32 bg-gray-100 rounded-lg animate-pulse" />
);

const ManagerDashboard = () => {
  const { t } = useTranslation("dashboard");
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showCreateChalet, setShowCreateChalet] = useState(true);

  const handleMarkAsRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("ar-SA")} ريال`;
  };

  const statsCards = [
    {
      title: "إجمالي الشاليهات",
      value: mockStats.totalChalets,
      icon: <HiOutlineHome className="w-6 h-6" />,
    },
    {
      title: "الحجوزات النشطة",
      value: mockStats.activeBookings,
      icon: <HiOutlineCalendar className="w-6 h-6" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "الإيرادات",
      value: formatCurrency(mockStats.totalRevenue),
      icon: <HiOutlineCash className="w-6 h-6" />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "نسبة الإشغال",
      value: `${mockStats.occupancyRate}%`,
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      trend: { value: 5, isPositive: true },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="mt-1 text-gray-600">مرحباً بك في لوحة تحكم مدير القرية</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateChalet((v) => !v)}
          className="self-start sm:self-auto rounded-lg bg-[#00B5E2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#33C3E7] transition-colors"
        >
          {showCreateChalet
            ? t("createChalet.toggleHide")
            : t("createChalet.toggleShow")}
        </button>
      </div>

      {showCreateChalet && (
        <div className="mb-8">
          <CreateChaletForm />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <Suspense fallback={<LoadingPlaceholder />}>
        <StatisticsCharts />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<LoadingPlaceholder />}>
            <RecentBookings bookings={mockRecentBookings} />
          </Suspense>
        </div>

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
