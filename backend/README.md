# Orlando Backend

Express + Prisma + SQL Server API for the Orlando chalets booking platform.

## Docs

- [Product requirements](./docs/REQUIREMENTS.md)
- [Entities](./docs/ENTITIES.md)
- [API contract](./docs/API.md)
- Postman: [`postman/Orlando-API.postman_collection.json`](./postman/Orlando-API.postman_collection.json)

## Setup

1. Copy env file:

```bash
cp .env.example .env
```

2. Set `DATABASE_URL` for your SQL Server instance.

3. Install, generate client, push schema + seed:

```bash
npm install
npm run db:setup
```

4. Run API:

```bash
npm run dev
```

API base: `http://localhost:3000/api`

Prisma 7 notes:
- Connection URL lives in [`prisma.config.ts`](./prisma.config.ts) (not in `schema.prisma`)
- Client is generated to `src/generated/prisma` and uses `@prisma/adapter-mssql`

### Seed accounts

| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@orlando.com | Admin123! |
| TENANT | tenant@orlando.com | Tenant123! |

## Scripts

- `npm run dev` — watch mode
- `npm run prisma:push` — sync schema to SQL Server
- `npm run prisma:seed` — seed admin, tenant, chalets, sample booking
- `npm run db:setup` — push + seed
