interface ChartComponentsProps {
  revenueData: Array<{ month: string; amount: number }>;
  bookingsData: Array<{ month: string; bookings: number }>;
  occupancyData: Array<{ month: string; rate: number }>;
}

declare const ChartComponents: React.FC<ChartComponentsProps>;
export default ChartComponents; 