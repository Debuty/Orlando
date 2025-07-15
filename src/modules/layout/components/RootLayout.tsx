import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header/Header';
import { setRTL } from '../../shared/utils/rtl';
// import PerformanceMonitor from '../../shared/components/PerformanceMonitor/PerformanceMonitor';

const RootLayout = () => {
  useEffect(() => {
    setRTL(document.documentElement);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      {/* <PerformanceMonitor /> */}
    </div>
  );
};

export default RootLayout; 