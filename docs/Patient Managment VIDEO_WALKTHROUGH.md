# Patient Management Dashboard — Video Walkthrough Script

Purpose: a concise, 6–8 minute screen-share demo you can use to impress hiring managers. Focus on end-to-end flow, architecture, engineering trade-offs, and a couple of short code walk-throughs.

Estimated length: 6–8 minutes

Structure (timestamps)
- 0:00 — 0:20 Opening (introduce yourself + repo)
- 0:20 — 1:30 High-level demo (show UI + basic flows)
- 1:30 — 3:00 Deep-dive: backend (Prisma, auth, RBAC)
- 3:00 — 4:30 Deep-dive: frontend (components, mockApi, responsive UI)
- 4:30 — 5:30 Dev & deploy notes (local run, Render + Netlify)
- 5:30 — 6:00 Closing talking points & Q&A prompts

Script (readable, natural language)

0:00 — 0:20 — Opening
- "Hi, I’m <Your Name>. I built the Patient Management Dashboard — a small full-stack demo showcasing React + Vite on the frontend, and Node + Express + Prisma on the backend. In the next few minutes I’ll show a quick end-to-end flow, highlight the architecture, and walk through a couple of key implementation details you might ask about in an interview."

0:20 — 1:30 — High-level demo (UI)
- Show the app landing / login page (use demo user dropdown to speed login).
- Log in as `dr.jones@clinic.test` (password: `password`).
- Open a patient (`MRN-001`) and create a new encounter using the modal editor. Save and refresh to show data persisted.
- Point out: Reusable `Card`, `Modal`, and `RoleBadge` components; accessible modal behavior; `mockApi` fallback that allows the UI to function without the backend running.

Talking bullets while demoing UI
- "This UI is intentionally minimal but demonstrates component reuse, responsive layout with Tailwind, and accessible patterns (keyboard/escape to close modals)."

1:30 — 3:00 — Backend deep-dive (Prisma + Auth)
- Open `backend/prisma/schema.prisma` and summarize models: `User`, `Patient`, `Encounter`, `Appointment`.
  - Say: "I chose Prisma for its type-safe client and fast developer workflow — we generate a typed client that we use in route handlers."
- Show `backend/src/routes/auth.ts` and `backend/src/middleware/auth.ts`:
  - Explain bcrypt for password hashing, JWT for stateless auth, and `requireRole` middleware used for RBAC.
  - Talk briefly about seed script (`prisma/seed.js`) that creates demo accounts using `upsert` (idempotent seeding).

Key backend talking points
- Security: hashed passwords and JWT with `JWT_SECRET` environment variable.
- Migrations: repo contains Prisma migrations and a recommended Render release command `npx prisma migrate deploy`.
- DB choice: SQLite for local dev (easy), Postgres on Render for production (explained in docs).

3:00 — 4:30 — Frontend deep-dive (components & API)
- Open `frontend/src/lib/mockApi.js` and explain the pattern:
  - It attempts to call the backend using `VITE_API_BASE`; if the API is unreachable, it falls back to an in-memory store so the UI remains usable.
- Open `frontend/src/components/EncounterEditor.jsx` and `Card.jsx`:
  - Explain form handling, validation approach (Zod on backend), and how `Card` centralizes spacing/visuals.
- Mention responsive improvements:
  - Tailwind `xs` breakpoint added in `tailwind.config.cjs` and `max-w-*` tokens to constrain content on small screens.

Quick code talking bullets
- "I keep components small and focused, use a central `mockApi` to decouple UI and backend, and use Tailwind utility classes for consistent spacing and responsive behavior."

4:30 — 5:30 — Dev & deploy notes (what you’ll say and show)
- Local run commands:

```bash
# Backend
cd backend
npm install
npm run prisma:generate  # if needed
npm run prisma:migrate    # dev migrations
npm run seed
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

- Deployment: explain the chosen split hosters:
  - Backend on Render (managed Postgres, persistent Node server) — add `DATABASE_URL` and `JWT_SECRET` in Render env; use release command `npx prisma migrate deploy`.
  - Frontend on Netlify — set `VITE_API_BASE` to the Render backend URL and redeploy.

Troubleshooting notes to mention
- If you see TS build errors on Render, ensure Render's service Root Directory is `backend` and Build Command uses `npm ci && npm run build` (so devDependencies like `prisma` are installed).

5:30 — 6:00 — Closing & interview prompts
- Closing script: "That’s a quick demo of the project — happy to walk through any part in more depth (auth, Prisma schema design, or deployment). Some topics I’m prepared to discuss: scaling the DB, adding tests (Jest + supertest + React Testing Library), or converting the API to serverless functions and the trade-offs."

Suggested interview Q&A topics (have short answers ready)
- Why Prisma? — type-safe client, developer ergonomics, and easy migrations.
- Why split hosting (Netlify + Render)? — static CDN for frontend, persistent server and managed DB for backend.
- How would you productionize this? — Postgres, connection pooling/Data Proxy, CI for migrations, secrets rotation, logging/monitoring.
- How to test this app? — add unit tests for core utils, supertest for backend routes, and RTL for key UI flows.

Files to open during interview (recommended order)
1. `README.md` — TL;DR and run steps
2. `prisma/schema.prisma` — DB design
3. `backend/src/middleware/auth.ts` — auth/RBAC core
4. `frontend/src/lib/mockApi.js` — API abstraction + fallback
5. `frontend/src/components/EncounterEditor.jsx` and `Card.jsx` — UI patterns

Closing notes
- The `docs/` folder contains pragmatic checklists for Render and Netlify (`render.md`, `netlify.md`) that you can open during the demo.
- Want me to generate a 1-page PDF or a slide deck (4 slides) with these talking points? I can produce either next.
