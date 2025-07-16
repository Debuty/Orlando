import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

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
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">تحليل الإيرادات</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00B5E2" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00B5E2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => `${value.toLocaleString('ar-SA')} ريال`}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#00B5E2"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bookings Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">تحليل الحجوزات</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#00B5E2"
                strokeWidth={2}
                dot={{ fill: '#00B5E2', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Occupancy Rate Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">معدل الإشغال</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar
                dataKey="rate"
                fill="#00B5E2"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatisticsCharts;