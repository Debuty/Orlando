import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../middleware/errorHandler.js';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().min(5),
});

export const contactRouter = Router();

contactRouter.post('/', async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('Validation failed', 400, parsed.error.flatten());
    }

    const message = await prisma.contactMessage.create({
      data: parsed.data,
    });

    res.status(201).json({
      id: message.id,
      message: 'Contact message received',
    });
  } catch (err) {
    next(err);
  }
});
