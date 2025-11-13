# Patient Management Dashboard — Developer Guide

Version: Branch-2 (working demo)

This document is written for you, the developer/interviewer, to quickly understand, run, extend, and demo the Patient Management Dashboard project.

Summary
- Purpose: A demo application for patient records, encounters, and appointments designed to showcase full-stack skills: a Vite + React frontend and an Express + Prisma backend with JWT-based auth and RBAC.
- Primary highlights to show in interviews: end-to-end persistence with Prisma, secure authentication, modular React components (Modal, Card, RoleBadge), accessible UI patterns, and Docker-based dev environment.

Tech stack
- Frontend: Vite, React 18 (JSX), React Router v6, Tailwind CSS.
- Backend: Node + Express (TypeScript), Prisma ORM with SQLite (dev), Zod validation, bcryptjs, jsonwebtoken.
- Dev tooling: npm scripts, Prisma migrations & seed, Docker Compose for dev.

Quick start (local, dev)
1. Backend

```bash
cd backend
npm install
# generate Prisma client (if needed)
npm run prisma:generate
# run migrations (if present)
npm run prisma:migrate
# seed DB
npm run seed
# start backend (dev)
npm run dev
```

Default backend dev server: `http://127.0.0.1:4000`

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Default frontend dev server: `http://localhost:5173`

3. Docker Compose (optional)

```bash
docker compose up --build
```

Environment variables (important)
- Backend: set in `backend/.env` (example keys):
  - `DATABASE_URL="file:./dev.db"` (Prisma default for dev)
  - `JWT_SECRET=your_secret_here`
  - `PORT=4000`

- Frontend: `frontend/.env` used by Vite if customized (not required for default dev).

Project structure & key files
- `frontend/`
  - `src/main.jsx` — app entry, router provider, top-level providers (Auth, Toast).
  - `src/pages/` — high-level routes: `LoginPage.jsx`, `Dashboard.jsx`, `Patients`, `Appointments`, etc.
  - `src/components/` — reusable UI components: `Modal.jsx`, `Card.jsx`, `RoleBadge.jsx`, `ToastContext.jsx`, `EncounterEditor.jsx`, `AppointmentEditor.jsx`, `AppointmentModal.jsx`, `EncounterModal.jsx`.
  - `src/lib/mockApi.js` — abstraction that calls backend when available and falls back to in-memory mock data for demo. Good to inspect for how API calls are organized.

- `backend/`
  - `src/index.ts` — Express app entry and server bootstrap.
  - `src/lib/prisma.ts` — exports the Prisma client.
  - `src/routes/auth.ts` — login route (bcrypt compare, JWT sign).
  - `src/routes/patients.ts` — patient, encounter endpoints (CRUD operations backed by Prisma).
  - `src/middleware/auth.ts` — JWT verification and `requireRole` helper for RBAC.
  - `prisma/schema.prisma` — canonical data model (User, Patient, Encounter, Appointment).
  - `prisma/seed.js` — seed script that creates demo users and sample patient/encounter.

Data model (high-level)
- `User` — email, name, role (admin, doctor, nurse, staff), hashed password.
- `Patient` — demographic informations, `mrn` (medical record number), relation to `Encounter`.
- `Encounter` — visit notes, provider, timestamp, relation to `Patient`.
- `Appointment` — scheduled visits (some UI scaffolding exists; full CRUD may be partially mocked depending on branch state).

Authentication & Authorization
- JWT-based login: `POST /api/auth/login` returns a JWT for valid credentials.
- Frontend persists token in `localStorage` (AuthContext) and sends `Authorization: Bearer <token>` for protected requests.
- RBAC: `requireRole('doctor'|'admin')` middleware guards modify operations like creating/editing encounters.

How to demonstrate the app (interview checklist)
1. Show README and highlight the TL;DR + demo GIF.
2. Start backend and seed DB (show the seed script creates demo users).
3. Start frontend. Use the demo user dropdown on login page to quickly authenticate as `dr.jones@clinic.test` (password: `password`).
4. Open a patient (MRN-001) and create a new encounter — show the modal editor and the persisted entry after refresh (this proves end-to-end flow).
5. Show the RoleBadge and header changes when logging in as different roles (admin vs nurse) and explain RBAC implications.
6. If time, show Docker Compose bringing up both services.

Key talking points to impress hiring managers
- Full-stack integration: emphasize Prisma's typed client on the backend and how the frontend uses the same domain models (show `schema.prisma` and `EncounterEditor` form fields).
- Security basics: bcrypt for password hashing, JWT for auth, and role checks for protected routes.
- Engineering trade-offs: SQLite for dev simplicity; easy to swap to Postgres in production by changing `DATABASE_URL` and a migration.
- Accessibility & UX: accessible modal patterns (keyboard close/overlay click), focus management, simple but consistent Card component for UI cohesion.
- Developer ergonomics: mockApi fallback enables UI work without a running backend — discuss how this aids parallel frontend/back-end development.

Extending this project (tips and pointers)
- Add Appointment CRUD endpoints in the backend and wire frontend forms to persist appointments.
- Add tests: backend: Jest + supertest for route tests; frontend: React Testing Library + Jest for component and integration tests.
- Replace SQLite with Postgres for production; add Dockerized Postgres and environment-specific compose files.
- Add CI: GitHub Actions pipeline to run linters, tests, prisma migrate:deploy (for production), and build steps.

Troubleshooting (common issues & fixes)
- Prisma client errors after schema change: run `npx prisma generate` and re-run migrations. If relations fail, check reverse relations were declared.
- EADDRINUSE when starting backend: ensure no stale process is running on port 4000 (`ps aux | grep node` or `lsof -i:4000`), then restart.
- Seed login fails: ensure `JWT_SECRET` matches the one used by the server, and the seed script uses bcrypt to hash passwords.

Developer conventions & linting
- Keep UI components small and composable: prefer `Card`, `Modal` and `RoleBadge` usage.
- Use Zod for request validation in backend route handlers for predictable input validation.
- Run formatting and linters before commits (add Prettier / ESLint if desired). Consider a pre-commit hook with Husky for formatting checks.

Files to show in interview (recommended order)
1. `prisma/schema.prisma` — show DB design
2. `backend/src/routes/auth.ts` and `backend/src/middleware/auth.ts` — show authentication flow
3. `backend/prisma/seed.js` — show how demo users are created
4. `frontend/src/lib/mockApi.js` — show how backend is called (fallback explained)
5. `frontend/src/components/EncounterEditor.jsx` and `frontend/src/components/Modal.jsx` — show UI patterns and form handling
6. `frontend/src/components/Card.jsx` and `RoleBadge.jsx` — show reusable components

Next steps / optional improvements you can mention
- Add Swagger/OpenAPI spec for backend endpoints.
- Add a post-login onboarding demo-tour to highlight features quickly to reviewers.
- Add a production Dockerfile multi-stage build and a `docker-compose.prod.yml` with migrations applied at startup.

Contact & notes
- This guide is intentionally concise to fit a 5–10 minute interview walkthrough. If you'd like, I can generate a one-page slide deck or a short script you can read during a demo.

---
File location: `docs/DEVELOPER_GUIDE.md`

If you want, I can also convert this into `docs/DEVELOPER_GUIDE.pdf` or a formatted GitHub-flavored Markdown with images/diagrams. Tell me which you prefer next.


Next steps (optional)

Convert this guide into a one-page slide deck or PDF for interviews.
Add diagrams (arch/data flow) to the docs for visual impact.
Add a short demo script (2–3 minute) you can read while sharing your screen.