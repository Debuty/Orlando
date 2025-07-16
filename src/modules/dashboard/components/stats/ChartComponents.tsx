import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

interface ChartComponentsProps {
  revenueData: Array<{ month: string; amount: number }>;
  bookingsData: Array<{ month: string; bookings: number }>;
  occupancyData: Array<{ month: string; rate: number }>;
}

const ChartComponents = ({ revenueData, bookingsData, occupancyData }: ChartComponentsProps) => {
  // Format large numbers with K/M
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toLocaleString('ar-SA', { maximumFractionDigits: 1 })}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toLocaleString('ar-SA', { maximumFractionDigits: 1 })}K`;
    }
    return num.toLocaleString('ar-SA');
  };

  // Common axis configuration
  const commonXAxisProps = {
    stroke: '#666',
    axisLine: false,
    tickLine: false,
    dy: 10,
    fontSize: 12,
    fontFamily: 'Noto Sans Arabic',
    tick: (props: any) => {
      const { x, y, payload } = props;
      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={16}
            textAnchor="middle"
            fill="#666"
            fontSize={12}
            fontFamily="Noto Sans Arabic"
          >
            {payload.value}
          </text>
        </g>
      );
    }
  };

  const commonYAxisProps = {
    stroke: '#666',
    axisLine: false,
    tickLine: false,
    dx: -10,
    fontSize: 12,
    fontFamily: 'Noto Sans Arabic',
    tick: (props: any) => {
      const { x, y, payload } = props;
      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dx={-25}
            textAnchor="end"
            fill="#666"
            fontSize={12}
            fontFamily="Noto Sans Arabic"
          >
            {payload.value}
          </text>
        </g>
      );
    }
  };

  return (
    <>
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
            <AreaChart 
              data={revenueData} 
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00B5E2" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00B5E2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                {...commonXAxisProps}
              />
              <YAxis 
                {...commonYAxisProps}
                width={60}
                tickFormatter={(value) => formatLargeNumber(value)}
                domain={['auto', 'auto']}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        dx={-10}
                        textAnchor="end"
                        fill="#666"
                        fontSize={12}
                        fontFamily="Noto Sans Arabic"
                      >
                        {formatLargeNumber(payload.value)}
                      </text>
                    </g>
                  );
                }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontFamily: 'Noto Sans Arabic',
                  fontSize: '12px',
                  padding: '8px 12px',
                  textAlign: 'right'
                }}
                formatter={(value: number) => [`${value.toLocaleString('ar-SA')} ريال`, 'الإيرادات']}
                labelStyle={{ fontFamily: 'Noto Sans Arabic', direction: 'rtl' }}
                cursor={{ stroke: '#00B5E2', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#00B5E2"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                dot={{ fill: '#00B5E2', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
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
            <LineChart 
              data={bookingsData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                {...commonXAxisProps}
              />
              <YAxis 
                {...commonYAxisProps}
                tickFormatter={(value) => value}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontFamily: 'Noto Sans Arabic',
                  fontSize: '12px',
                  padding: '8px 12px'
                }}
                formatter={(value: number) => [`${value} حجز`, 'الحجوزات']}
                labelStyle={{ fontFamily: 'Noto Sans Arabic', direction: 'rtl' }}
                cursor={{ stroke: '#00B5E2', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#00B5E2"
                strokeWidth={2}
                dot={{ fill: '#00B5E2', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
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
            <BarChart 
              data={occupancyData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                {...commonXAxisProps}
              />
              <YAxis 
                {...commonYAxisProps}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontFamily: 'Noto Sans Arabic',
                  fontSize: '12px',
                  padding: '8px 12px'
                }}
                formatter={(value: number) => [`${value}%`, 'نسبة الإشغال']}
                labelStyle={{ fontFamily: 'Noto Sans Arabic', direction: 'rtl' }}
                cursor={{ fill: 'rgba(0, 181, 226, 0.1)' }}
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
    </>
  );
};

export default ChartComponents; 