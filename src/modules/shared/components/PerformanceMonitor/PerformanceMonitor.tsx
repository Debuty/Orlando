import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PerformanceMetrics {
  [key: string]: {
    loadTime: number;
    visits: number;
  };
}

const routeNames: { [key: string]: string } = {
  '/': 'الرئيسية',
  '/chalets': 'الشاليهات',
  '/services': 'الخدمات',
  '/about': 'عن اورلاندو',
  '/contact': 'اتصل بنا',
  '/faq': 'اسالة شائعة',
  '/login': 'تسجيل دخول',
  '/signup': 'انشاء حساب'
};

const PerformanceMonitor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const location = useLocation();

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const loadTime = performance.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        [location.pathname]: {
          loadTime: prev[location.pathname]?.loadTime 
            ? (prev[location.pathname].loadTime + loadTime) / 2
            : loadTime,
          visits: (prev[location.pathname]?.visits || 0) + 1
        }
      }));
    };
  }, [location.pathname]);

  if (!isVisible) return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full bg-blue-600 p-2 text-white shadow-lg"
        title="Show Performance Metrics"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 max-h-96 w-80 overflow-auto rounded-lg bg-white p-4 shadow-xl" dir="rtl">
      <div className="mb-4 flex justify-between">
        <h3 className="text-lg font-semibold">مقاييس الأداء</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-gray-500 hover:text-gray-700"
            title="تصغير"
          >
            _
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
            title="إغلاق"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="mt-4">
        {Object.entries(metrics).map(([path, { loadTime, visits }]) => (
          <div key={path} className="mb-2 border-b pb-2">
            <div className="font-medium">{routeNames[path] || path}</div>
            <div className="text-sm text-gray-600">
              وقت التحميل: {loadTime.toFixed(2)} مللي ثانية
              <br />
              عدد الزيارات: {visits}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMonitor; 