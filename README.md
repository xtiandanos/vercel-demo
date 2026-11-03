# vercel-demo — deploying React + Vite to Vercel

A tiny teaching app: two routes, one env var, one `vercel.json`. Deployed to
Vercel through the GitHub integration. Each piece below demonstrates something
you'll hit on every real project.

## What each file teaches

| File | Lesson |
|---|---|
| `src/main.jsx` | `BrowserRouter` puts the app in charge of the URL |
| `src/pages/About.jsx` | The SPA refresh gotcha + how the rewrite fixes it |
| `vercel.json` | Rewrite all paths to `index.html` so deep links survive refresh |
| `.env.example` / `.env` | Build-time env vars; `.env` is gitignored, never committed |
| `src/pages/Home.jsx` | `import.meta.env.VITE_*` — values are **baked in at build time** |

## The full setup, start to finish

### 1. Scaffold (done once, locally)

```bash
npx create-vite@latest vercel-demo --template react
cd vercel-demo
yarn                                  # install
yarn add react-router-dom             # router for the SPA lesson
yarn dev                              # http://localhost:5173
```

> Note: `yarn create vite` fails on this machine because the yarn global
> create-cache pins `create-strapi-app` to Node ≤18 — `npx create-vite` skips
> that cache. Everything else uses yarn normally.

### 2. Put it on GitHub

```bash
git init
git add . && git commit -m "feat: vercel demo app"
gh repo create vercel-demo --private --source . --push
```

(Or create the repo at github.com/new, then `git remote add origin …` + `git push -u origin main`.)

### 3. Connect Vercel (browser, ~2 minutes)

1. **vercel.com → Sign Up → Continue with GitHub** — this grants Vercel access
   to your repos (you can scope it to selected repos).
2. Dashboard → **Add New… → Project** → pick `vercel-demo` → **Import**.
3. Vercel auto-detects **Vite** and fills in:
   - Framework Preset: `Vite`
   - Build Command: `yarn build`
   - Output Directory: `dist`
   - Install Command: `yarn install`

   You normally change nothing here — that's the "framework preset" concept.
4. Before deploying, expand **Environment Variables** and add:

   | Name | Value | Environments |
   |---|---|---|
   | `VITE_APP_NAME` | `Vercel production build` | Production, Preview, Development |

5. Click **Deploy**. ~30 seconds later the app is live at
   `vercel-demo-<hash>.vercel.app`.

### 4. Verify the deployment

- Home page shows **"🚀 Vercel production build"** → the dashboard env var was
  baked into the build (local runs say "local dev build" instead).
- Open `/about` and **refresh** → still works, thanks to the `vercel.json` rewrite.
  Remove that file, push, and refresh again to see the 404 it prevents.

### 5. The day-to-day loop

- **Push to `main`** → Vercel builds automatically → production URL updates.
  Every build also gets its own permanent URL (`<project>-<hash>.vercel.app`).
- **Push a branch + open a PR** → Vercel comments a **Preview** URL on the PR.
  Merge the PR → production redeploys.
- **Deployments tab** → open any deployment for logs, or **… → Promote to
  Production / Instant Rollback** to revert in seconds.
- **Changed an env var?** Nothing happens until you **redeploy** — values are
  read at build time (Deployments → ⋯ → Redeploy).

## Things worth knowing

- **Vercel serves files, not servers.** Static frontend + serverless functions
  (`api/` directory) only — no long-running Node process, no websocket server,
  no background jobs.
- **Hobby (free) plan** is for non-commercial use; team/commercial use needs Pro.
- **Custom domain**: Project → Settings → Domains → add it, then point DNS as
  instructed (A record `76.76.21.21` or CNAME `cname.vercel-dns.com`).
  HTTPS certificates are automatic.
- **Secrets**: never put secrets in `VITE_*` vars — they end up in the public
  JS bundle. Client-exposed vars are for config, not credentials.
- **The CLI** (optional): `yarn global add vercel`, then `vercel` in any project
  for a direct deploy without touching GitHub.

## Local development

```bash
yarn dev        # dev server with HMR
yarn build      # production build to dist/ (what Vercel runs)
yarn preview    # serve the built dist/ locally
```
