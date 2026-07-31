import express from 'express';
import cors from 'cors';
import { authRouter } from './modules/auth/auth.routes.js';
import { chaletsRouter } from './modules/chalets/chalets.routes.js';
import { bookingsRouter, qrRouter } from './modules/bookings/bookings.routes.js';
import { dashboardRouter, alertsRouter } from './modules/dashboard/dashboard.routes.js';
import { contactRouter } from './modules/contact/contact.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/chalets', chaletsRouter);
  app.use('/api/bookings', bookingsRouter);
  app.use('/api/qr', qrRouter);
  app.use('/api/dashboard', dashboardRouter);
  app.use('/api/alerts', alertsRouter);
  app.use('/api/contact', contactRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
