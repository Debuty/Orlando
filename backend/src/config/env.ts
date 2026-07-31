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

export const env = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: required('JWT_SECRET', 'orlando-dev-secret-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  db: {
    server: required('DB_SERVER', 'localhost'),
    port: Number(process.env.DB_PORT ?? 1433),
    database: required('DB_NAME', 'Orlando'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    encrypt: bool('DB_ENCRYPT', true),
    trustServerCertificate: bool('DB_TRUST_SERVER_CERTIFICATE', true),
  },
  get databaseUrl() {
    if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
    const { server, port, database, user, password, encrypt, trustServerCertificate } = this.db;
    return `sqlserver://${server}:${port};database=${database};user=${user};password=${password};encrypt=${encrypt};trustServerCertificate=${trustServerCertificate}`;
  },
};
