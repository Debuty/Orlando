import 'dotenv/config';

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

function bool(name: string, fallback = false): boolean {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true' || value === '1';
}

const databaseUrlFromEnv = process.env.DATABASE_URL?.trim() || '';

function resolveDatabaseUrl(): string {
  if (databaseUrlFromEnv) return databaseUrlFromEnv;

  const host = required('DB_HOST', 'localhost');
  const port = Number(process.env.DB_PORT ?? 5432);
  const database = required('DB_NAME', 'orlando');
  const user = required('DB_USER', 'postgres');
  const password = required('DB_PASSWORD');
  const ssl = bool('DB_SSL', false);
  const sslQuery = ssl ? '?sslmode=require' : '';
  return `postgresql://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}${sslQuery}`;
}

const databaseUrl = resolveDatabaseUrl();

/** Neon / managed Postgres almost always need TLS */
const needsSsl =
  bool('DB_SSL', false) ||
  databaseUrl.includes('sslmode=require') ||
  databaseUrl.includes('neon.tech');

export const env = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: required('JWT_SECRET', 'orlando-dev-secret-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  databaseUrl,
  db: {
    // Only used when building URL from parts; safe defaults when DATABASE_URL is set
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME ?? 'orlando',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    ssl: needsSsl,
  },
};
