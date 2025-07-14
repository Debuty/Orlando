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

const Chalets = lazy(() => import('../modules/chalets/pages/Chalets'));
const Services = lazy(() => import('../modules/services/pages/Services'));
const About = lazy(() => import('../modules/about/pages/About'));
const Contact = lazy(() => import('../modules/contact/pages/Contact'));
const FAQ = lazy(() => import('../modules/faq/pages/FAQ'));
const Login = lazy(() => import('../modules/auth/pages/Login'));
const Signup = lazy(() => import('../modules/auth/pages/Signup'));
import HomePage from './../modules/home/pages/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="chalets" element={<Chalets />} />
      <Route path="services" element={<Services />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
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