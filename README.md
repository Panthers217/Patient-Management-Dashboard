# Patient-Management-Dashboard

A secure, role-based web app for small clinics and telehealth practices to manage day-to-day operations: patients, appointments, clinical notes, documents, and basic analytics. This repository contains a frontend scaffold (Vite + React + Tailwind) and a minimal backend scaffold (Express + Prisma + Zod) to get you started.

Who uses it:
- Admin: sets up the clinic, staff accounts, roles, and permissions.
- Clinicians (Doctor/Nurse/PA): view schedules, document visits, order labs, upload results.
- Front Desk: register patients, book/reschedule appointments, handle intake forms.

Quick start (requirements)
- Node.js 18+ and npm

Frontend (dev)

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server typically runs on port 5173. Open the forwarded port or http://localhost:5173.

Backend (dev)

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

The Express server listens on port 4000 by default and exposes demo endpoints under `/api/*` (auth, patients, appointments).

Run both concurrently

Option A — two terminals (recommended):

Terminal 1 (frontend):
```bash
cd frontend && npm run dev
```

Terminal 2 (backend):
```bash
cd backend && npm run dev
```

Option B — single command using `concurrently` (optional):

```bash
# from repo root
npm i -D concurrently
npx concurrently "npm --prefix frontend run dev" "npm --prefix backend run dev"
```

Notes & next steps
- The frontend currently uses a `fakeAuth` demo service. Replace with backend auth (`/api/auth/login`) once the backend is running.
- Prisma is configured for SQLite in `backend/prisma/schema.prisma`. To use MySQL, change the datasource provider and set `DATABASE_URL` in `backend/.env` accordingly.
- Security/safety: this scaffold is for development. Add proper JWT signing, password hashing, RBAC middleware, audit logging, validation, and file upload signed-url flows before handling PHI in production.

Project layout
- `frontend/` — Vite + React frontend (src, config, package.json)
- `backend/` — Express + Prisma backend scaffold (src, prisma, package.json)

If you want, I can now:
- Replace the demo auth with Prisma-backed JWT auth and add RBAC middleware, or
- Wire the frontend to call the backend APIs for login and patients, or
- Add tests and a simple Docker Compose for local orchestration.
# Patient-Management-Dashboard

A secure, role-based web app for small clinics and telehealth practices to manage day-to-day operations: patients, appointments, clinical notes, documents, and basic analytics. It’s an opinionated “EHR-lite” that demonstrates real healthcare workflows with privacy and auditability in mind.

Who uses it:
- Admin: sets up the clinic, staff accounts, roles, and permissions.
- Clinicians (Doctor/Nurse/PA): view schedules, document visits, order labs, upload results.
- Front Desk: register patients, book/reschedule appointments, handle intake forms.

What it does (end-to-end):
- Secure authentication & RBAC: email/password login with hashed credentials, JWT sessions, roles (Admin/Doctor/Nurse/Staff). Protected routes and permission checks on every action.
- Patient profiles: demographics, contact info, insurance, allergies, problem list, vitals trend, and a timeline of encounters.
- Appointments & calendar: create, reschedule, cancel; day/week views; status (booked/checked-in/complete); optional email/SMS reminders.
- Clinical documentation: structured visit notes (subjective/objective/assessment/plan), templates, attachments (PDFs, images, lab results).
- Orders & results: record labs/imaging orders; attach results; mark as reviewed; notify assigned clinician.
- Search & filters: global search by name, MRN, phone; filter by date, provider, status.
- Analytics dashboard: daily/weekly visit volumes, no-show rate, top diagnoses/reasons for visit, average cycle time. Export CSV.
- Audit log: who did what, to which record, and when (create/update/view events) for traceability.
- Data portability: export patient summaries, encounter notes, and appointment reports.

Data model (highlight):
- SQL (mySql): Users, Roles, Patients, Appointments, Encounters, Orders, Results, AuditLogs.
- Mongo (optional hybrid): flexible storage for document metadata, form schemas, rich note revisions.

Privacy & security cues:
- Principle of least privilege, encrypted secrets, server-side validation.
- PHI-aware UI (masked identifiers), inactivity timeouts, view logging.
- File uploads via signed URLs; virus/mime checks before persistence.

Architecture snapshot:
- Frontend: React + Tailwind, React Router, TanStack Query; accessible forms, keyboard-navigable calendar, responsive layout.
- Backend: Express APIs with Zod validation; Prisma (mySql) for relational data; optional BullMQ/Redis workers for reminders & nightly reports.
- Integrations: email/SMS (SendGrid/Twilio) for reminders, CSV export; room for FHIR mapping as a stretch goal.

Getting started (frontend only):

Requirements:
- Node.js 18+ and npm

Install and run:

```bash
npm install
npm run dev
```

The dev server will start and serve the Vite React app. This repository currently contains a frontend scaffold (React + Tailwind) with example pages and a mock auth service.

Project layout (frontend):
- `index.html` - Vite entry
- `src/main.jsx` - React entry
- `src/App.jsx` - Routes and protected wrapper
- `src/auth` - Auth context and a `fakeAuth` demo service
- `src/pages` - Dashboard, Patients, Appointments, Login
- `src/components` - Layout and shared UI

Next steps:
- Wire backend APIs (Express + Prisma) and replace `fakeAuth` with real authentication.
- Implement RBAC checks on the server and client. Add file-upload signed URL flows and PHI logging.
- Add tests, CI, and containerization for deployment.
# Backend quickstart
This repo includes a minimal backend scaffold under `backend/` using Express + Prisma + Zod. See `backend/README.md` for setup instructions. By default the Prisma schema uses SQLite for local development; change `DATABASE_URL` and the datasource provider to switch to MySQL.

To start the backend locally (from repo root):

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

The backend scaffold exposes simple routes under `/api/*` (auth/patients/appointments) that the frontend can call once wired.
# Patient-Management-Dashboard
A secure, role-based web app for small clinics and telehealth practices to manage day-to-day operations: patients, appointments, clinical notes, documents, and basic analytics. It’s an opinionated “EHR-lite” that shows you can build real healthcare workflows with privacy and auditability in mind.
