import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { env } from '../config/env.js';

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.db.ssl ? { rejectUnauthorized: false } : undefined,
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
