import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../middleware/errorHandler.js';
import { authenticate, authorize } from '../../middleware/auth.js';

export const dashboardRouter = Router();

dashboardRouter.use(authenticate, authorize('ADMIN'));

dashboardRouter.get('/stats', async (_req, res, next) => {
  try {
    const [totalChalets, activeBookings, revenueAgg, chalets] = await Promise.all([
      prisma.chalet.count({ where: { isActive: true } }),
      prisma.booking.count({ where: { status: { in: ['PENDING', 'CONFIRMED'] } } }),
      prisma.booking.aggregate({
        where: { status: { not: 'CANCELLED' }, payment: { status: 'SUCCESS' } },
        _sum: { totalPrice: true },
      }),
      prisma.chalet.findMany({
        where: { isActive: true },
        select: { id: true },
      }),
    ]);

    // Rough occupancy: confirmed booking-nights in next 30 days / (chalets * 30)
    const now = new Date();
    const in30 = new Date(now);
    in30.setDate(in30.getDate() + 30);

    const bookings = await prisma.booking.findMany({
      where: {
        status: { in: ['PENDING', 'CONFIRMED'] },
        checkIn: { lt: in30 },
        checkOut: { gt: now },
      },
      select: { checkIn: true, checkOut: true },
    });

    let bookedNights = 0;
    for (const b of bookings) {
      const start = b.checkIn > now ? b.checkIn : now;
      const end = b.checkOut < in30 ? b.checkOut : in30;
      const nights = Math.max(
        0,
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      );
      bookedNights += nights;
    }

    const capacityNights = Math.max(1, totalChalets * 30);
    const occupancyRate = Math.min(100, Math.round((bookedNights / capacityNights) * 100));

    res.json({
      totalChalets,
      activeBookings,
      totalRevenue: Number(revenueAgg._sum.totalPrice ?? 0),
      occupancyRate,
      chaletsCountForOccupancy: chalets.length,
    });
  } catch (err) {
    next(err);
  }
});

dashboardRouter.get('/charts', async (_req, res, next) => {
  try {
    const months = 6;
    const now = new Date();
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (months - 1), 1));

    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: { gte: start },
        status: { not: 'CANCELLED' },
      },
      select: {
        createdAt: true,
        totalPrice: true,
        checkIn: true,
        checkOut: true,
      },
    });

    const labels: string[] = [];
    const revenue: number[] = [];
    const bookingCounts: number[] = [];
    const occupancy: number[] = [];

    const totalChalets = await prisma.chalet.count({ where: { isActive: true } });

    for (let i = 0; i < months; i++) {
      const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + i, 1));
      const label = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
      labels.push(label);

      const monthBookings = bookings.filter(
        (b) =>
          b.createdAt.getUTCFullYear() === d.getUTCFullYear() &&
          b.createdAt.getUTCMonth() === d.getUTCMonth()
      );

      bookingCounts.push(monthBookings.length);
      revenue.push(monthBookings.reduce((sum, b) => sum + Number(b.totalPrice), 0));

      const daysInMonth = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
      let bookedNights = 0;
      const monthStart = d;
      const monthEnd = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));

      for (const b of bookings) {
        const s = b.checkIn > monthStart ? b.checkIn : monthStart;
        const e = b.checkOut < monthEnd ? b.checkOut : monthEnd;
        if (e > s) {
          bookedNights += Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
        }
      }

      const capacity = Math.max(1, totalChalets * daysInMonth);
      occupancy.push(Math.min(100, Math.round((bookedNights / capacity) * 100)));
    }

    res.json({
      labels,
      revenue,
      bookings: bookingCounts,
      occupancy,
    });
  } catch (err) {
    next(err);
  }
});

dashboardRouter.get('/recent-bookings', async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit ?? 10), 50);
    const bookings = await prisma.booking.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true } },
        chalet: { select: { name: true } },
      },
    });

    res.json({
      items: bookings.map((b) => ({
        id: b.id,
        chaletName: b.chalet.name,
        customerName: b.user.name,
        checkIn: b.checkIn.toISOString().slice(0, 10),
        checkOut: b.checkOut.toISOString().slice(0, 10),
        status: b.status.toLowerCase(),
        amount: Number(b.totalPrice),
      })),
    });
  } catch (err) {
    next(err);
  }
});

export const alertsRouter = Router();

alertsRouter.use(authenticate, authorize('ADMIN'));

alertsRouter.get('/', async (_req, res, next) => {
  try {
    const alerts = await prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json({
      items: alerts.map((a) => ({
        id: a.id,
        type: a.type.toLowerCase(),
        message: a.message,
        date: a.createdAt.toISOString(),
        isRead: a.isRead,
      })),
    });
  } catch (err) {
    next(err);
  }
});

alertsRouter.patch('/:id/read', async (req, res, next) => {
  try {
    const existing = await prisma.alert.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      throw new AppError('Alert not found', 404);
    }

    const alert = await prisma.alert.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });

    res.json({
      id: alert.id,
      type: alert.type.toLowerCase(),
      message: alert.message,
      date: alert.createdAt.toISOString(),
      isRead: alert.isRead,
    });
  } catch (err) {
    next(err);
  }
});
