Netlify deployment checklist — Frontend (Vite + React)

This checklist explains how to deploy the `frontend` app to Netlify and connect it to the Render-hosted backend by setting the `VITE_API_BASE` environment variable.

Quick summary
- Build system: Vite (static build). Netlify will build the frontend and serve the `dist` folder from a global CDN.
- Important: The frontend expects an API base URL in `import.meta.env.VITE_API_BASE` (set in Netlify environment variables). Local dev automatically falls back to `http://127.0.0.1:4000`.

Steps
1) Connect the repo
- Go to Netlify dashboard > Sites > New site > Import from Git.
- Select Git provider (GitHub), authorize if needed, and pick the repository and the branch you want to deploy (e.g., `Branch-2` or `main`).

2) Configure build settings (monorepo)
- In the Netlify site setup UI, set the following:
  - Base directory: `frontend`
  - Build command: `npm run build`
  - Publish directory: `dist`

3) Add environment variables
- Go to Site settings > Build & deploy > Environment > Environment variables (or the Netlify UI's Environment > Variables section during site setup).
- Add `VITE_API_BASE` and set it to your Render backend URL, e.g.:

```
VITE_API_BASE=https://<your-backend>.onrender.com
```

- (Optional) Add additional variables for deploy previews or branch contexts in Netlify. Example:

```
VITE_API_BASE_preview=https://staging-backend.example.com
```

4) Add `netlify.toml` (already present)
- A `netlify.toml` is useful for build configuration and redirects; this repo includes one at the project root that sets the base directory and SPA redirect. Netlify will detect it automatically, but you can also set the values manually in the UI.

5) Configure build environment (Node version)
- Netlify uses an environment variable `NODE_VERSION` or `engines.node` in `package.json`. If you need a specific Node version, set it in `package.json` or in Netlify build environment (Build & deploy > Environment > Environment variables):

```
NODE_VERSION=20
```

6) Deploy preview settings (recommended)
- Enable Deploy Previews so pull requests build automatically. This helps verify `VITE_API_BASE` differences for preview branches. In the Netlify UI, under Site settings > Build & deploy > Deploy contexts, set environment variables for `deploy-preview`, `branch-deploy`, and `production` contexts if needed.

7) Build & Deploy
- Trigger a manual deploy or push a commit to the configured branch. Netlify will run:
  - `cd frontend && npm ci` (or `npm install`)
  - `npm run build` (produces `dist`)
  - Publish the `dist` directory to the CDN

8) Verify the frontend -> backend integration
- After deploy completes, open the site URL.
- Test login flow using the seeded demo user (e.g., `dr.jones@clinic.test` / `password`).
- Use browser devtools Network tab to confirm that requests are sent to `https://<your-backend>.onrender.com/api/...` (or the `VITE_API_BASE` you set).

9) Troubleshooting
- 404s for client-side routes: ensure `netlify.toml` contains a redirect from `/*` to `/index.html` (this repo already includes it).
- API calls failing (CORS / 401):
  - On the backend (Render), allow the Netlify domain in CORS or use a permissive policy for demo.
  - Ensure `VITE_API_BASE` points to the correct backend URL and includes HTTPS.
- Wrong API URL at runtime: remember `VITE_` env vars are baked into the frontend at build time. If you change `VITE_API_BASE` after a build, you must rebuild and redeploy the frontend.

10) Security & production notes
- Never commit secrets. Use Netlify environment variables to inject build-time values.
- If you add server-side rendering or functions later, consider environment-specific configuration to avoid leaking production API keys into preview builds.

Helpful Netlify settings to review
- Site settings > Build & deploy > Continuous Deployment: enable auto-publishing from the selected branch.
- Deploy contexts: set `VITE_API_BASE` differently for `production` vs `deploy-preview` if you want preview builds to hit staging APIs.
- Headers & redirects: you can configure extra security headers in Netlify UI or via `_headers` file if you add one.

Post-deploy verification commands (quick)

```bash
# check site (replace <netlify-site> with your netlify app domain)
curl -I https://<netlify-site>.netlify.app

# smoke test login to backend (replace <backend-url>)
curl -X POST https://<backend-url>/api/auth/login -H 'Content-Type: application/json' -d '{"email":"dr.jones@clinic.test","password":"password"}'
```

If you'd like, I can also:
- Create a short `docs/netlify-setup.md` with screenshots of the Netlify UI steps, or
- Add a small CI step to automatically set `VITE_API_BASE` during deploys using Netlify CLI / GitHub Actions.

File location: `docs/netlify.md`
