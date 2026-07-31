# Orlando

Monorepo for the Orlando chalets booking platform.

## Structure

```
Orlando/
├── frontend/   # React + Vite + RTK Query
└── backend/    # Express + Prisma + PostgreSQL
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on Vite default port (usually `http://localhost:5173`).  
API base: `VITE_API_URL` in `frontend/.env` → `http://localhost:3000/api`

## Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

API: `http://localhost:3000/api`
