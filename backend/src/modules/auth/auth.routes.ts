import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/errorHandler.js";
import { authenticate, signToken } from "../../middleware/auth.js";
import type { Role } from "../../lib/constants.js";
import { Roles } from "../../lib/constants.js";

const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function publicUser(user: {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role as Role,
  };
}

export const authRouter = Router();

authRouter.post("/signup", async (req, res, next) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError("Validation failed", 400, parsed.error.flatten());
    }

    const { name, email, phone, password } = parsed.data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new AppError("Email already registered", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        role: Roles.TENANT,
      },
    });

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role as Role,
    });
    res.status(201).json({ user: publicUser(user), token });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError("Validation failed", 400, parsed.error.flatten());
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!ok) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role as Role,
    });
    res.json({ user: publicUser(user), token });
  } catch (err) {
    next(err);
  }
});

authRouter.get("/me", authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});
