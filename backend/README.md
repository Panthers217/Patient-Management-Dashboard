# Backend (Express + Prisma + Zod)

This folder contains a minimal backend scaffold using Express, Prisma (SQLite for dev), and Zod for request validation. It's intended as a starting point to wire up the frontend.

Quick start (local dev):

1. Create a `.env` file from the example:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
cd backend
npm install
```

3. Generate Prisma client and run the dev migration (SQLite):

```bash
npx prisma generate
npx prisma migrate dev --name init --preview-feature --skip-seed
```

4. (Optional) Seed sample data:

```bash
npm run seed
```

5. Start the server for development (the package uses `ts-node` to run TypeScript directly):

```bash
npm run dev
```

Notes:
- The scaffold uses SQLite by default via the `.env` DATABASE_URL. To switch to MySQL, change the `provider` in `prisma/schema.prisma` and update `DATABASE_URL`.
- The current auth route uses a demo in-memory user list. Replace with Prisma-backed user lookup and JWT signing.
- This backend is minimal by design: add RBAC middleware, audit logging, file upload signed-URL handlers, and background workers (BullMQ + Redis) as next steps.
