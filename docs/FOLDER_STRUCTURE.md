# Project Folder Structure

Root layout (top-level folders and important files):

```
Patient-Management-Dashboard/
├─ .vscode/                       # editor settings (MCP server configured here)
├─ backend/                       # Express + Prisma backend (TypeScript)
│  ├─ prisma/
│  │  ├─ schema.prisma            # data model (User, Patient, Encounter, Appointment)
│  │  └─ seed.js                  # idempotent seed script
│  ├─ src/
│  │  ├─ middleware/
│  │  │  └─ auth.ts               # JWT auth + requireRole middleware
│  │  ├─ routes/
│  │  │  ├─ auth.ts               # login route
│  │  │  ├─ patients.ts           # patient & encounter routes
│  │  │  └─ appointments.ts       # appointment routes (scaffold)
│  │  └─ server.ts                # Express app bootstrap
  │  ├─ package.json
  │  └─ tsconfig.json
├─ frontend/                      # Vite + React frontend
│  ├─ public/                     # static assets
│  ├─ src/
│  │  ├─ auth/                    # AuthContext, fakeAuth
│  │  ├─ components/              # Card, Modal, RoleBadge, editors, toasts
│  │  │  ├─ Card.jsx
│  │  │  ├─ Modal.jsx
│  │  │  ├─ RoleBadge.jsx
│  │  │  ├─ EncounterEditor.jsx
│  │  │  └─ AppointmentEditor.jsx
│  │  ├─ lib/
│  │  │  └─ mockApi.js            # backend calls with in-memory fallback
│  │  ├─ pages/                   # route pages: Login, Dashboard, Patients, Appointments
│  │  └─ main.jsx / App.jsx       # app entry & routes
│  ├─ package.json
│  └─ tailwind.config.cjs         # contains `xs` breakpoint and maxWidth tokens
├─ demo/                          # demo GIF or media
├─ docs/                          # project docs & deployment checklists
│  ├─ VIDEO_WALKTHROUGH.md
│  ├─ VIDEO_ACTIONS.md
│  ├─ render.md                   # Render deployment checklist
│  ├─ netlify.md                  # Netlify deployment checklist
│  └─ DEVELOPER_GUIDE.md         # developer-facing guide
├─ netlify.toml                   # Netlify monorepo build config
├─ docker-compose.yml             # optional dev compose
└─ README.md

```

Notes
- The frontend uses Tailwind CSS and a small component library (`Card`, `Modal`, `RoleBadge`) for consistent UI.
- `frontend/src/lib/mockApi.js` allows UI work without a running backend by falling back to in-memory data.
- Backend uses Prisma (local SQLite in dev, recommended Postgres in Render) and exposes REST endpoints protected by JWT + role middleware.
- Deployment flow: backend → Render (managed Postgres + Prisma migrations), frontend → Netlify (set `VITE_API_BASE` to Render URL).

File added: `docs/FOLDER_STRUCTURE.md`
