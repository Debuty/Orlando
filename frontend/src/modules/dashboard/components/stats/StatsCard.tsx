import { motion, useMotionValue, useTransform, animate, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  const controls = useAnimation();
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(value);
  
  // Transform the count for display
  useEffect(() => {
    const unsubscribe = count.onChange(latest => {
      if (typeof value === 'number') {
        setDisplayValue(Math.round(latest));
      } else {
        // If value is a currency string, extract the number
        const numericValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
        if (!isNaN(numericValue)) {
          setDisplayValue(`${Math.round(latest).toLocaleString('ar-SA')} ريال`);
        } else if (value.toString().includes('%')) {
          // If value is a percentage, add the % symbol
          setDisplayValue(`${Math.round(latest)}%`);
        } else {
          setDisplayValue(value);
        }
      }
    });

    return () => unsubscribe();
  }, [count, value]);

  useEffect(() => {
    // Animate the number counting
    if (typeof value === 'number') {
      animate(count, value, { duration: 1.5, ease: "easeOut" });
    } else {
      const numericValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
      if (!isNaN(numericValue)) {
        animate(count, numericValue, { duration: 1.5, ease: "easeOut" });
      }
    }

    // Animate the card entrance
    controls.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    });
  }, [value, controls, count]);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[#00B5E2] bg-[#00B5E2]/5 p-3 rounded-full"
        >
          {icon}
        </motion.div>
        {trend && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-sm flex items-center gap-1"
            >
              {trend.isPositive ? '↑' : '↓'}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                {Math.abs(trend.value)}%
              </motion.span>
            </motion.span>
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4"
      >
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <motion.p className="text-2xl font-semibold mt-1">
          {displayValue}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default StatsCard; 