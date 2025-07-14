import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
// import PerformanceMonitor from '../../shared/components/PerformanceMonitor/PerformanceMonitor';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      {/* <PerformanceMonitor /> */}
    </div>
  );
};

export default RootLayout; 