import { Router } from 'express';
import { z } from 'zod';
import { Prisma } from '../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import {
  generateBookingCode,
  generateQrToken,
  generateTransactionId,
  nightsBetween,
  toDateOnly,
} from '../../lib/helpers.js';
import { AppError } from '../../middleware/errorHandler.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import type { BookingStatus } from '../../lib/constants.js';
import { BookingStatuses, QrStatuses } from '../../lib/constants.js';

const createBookingSchema = z.object({
  chaletId: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guestCount: z.number().int().min(1),
  specialRequests: z.string().optional(),
});

function mapBooking(booking: {
  id: string;
  userId: string;
  chaletId: string;
  checkIn: Date;
  checkOut: Date;
  guestCount: number;
  specialRequests: string | null;
  totalPrice: Prisma.Decimal | number;
  status: string;
  bookingCode: string;
  createdAt: Date;
  payment?: { transactionId: string; status: string } | null;
  qrCodes?: Array<{
    id: string;
    token: string;
    status: string;
    validFrom: Date;
    validTo: Date;
    usedAt: Date | null;
  }>;
  user?: { name: string };
  chalet?: { name: string };
}) {
  const activeQr =
    booking.qrCodes?.find((q) => q.status === QrStatuses.ACTIVE) ?? booking.qrCodes?.[0] ?? null;

  return {
    id: booking.id,
    userId: booking.userId,
    chaletId: booking.chaletId,
    checkIn: booking.checkIn.toISOString().slice(0, 10),
    checkOut: booking.checkOut.toISOString().slice(0, 10),
    guestCount: booking.guestCount,
    specialRequests: booking.specialRequests ?? undefined,
    totalPrice: Number(booking.totalPrice),
    status: booking.status.toLowerCase(),
    bookingCode: booking.bookingCode,
    createdAt: booking.createdAt.toISOString(),
    paymentStatus: booking.payment?.status.toLowerCase(),
    transactionId: booking.payment?.transactionId,
    qrCode: activeQr
      ? {
          id: activeQr.id,
          token: activeQr.token,
          status: activeQr.status,
          validFrom: activeQr.validFrom.toISOString().slice(0, 10),
          validTo: activeQr.validTo.toISOString().slice(0, 10),
          usedAt: activeQr.usedAt?.toISOString() ?? null,
        }
      : null,
    customerName: booking.user?.name,
    chaletName: booking.chalet?.name,
  };
}

async function hasOverlap(chaletId: string, checkIn: Date, checkOut: Date, excludeId?: string) {
  const overlapping = await prisma.booking.findFirst({
    where: {
      chaletId,
      status: { not: BookingStatuses.CANCELLED },
      ...(excludeId ? { id: { not: excludeId } } : {}),
      checkIn: { lt: checkOut },
      checkOut: { gt: checkIn },
    },
  });
  return Boolean(overlapping);
}

export const bookingsRouter = Router();

bookingsRouter.use(authenticate);

bookingsRouter.post('/', async (req, res, next) => {
  try {
    const parsed = createBookingSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('Validation failed', 400, parsed.error.flatten());
    }

    const checkIn = toDateOnly(parsed.data.checkIn);
    const checkOut = toDateOnly(parsed.data.checkOut);
    const tonight = toDateOnly(new Date());

    if (checkOut <= checkIn) {
      throw new AppError('checkOut must be after checkIn', 400);
    }
    if (checkIn < tonight) {
      throw new AppError('checkIn cannot be in the past', 400);
    }

    const chalet = await prisma.chalet.findUnique({ where: { id: parsed.data.chaletId } });
    if (!chalet || !chalet.isActive) {
      throw new AppError('Chalet not found', 404);
    }
    if (parsed.data.guestCount > chalet.capacity) {
      throw new AppError(`guestCount exceeds chalet capacity (${chalet.capacity})`, 400);
    }

    if (await hasOverlap(chalet.id, checkIn, checkOut)) {
      throw new AppError('Chalet is not available for the selected dates', 409);
    }

    const nights = nightsBetween(checkIn, checkOut);
    if (nights < 1) {
      throw new AppError('Booking must be at least 1 night', 400);
    }

    const totalPrice = Number(chalet.price) * nights;
    const bookingCode = generateBookingCode();
    const qrToken = generateQrToken();
    const transactionId = generateTransactionId();

    const booking = await prisma.$transaction(async (tx) => {
      const created = await tx.booking.create({
        data: {
          userId: req.user!.id,
          chaletId: chalet.id,
          checkIn,
          checkOut,
          guestCount: parsed.data.guestCount,
          specialRequests: parsed.data.specialRequests,
          totalPrice,
          status: BookingStatuses.CONFIRMED,
          bookingCode,
          payment: {
            create: {
              transactionId,
              status: 'SUCCESS',
            },
          },
          qrCodes: {
            create: {
              token: qrToken,
              status: QrStatuses.ACTIVE,
              validFrom: checkIn,
              validTo: checkOut,
            },
          },
        },
        include: {
          payment: true,
          qrCodes: true,
          user: { select: { name: true } },
          chalet: { select: { name: true } },
        },
      });

      await tx.alert.create({
        data: {
          type: 'INFO',
          message: `حجز جديد ${bookingCode} على شاليه ${chalet.name}`,
        },
      });

      return created;
    });

    res.status(201).json({
      booking: mapBooking(booking),
      paymentStatus: 'success',
      transactionId,
    });
  } catch (err) {
    next(err);
  }
});

