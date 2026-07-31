import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { mapChalet, serializeFeatures } from '../../lib/helpers.js';
import { AppError } from '../../middleware/errorHandler.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const chaletBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  price: z.number().positive(),
  capacity: z.number().int().positive(),
  rating: z.number().min(0).max(5).optional().nullable(),
  features: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  isActive: z.boolean().optional(),
});

export const chaletsRouter = Router();

chaletsRouter.get('/featured', async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit ?? 6), 20);
    const chalets = await prisma.chalet.findMany({
      where: { isActive: true },
      include: { images: true },
      orderBy: { rating: 'desc' },
      take: limit,
    });
    res.json({ items: chalets.map(mapChalet) });
  } catch (err) {
    next(err);
  }
});

chaletsRouter.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const perPage = Math.min(50, Math.max(1, Number(req.query.perPage ?? 6)));
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
    const minPrice = req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;
    const capacity = req.query.capacity !== undefined ? Number(req.query.capacity) : undefined;

    const where: Record<string, unknown> = { isActive: true };

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
      ];
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {
        ...(minPrice !== undefined && !Number.isNaN(minPrice) ? { gte: minPrice } : {}),
        ...(maxPrice !== undefined && !Number.isNaN(maxPrice) ? { lte: maxPrice } : {}),
      };
    }
    if (capacity !== undefined && !Number.isNaN(capacity)) {
      where.capacity = { gte: capacity };
    }

    const [totalItems, chalets] = await Promise.all([
      prisma.chalet.count({ where }),
      prisma.chalet.findMany({
        where,
        include: { images: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    res.json({
      items: chalets.map(mapChalet),
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

chaletsRouter.get('/:id', async (req, res, next) => {
  try {
    const chalet = await prisma.chalet.findUnique({
      where: { id: req.params.id },
      include: {
        images: true,
        bookings: {
          where: { status: { not: 'CANCELLED' } },
          select: { checkIn: true, checkOut: true, status: true },
        },
      },
    });

    if (!chalet || !chalet.isActive) {
      throw new AppError('Chalet not found', 404);
    }

    res.json({
      ...mapChalet(chalet),
      bookings: chalet.bookings.map((b) => ({
        checkIn: b.checkIn.toISOString().slice(0, 10),
        checkOut: b.checkOut.toISOString().slice(0, 10),
        status: b.status.toLowerCase(),
      })),
    });
  } catch (err) {
    next(err);
  }
});

chaletsRouter.post('/', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const parsed = chaletBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('Validation failed', 400, parsed.error.flatten());
    }

    const data = parsed.data;
    const chalet = await prisma.chalet.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        price: data.price,
        capacity: data.capacity,
        rating: data.rating ?? null,
        features: serializeFeatures(data.features),
        isActive: data.isActive ?? true,
        images: {
          create: data.images.map((url, index) => ({ url, sortOrder: index })),
        },
      },
      include: { images: true },
    });

    res.status(201).json(mapChalet(chalet));
  } catch (err) {
    next(err);
  }
});

chaletsRouter.put('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const parsed = chaletBodySchema.partial().safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('Validation failed', 400, parsed.error.flatten());
    }

    const existing = await prisma.chalet.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      throw new AppError('Chalet not found', 404);
    }

    const data = parsed.data;

    const chalet = await prisma.$transaction(async (tx) => {
      if (data.images) {
        await tx.chaletImage.deleteMany({ where: { chaletId: req.params.id } });
        await tx.chaletImage.createMany({
          data: data.images.map((url, index) => ({
            chaletId: req.params.id,
            url,
            sortOrder: index,
          })),
        });
      }

      return tx.chalet.update({
        where: { id: req.params.id },
        data: {
          ...(data.name !== undefined ? { name: data.name } : {}),
          ...(data.description !== undefined ? { description: data.description } : {}),
          ...(data.location !== undefined ? { location: data.location } : {}),
          ...(data.price !== undefined ? { price: data.price } : {}),
          ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
          ...(data.rating !== undefined ? { rating: data.rating } : {}),
          ...(data.features !== undefined ? { features: serializeFeatures(data.features) } : {}),
          ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        },
        include: { images: true },
      });
    });

    res.json(mapChalet(chalet));
  } catch (err) {
    next(err);
  }
});

chaletsRouter.delete('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const existing = await prisma.chalet.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      throw new AppError('Chalet not found', 404);
    }

    const chalet = await prisma.chalet.update({
      where: { id: req.params.id },
      data: { isActive: false },
      include: { images: true },
    });

    res.json(mapChalet(chalet));
  } catch (err) {
    next(err);
  }
});
