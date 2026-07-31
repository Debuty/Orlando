import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '../generated/prisma/client.js';
import { env } from '../config/env.js';

const adapter = new PrismaMssql({
  server: env.db.server,
  port: env.db.port,
  database: env.db.database,
  user: env.db.user,
  password: env.db.password,
  options: {
    encrypt: env.db.encrypt,
    trustServerCertificate: env.db.trustServerCertificate,
  },
});

export const prisma = new PrismaClient({ adapter });
