import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header/Header';
import Footer from './Footer/Footer';
import { setRTL } from '../../shared/utils/rtl';
import { ScrollToTop } from '../../shared/components/ScrollToTop/ScrollToTop';

const RootLayout = () => {
  useEffect(() => {
    setRTL(document.documentElement);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Header />
      <main className="pt-16 flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default RootLayout; 