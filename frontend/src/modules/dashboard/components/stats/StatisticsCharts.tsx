import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load chart components
const ChartComponents = lazy(() => import('./ChartComponents.tsx'));

// Mock data for the charts
const revenueData = [
  { month: 'يناير', amount: 35000 },
  { month: 'فبراير', amount: 42000 },
  { month: 'مارس', amount: 38000 },
  { month: 'أبريل', amount: 45000 },
  { month: 'مايو', amount: 52000 },
  { month: 'يونيو', amount: 48000 },
];

const bookingsData = [
  { month: 'يناير', bookings: 24 },
  { month: 'فبراير', bookings: 28 },
  { month: 'مارس', bookings: 32 },
  { month: 'أبريل', bookings: 30 },
  { month: 'مايو', bookings: 35 },
  { month: 'يونيو', bookings: 38 },
];

const occupancyData = [
  { month: 'يناير', rate: 65 },
  { month: 'فبراير', rate: 70 },
  { month: 'مارس', rate: 75 },
  { month: 'أبريل', rate: 72 },
  { month: 'مايو', rate: 80 },
  { month: 'يونيو', rate: 85 },
];

const StatisticsCharts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
    >
      <Suspense fallback={
        <div className="w-full h-[300px] bg-gray-100 rounded-lg animate-pulse" />
      }>
        <ChartComponents 
          revenueData={revenueData}
          bookingsData={bookingsData}
          occupancyData={occupancyData}
        />
      </Suspense>
    </motion.div>
  );
};

export default StatisticsCharts;