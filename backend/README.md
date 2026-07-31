# Orlando Backend

Express + Prisma + **PostgreSQL** API for the Orlando chalets booking platform.

## Docs

- [Product requirements](./docs/REQUIREMENTS.md)
- [Entities](./docs/ENTITIES.md)
- [API contract](./docs/API.md)
- Postman: [`postman/Orlando-API.postman_collection.json`](./postman/Orlando-API.postman_collection.json)

## Setup

1. Create a Neon project / database (or any PostgreSQL).

2. Copy env file and set `DATABASE_URL` (Neon includes `?sslmode=require`):

```bash
cp .env.example .env
```

3. Install, generate client, push schema (+ optional seed):

```bash
npm install
npx prisma generate
npx prisma db push
# npm run prisma:seed   # optional
```

4. Run API:

```bash
npm run dev
```

API base: `http://localhost:3000/api`

### Prisma 7 notes

- Connection URL lives in [`prisma.config.ts`](./prisma.config.ts) + `.env` `DATABASE_URL`
- Client is generated to `src/generated/prisma` and uses `@prisma/adapter-pg`

### Seed accounts

| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@orlando.com | Admin123! |
| TENANT | tenant@orlando.com | Tenant123! |

## Scripts

- `npm run dev` — watch mode
- `npm run prisma:push` — sync schema to PostgreSQL
- `npm run prisma:seed` — seed admin, tenant, chalets, sample booking
- `npm run db:setup` — generate + push + seed
