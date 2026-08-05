import { lazy, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGetDashboardChartsQuery } from '../../../shared/api/orlandoApi';

const ChartComponents = lazy(() => import('./ChartComponents.tsx'));

const StatisticsCharts = () => {
  const { t } = useTranslation('dashboard');
  const { data, isLoading, isError, error } = useGetDashboardChartsQuery();

  const { revenueData, bookingsData, occupancyData } = useMemo(() => {
    if (!data) {
      return { revenueData: [], bookingsData: [], occupancyData: [] };
    }
    const labels = data.labels ?? [];
    return {
      revenueData: labels.map((month, i) => ({
        month,
        amount: data.revenue[i] ?? 0,
      })),
      bookingsData: labels.map((month, i) => ({
        month,
        bookings: data.bookings[i] ?? 0,
      })),
      occupancyData: labels.map((month, i) => ({
        month,
        rate: data.occupancy[i] ?? 0,
      })),
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="h-[340px] bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-[340px] bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-[340px] bg-gray-100 rounded-lg animate-pulse lg:col-span-2" />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
      >
        {(error && 'message' in error && String(error.message)) ||
          t('charts.error')}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
    >
      <Suspense
        fallback={
          <div className="w-full h-[300px] bg-gray-100 rounded-lg animate-pulse" />
        }
      >
        <ChartComponents
          revenueData={revenueData}
          bookingsData={bookingsData}
          occupancyData={occupancyData}
          titles={{
            revenue: t('charts.revenue'),
            bookings: t('charts.bookings'),
            occupancy: t('charts.occupancy'),
          }}
        />
      </Suspense>
    </motion.div>
  );
};

export default StatisticsCharts;
