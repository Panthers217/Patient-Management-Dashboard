Render deployment checklist — Backend (Express + Prisma)

This file documents the exact steps to deploy the backend to Render using a managed Postgres database and to run Prisma migrations safely.

Overview
- Service: Render Web Service (Node)
- DB: Render Managed Postgres (recommended)
- Repo: connect to your GitHub repo and select the branch you want to deploy (e.g., `Branch-2` or `main`).

Step-by-step
1) Prepare the repo
- Ensure your backend `package.json` contains:
  - `postinstall` that runs `prisma generate` (already present in this repo).
  - `build` script: `tsc` (for TypeScript projects).
  - `start` script: `node ./dist/server.js` (Render will run your start command).

2) Add migrations to the repo
- Locally, run migrations and commit the generated `prisma/migrations` folder so Render can run `prisma migrate deploy` in production:

```bash
# If switching to Postgres: update prisma/schema.prisma datasource provider to "postgresql"
npx prisma generate
npx prisma migrate dev --name init
git add prisma/migrations
git commit -m "Add Prisma migrations"
```

3) Create a new Postgres database on Render
- Dashboard > New > PostgreSQL
- Choose a plan and create the database.
- When the DB is provisioned, copy the connection string — it will look like:

```
postgres://<user>:<pass>@<host>:5432/<db>?sslmode=require
```

4) Create a new Web Service on Render (backend)
- Dashboard > New > Web Service
- Connect your GitHub repo and pick the branch (e.g., `Branch-2`).
- Environment: select `Node` (Render auto-detects Node).
- Root Directory: set to `backend` (so Render runs commands within the backend folder).
- Build Command: `npm run build`
- Start Command: `npm start`

5) Set environment variables (Service > Environment > Environment Variables)
- `DATABASE_URL` = the Postgres connection string from your managed DB (copy/paste).
- `JWT_SECRET` = a long random value (do not commit to repo).
- `PORT` = `4000` (optional; Render provides a port but the app reads from PORT env var).

6) Release Command (important)
- In the Web Service settings, set a Release Command to run migrations before the service starts. Recommended value:

```
npx prisma migrate deploy
```

- If you want the seed to run automatically (safe because seed uses upsert), you can append it (optional):

```
npx prisma migrate deploy && node ./prisma/seed.js
```

Notes on seed: The repo's seed script is idempotent (it uses upsert) — running it multiple times is safe, but be cautious if you modify it later.

7) Add the DB to the Web Service (alternative)
- Instead of manually copying the DB URL, you can add the Postgres DB as a linked resource in Render and copy the connection string into the Web Service environment variable `DATABASE_URL`.

8) Deploy & monitor
- Trigger a manual deploy or push a commit to the branch.
- Monitor the deploy logs in Render:
  - Postinstall should run `prisma generate` (see logs).
  - Release Command should run and apply migrations.
  - Build step runs `npm run build` and `tsc` should produce `dist/`.
  - Start command `npm start` should start the server and log `Backend listening on port <PORT>`.

9) Run seed (if not included in release)
- Option A (recommended): Run seed as a one-off via Render's Shell or include in Release Command after verifying migrations succeeded:

Render Shell method:
  - Open the deployed service in Render dashboard
  - Click "Shell"
  - Run:

```bash
node ./prisma/seed.js
```

10) Post-deploy smoke tests (use curl or Postman)
- Login (seeded users):

```bash
curl -X POST https://<your-backend>.onrender.com/api/auth/login -H 'Content-Type: application/json' -d '{"email":"dr.jones@clinic.test","password":"password"}'
```

- Get patient (requires token):

```bash
TOKEN=$(curl -s -X POST https://<your-backend>.onrender.com/api/auth/login -H 'Content-Type: application/json' -d '{"email":"dr.jones@clinic.test","password":"password"}' | jq -r .token)
curl -H "Authorization: Bearer $TOKEN" https://<your-backend>.onrender.com/api/patients/MRN-001
```

Troubleshooting & notes
- Prisma client not found / postinstall failed: confirm `postinstall` runs `prisma generate`. Render runs `npm install` then `postinstall`.
- Migration errors on `npx prisma migrate deploy`: ensure `prisma/migrations` are committed to the repo and the DB user has permission to run migrations.
- DB connection issues: some providers require `?sslmode=require` appended to the `DATABASE_URL`. If you see SSL errors, add `?sslmode=require`.
- If your app fails to start because `dist/server.js` is missing, ensure the Build Command `npm run build` succeeded and `tsc` emitted files into `dist/`.
- To replay the release command or rerun migrations manually, use the Render dashboard's Manual Commands / Shell.

Security
- Store `JWT_SECRET` and other sensitive values in Render environment variables only.
- Rotate secrets if needed and avoid committing any credentials to Git.

Rollback
- Use Render's "Deploys" tab to re-deploy a previous commit if a release causes regressions.

Helpful Render settings (recommended)
- Automatic deploys: enabled (for demo this is convenient).
- Health Checks: enable and set a health endpoint if you add one (e.g., `/health`).
- Background workers: if you later add scheduled jobs, provision a separate Worker service.

Final notes
- After backend is running on Render, set `VITE_API_BASE` in Netlify to the backend URL (for production frontend builds).
- If you'd like, I can create a Render-ready `Dockerfile` and a short `render.md` script to automate release/migrations further.