bookingsRouter.get('/', authorize('ADMIN'), async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const perPage = Math.min(50, Math.max(1, Number(req.query.perPage ?? 20)));
    const status =
      typeof req.query.status === 'string'
        ? (req.query.status.toUpperCase() as BookingStatus)
        : undefined;
    const chaletId = typeof req.query.chaletId === 'string' ? req.query.chaletId : undefined;
    const from = typeof req.query.from === 'string' ? toDateOnly(req.query.from) : undefined;
    const to = typeof req.query.to === 'string' ? toDateOnly(req.query.to) : undefined;

    const where: Prisma.BookingWhereInput = {};
    if (status && Object.values(BookingStatuses).includes(status)) {
      where.status = status;
    }
    if (chaletId) where.chaletId = chaletId;
    if (from || to) {
      where.AND = [
        ...(from ? [{ checkOut: { gt: from } }] : []),
        ...(to ? [{ checkIn: { lt: to } }] : []),
      ];
    }

    const [totalItems, bookings] = await Promise.all([
      prisma.booking.count({ where }),
      prisma.booking.findMany({
        where,
        include: {
          payment: true,
          qrCodes: { orderBy: { createdAt: 'desc' } },
          user: { select: { name: true } },
          chalet: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    res.json({
      items: bookings.map(mapBooking),
      pagination: {
        currentPage: page,
        totalPages: Math.max(1, Math.ceil(totalItems / perPage)),
        totalItems,
        itemsPerPage: perPage,
      },
    });
  } catch (err) {
    next(err);
  }
});

bookingsRouter.get('/:id', async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: {
        payment: true,
        qrCodes: { orderBy: { createdAt: 'desc' } },
        user: { select: { name: true } },
        chalet: { select: { name: true } },
      },
    });

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    if (req.user!.role !== 'ADMIN' && booking.userId !== req.user!.id) {
      throw new AppError('Forbidden', 403);
    }

    res.json({
      booking: mapBooking(booking),
      paymentStatus: booking.payment?.status.toLowerCase() ?? 'failed',
      transactionId: booking.payment?.transactionId ?? null,
    });
  } catch (err) {
    next(err);
  }
});

bookingsRouter.patch('/:id/status', authorize('ADMIN'), async (req, res, next) => {
  try {
    const statusSchema = z.object({
      status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
    });
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('Validation failed', 400, parsed.error.flatten());
    }

    const existing = await prisma.booking.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      throw new AppError('Booking not found', 404);
    }

    const booking = await prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id: req.params.id },
        data: { status: parsed.data.status },
        include: {
          payment: true,
          qrCodes: { orderBy: { createdAt: 'desc' } },
          user: { select: { name: true } },
          chalet: { select: { name: true } },
        },
      });

      if (parsed.data.status === BookingStatuses.CANCELLED) {
        await tx.qrCode.updateMany({
          where: { bookingId: req.params.id, status: QrStatuses.ACTIVE },
          data: { status: QrStatuses.REVOKED },
        });
        updated.qrCodes = await tx.qrCode.findMany({
          where: { bookingId: req.params.id },
          orderBy: { createdAt: 'desc' },
        });
      }

      return updated;
    });

    res.json({ booking: mapBooking(booking) });
  } catch (err) {
    next(err);
  }
});

export const qrRouter = Router();

qrRouter.post('/validate', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const schema = z.object({ token: z.string().min(1) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('Validation failed', 400, parsed.error.flatten());
    }

    const qr = await prisma.qrCode.findUnique({
      where: { token: parsed.data.token },
      include: {
        booking: {
          include: {
            user: { select: { name: true, email: true } },
            chalet: { select: { name: true, location: true } },
          },
        },
      },
    });

    if (!qr) {
      return res.json({ valid: false, reason: 'NOT_FOUND' });
    }

    if (qr.booking.status === BookingStatuses.CANCELLED) {
      if (qr.status === QrStatuses.ACTIVE) {
        await prisma.qrCode.update({ where: { id: qr.id }, data: { status: QrStatuses.REVOKED } });
      }
      return res.json({ valid: false, reason: 'BOOKING_CANCELLED' });
    }

    if (qr.status === QrStatuses.USED) {
      return res.json({ valid: false, reason: 'USED' });
    }
    if (qr.status === QrStatuses.REVOKED) {
      return res.json({ valid: false, reason: 'REVOKED' });
    }
    if (qr.status === QrStatuses.EXPIRED) {
      return res.json({ valid: false, reason: 'EXPIRED' });
    }

    const today = toDateOnly(new Date());
    if (today < qr.validFrom || today > qr.validTo) {
      await prisma.qrCode.update({ where: { id: qr.id }, data: { status: QrStatuses.EXPIRED } });
      return res.json({ valid: false, reason: 'EXPIRED' });
    }

    const updated = await prisma.qrCode.update({
      where: { id: qr.id },
      data: { status: QrStatuses.USED, usedAt: new Date() },
    });

    res.json({
      valid: true,
      qrCode: {
        id: updated.id,
        token: updated.token,
        status: updated.status,
        usedAt: updated.usedAt,
      },
      booking: {
        id: qr.booking.id,
        bookingCode: qr.booking.bookingCode,
        checkIn: qr.booking.checkIn.toISOString().slice(0, 10),
        checkOut: qr.booking.checkOut.toISOString().slice(0, 10),
        guestCount: qr.booking.guestCount,
        customerName: qr.booking.user.name,
        chaletName: qr.booking.chalet.name,
      },
    });
  } catch (err) {
    next(err);
  }
});
