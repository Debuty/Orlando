import { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  type RouterProviderProps,
} from 'react-router-dom';
import RootLayout from '../modules/layout/components/RootLayout';
import Loading from '../modules/shared/components/Loading/Loading';

// Lazy load pages
const ManagerDashboard = lazy(() => import('../modules/dashboard/pages/ManagerDashboard'));
const Chalets = lazy(() => import('../modules/chalets/pages/Chalets'));
const ChaletDetails = lazy(() => import('../modules/chalets/pages/ChaletDetails'));
const Services = lazy(() => import('../modules/services/pages/Services'));
const About = lazy(() => import('../modules/about/pages/About'));
const Contact = lazy(() => import('../modules/contact/pages/Contact'));
const FAQ = lazy(() => import('../modules/faq/pages/FAQ'));
const Login = lazy(() => import('../modules/auth/pages/Login'));
const Signup = lazy(() => import('../modules/auth/pages/Signup'));
const BookingConfirmation = lazy(() => import('../modules/booking/pages/BookingConfirmation'));
import HomePage from './../modules/home/pages/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="dashboard" element={<ManagerDashboard />} />
      <Route path="chalets" element={<Chalets />} />
      <Route path="chalets/:id" element={<ChaletDetails />} />
      <Route path="services" element={<Services />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="booking/:bookingId/confirmation" element={<BookingConfirmation />} />
    </Route>
  )
);

const routerOptions: RouterProviderProps = {
  router,
  future: {
    v7_startTransition: true
  }
};

export function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider {...routerOptions} />
    </Suspense>
  );
} 