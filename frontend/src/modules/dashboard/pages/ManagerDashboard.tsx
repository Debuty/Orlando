import { useState, lazy, Suspense, useEffect } from 'react';
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineCash,
  HiOutlineChartBar,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import StatsCard from '../components/stats/StatsCard';
import CreateChaletForm from '../components/chalets/CreateChaletForm';
import QrValidatePanel from '../components/qr/QrValidatePanel';
import {
  useGetDashboardStatsQuery,
  useGetRecentBookingsQuery,
  useGetAlertsQuery,
  useMarkAlertReadMutation,
} from '../../shared/api/orlandoApi';

const RecentBookings = lazy(
  () => import('../components/bookings/RecentBookings')
);
const AlertsList = lazy(() => import('../components/alerts/AlertsList'));
const StatisticsCharts = lazy(
  () => import('../components/stats/StatisticsCharts')
);

const LoadingPlaceholder = () => (
  <div className="w-full h-32 bg-gray-100 rounded-lg animate-pulse" />
);

const RECENT_BOOKINGS_PAGE_SIZE = 5;

const ManagerDashboard = () => {
  const { t, i18n } = useTranslation('dashboard');
  const [searchParams, setSearchParams] = useSearchParams();
  const urlToken = searchParams.get('token');
  const [showCreateChalet, setShowCreateChalet] = useState(false);
  const [bookingsPage, setBookingsPage] = useState(1);

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErr,
  } = useGetDashboardStatsQuery();

  const {
    data: recentData,
    isLoading: recentLoading,
    isError: recentError,
    error: recentErr,
    isFetching: recentFetching,
  } = useGetRecentBookingsQuery({
    page: bookingsPage,
    size: RECENT_BOOKINGS_PAGE_SIZE,
  });

  const {
    data: alertsData,
    isLoading: alertsLoading,
    isError: alertsError,
    error: alertsErr,
  } = useGetAlertsQuery();

  const [markAlertRead, { isLoading: isMarking }] = useMarkAlertReadMutation();

  const totalPages = recentData?.pagination.totalPages ?? 1;

  useEffect(() => {
    if (bookingsPage > totalPages) {
      setBookingsPage(totalPages);
    }
  }, [bookingsPage, totalPages]);

  const formatCurrency = (amount: number) => {
    const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
    return `${amount.toLocaleString(locale)} ${t('stats.currency')}`;
  };

  const handleMarkAsRead = async (alertId: string) => {
    try {
      await markAlertRead(alertId).unwrap();
    } catch {
      /* error surfaced via list refresh / silent */
    }
  };

  const clearTokenQuery = () => {
    if (!searchParams.has('token')) return;
    const next = new URLSearchParams(searchParams);
    next.delete('token');
    setSearchParams(next, { replace: true });
  };

  const statsCards = [
    {
      title: t('stats.totalChalets'),
      value: stats?.totalChalets ?? '—',
      icon: <HiOutlineHome className="w-6 h-6" />,
    },
    {
      title: t('stats.activeBookings'),
      value: stats?.activeBookings ?? '—',
      icon: <HiOutlineCalendar className="w-6 h-6" />,
    },
    {
      title: t('stats.totalRevenue'),
      value:
        stats != null ? formatCurrency(stats.totalRevenue) : '—',
      icon: <HiOutlineCash className="w-6 h-6" />,
    },
    {
      title: t('stats.occupancyRate'),
      value: stats != null ? `${stats.occupancyRate}%` : '—',
      icon: <HiOutlineChartBar className="w-6 h-6" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('header.title')}
          </h1>
          <p className="mt-1 text-gray-600">{t('header.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateChalet((v) => !v)}
          className="self-start sm:self-auto rounded-lg bg-[#00B5E2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#33C3E7] transition-colors"
        >
          {showCreateChalet
            ? t('createChalet.toggleHide')
            : t('createChalet.toggleShow')}
        </button>
      </div>

      {showCreateChalet && (
        <div className="mb-8">
          <CreateChaletForm />
        </div>
      )}

      <QrValidatePanel
        initialToken={urlToken}
        onAutoValidateDone={clearTokenQuery}
      />

      {statsError && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
        >
          {(statsErr && 'message' in statsErr && String(statsErr.message)) ||
            t('stats.error')}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-lg bg-gray-100"
              />
            ))
          : statsCards.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
      </div>

      <Suspense fallback={<LoadingPlaceholder />}>
        <StatisticsCharts />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<LoadingPlaceholder />}>
            <RecentBookings
              bookings={recentData?.items ?? []}
              pagination={recentData?.pagination}
              page={bookingsPage}
              onPageChange={setBookingsPage}
              isLoading={recentLoading || recentFetching}
              isError={recentError}
              errorMessage={
                recentErr && 'message' in recentErr
                  ? String(recentErr.message)
                  : undefined
              }
            />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<LoadingPlaceholder />}>
            <AlertsList
              alerts={alertsData?.items ?? []}
              onMarkAsRead={handleMarkAsRead}
              isLoading={alertsLoading}
              isError={alertsError}
              isMarking={isMarking}
              errorMessage={
                alertsErr && 'message' in alertsErr
                  ? String(alertsErr.message)
                  : undefined
              }
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
