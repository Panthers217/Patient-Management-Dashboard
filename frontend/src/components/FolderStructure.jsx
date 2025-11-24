import React from 'react'
import Modal from './Modal'

const folderStructure = `Patient-Management-Dashboard/
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
│  └─ tailwind.config.cjs         # contains xs breakpoint and maxWidth tokens
├─ demo/                          # demo GIF or media
├─ docs/                          # project docs & deployment checklists
│  ├─ VIDEO_WALKTHROUGH.md
│  ├─ VIDEO_ACTIONS.md
│  ├─ render.md                   # Render deployment checklist
│  ├─ netlify.md                  # Netlify deployment checklist
│  └─ DEVELOPER_GUIDE.md          # developer-facing guide
├─ netlify.toml                   # Netlify monorepo build config
├─ docker-compose.yml             # optional dev compose
└─ README.md`

export default function FolderStructure({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Project Folder Structure">
      <div className="max-h-[70vh] overflow-y-auto">
        <pre className="text-xs sm:text-sm font-mono text-slate-700 whitespace-pre overflow-x-auto bg-slate-50 p-4 rounded border border-slate-200">
{folderStructure}
        </pre>
        <div className="mt-4 text-sm text-slate-600">
          <p className="mb-2"><strong>Notes:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Frontend uses Tailwind CSS and reusable components (Card, Modal, RoleBadge)</li>
            <li><code className="bg-slate-100 px-1 rounded">mockApi.js</code> allows UI work without a running backend</li>
            <li>Backend uses Prisma (SQLite dev, Postgres production) with JWT auth and RBAC</li>
            <li>Deployment: backend → Render, frontend → Netlify</li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}
