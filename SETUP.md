# SETUP — your part: GitHub repo + Vercel account

Everything up to here is done: the app is built, committed locally on `main`,
the build passes, and SSH to GitHub already works (`xtiandanos`).
This checklist is the part only you can do — it needs your logins.

Work through Parts 1–2 (GitHub), then Parts 3–5 (Vercel). ~10 minutes total.

---

## Part 1 — Create the GitHub repo (browser, ~1 min)

1. Open **https://github.com/new**
2. Fill in exactly:
   - **Repository name:** `vercel-demo`
   - **Visibility:** `Private` (Vercel deploys private repos fine on the free plan)
   - ⚠️ **Leave ALL checkboxes unchecked** — no README, no .gitignore, no license.
     The repo must be *empty*, because our local commit already has all of that.
3. Click **Create repository**

## Part 2 — Push the code (terminal)

Run these from the project folder (`~/Workspace/React/vercel-demo`) —
or type them in the Claude session with a `! ` prefix so the output lands in our chat:

```bash
git remote add origin git@github.com:xtiandanos/vercel-demo.git
git push -u origin main
```

✅ Done when: GitHub shows 16 files and a commit `feat: vercel demo app…` on `main`.

## Part 3 — Create the Vercel account (browser, ~2 min)

1. Open **https://vercel.com** → **Sign Up** → **Continue with GitHub**
   (using GitHub login is what lets Vercel watch your repos and auto-deploy)
2. Authorize the Vercel app when GitHub asks. You can scope access to selected
   repositories or all — either is fine for this demo.

The free **Hobby** plan is all you need (personal, non-commercial use).

## Part 4 — Import the repo and deploy (browser, ~3 min)

1. Vercel dashboard → **Add New… → Project**
2. Find `vercel-demo` in the repo list → **Import**
   (first time: click *Adjust GitHub App Permissions* if the repo isn't listed)
3. Look at what Vercel filled in — **don't change anything**:
   - Framework Preset: **Vite**
   - Build Command: `yarn build`
   - Output Directory: `dist`

   This is the "framework preset" doing its job — Vercel recognized the project type.
4. Expand **Environment Variables** and add this one row:

   | Name | Value | Environments |
   |---|---|---|
   | `VITE_APP_NAME` | `Vercel production build` | Production, Preview, Development (all three) |

5. Click **Deploy** and watch the build log — it runs the same `yarn build` we ran locally.
6. When it finishes, click **Continue to Dashboard** and note your URL:
   `https://vercel-demo-<something>.vercel.app`

## Part 5 — Verify it worked (browser)

- [ ] Home page shows **🚀 Vercel production build** — proves the env var from
      the dashboard was baked into the build (local dev says "local dev build")
- [ ] Click **About**, then **refresh the page (⌘R)** — it still loads.
      That's `vercel.json`'s rewrite working; without it this refresh 404s.
- [ ] In the Vercel dashboard → **Deployments** tab: one deployment, labeled **Production**

---

## After this

Come back to the Claude session and say you're deployed — we'll do the fun part:
push a change and watch it auto-deploy, open a PR to see preview URLs, and
practice a rollback. (This is also covered in the repo's `README.md`.)
