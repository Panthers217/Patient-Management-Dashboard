# Video Recording: Action Checklist (what to show & click)

Use this checklist as a step-by-step guide while screen-recording your 6–8 minute demo. Keep each action short and narrate the intent (15–30s per step where noted).

Preparation
- Open your browser to the deployed frontend (Netlify) and have your Render dashboard open in another tab.
- Open your code editor with the repo and these files visible in the sidebar: `prisma/schema.prisma`, `backend/src/middleware/auth.ts`, `frontend/src/lib/mockApi.js`, `frontend/src/components/EncounterEditor.jsx`, `frontend/src/components/Card.jsx`.
- Start your screen recorder and microphone. Use a terminal window for quick commands.

Recording actions (ordered)

1. Title + Intro (0:00–0:15)
- Action: Show repo name in your editor or the README in the browser.
- Say: "Hi, I’m <Name>. This is Patient Management Dashboard — a small full‑stack demo built with React, Vite, Express, and Prisma."

2. Quick UI tour (0:15–0:45)
- Action: Switch to the Netlify-hosted site tab. Show the landing/login page.
- Click: demo user dropdown (or fill demo credentials) and log in as `dr.jones@clinic.test`.
- Say: "I use seeded demo users for fast demos."

3. Show header & role indicator (0:45–0:55)
- Action: Point to the RoleBadge and header user name.
- Say: "The header shows the logged-in user and role, used by RBAC for protecting routes."

4. Open a patient and add an encounter (0:55–1:40)
- Action: Navigate to `Patients` → open `MRN-001`.
- Click: `Add Encounter` (open modal), type a short note, select date/provider, click `Save`.
- Action: Refresh the page to show the new encounter persisted.
- Say: "This demonstrates end-to-end persistence: frontend → backend → Prisma → Postgres."

5. Edit an encounter (1:40–1:55)
- Action: Click an existing encounter → Edit → change note → Save.
- Say: "Edits go through protected endpoints — only authorized roles can modify."

6. Appointments flow quick demo (1:55–2:20)
- Action: Open `Appointments` page, create or edit a sample appointment if available.
- Say: "Appointments UI is scaffolded and integrates with the calendar; full CRUD can be extended similarly."

7. Responsive check (2:20–2:40)
- Action: Toggle browser devtools responsive mode (mobile view) and demonstrate the UI stacking (cards, forms, buttons).
- Say: "Tailwind breakpoints and max-width tokens ensure readable layouts on small screens."

8. Show mockApi fallback (2:40–3:00)
- Action: In another terminal, stop the backend (or simulate network offline), then perform an action in the UI that uses `mockApi` (open patient, add encounter).
- Say: "The UI has a `mockApi` fallback for offline/demo mode so product development can continue without a running backend."

9. Backend code walk-through (3:00–3:40)
- Action: Switch to the editor, open `backend/prisma/schema.prisma` (scroll slowly) and explain models briefly.
- Click: `backend/src/middleware/auth.ts` — highlight JWT verification and `requireRole` usage.
- Say: "Prisma provides a typed client; auth uses bcrypt + JWT and role-based middleware."

10. Frontend code walk-through (3:40–4:20)
- Action: Open `frontend/src/lib/mockApi.js` and show the VITE_API_BASE usage and fetch patterns.
- Click: `frontend/src/components/EncounterEditor.jsx` and `Card.jsx` and briefly explain component reuse and form handling.
- Say: "Components are small and composable; `Card` centralizes visual spacing."

11. Deployment & infra (4:20–4:50)
- Action: Switch to Render dashboard tab showing the backend service and environment variables.
- Show Netlify site settings with `VITE_API_BASE` env var set.
- Say: "Backend runs on Render with a managed Postgres DB; frontend is a static build on Netlify."

12. Dev & troubleshooting notes (4:50–5:20)
- Action: Show terminal with concise commands for `seed`, `migrate`, and `dev` (paste from docs).
- Say: "If you see TypeScript build issues on Render, ensure the Root Directory is `backend` and the build command installs devDependencies."

13. Closing (5:20–5:40)
- Action: Return to the app UI, briefly repeat the highlight bullets on screen (reuse slide or README lines).
- Say: "That’s the quick demo — happy to dive deeper into auth, Prisma schema, or deployment."

Recording tips (keep it tight)
- Keep each action short and deliberate — click, pause, comment (5–10s), move on.
- Narration: explain why you made technical choices, not just what you clicked.
- Camera: optional — show your face briefly at the start for personalization.
- Audio: use a good headset/microphone and remove background noise.
- Rehearse the flow twice: one practice run, one recorded take.

Files to show during recording (quick list)
- `README.md`, `prisma/schema.prisma`, `backend/src/middleware/auth.ts`, `frontend/src/lib/mockApi.js`, `frontend/src/components/EncounterEditor.jsx`, `frontend/src/components/Card.jsx`, `docs/render.md`, `docs/netlify.md`.

Optional: add lower-third slides or text overlays for the key talking points (Architecture, Security, Deployment, Testing).

---
File: `docs/VIDEO_ACTIONS.md`
