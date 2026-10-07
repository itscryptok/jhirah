# Jhirah — static clone

Static build of the **Jhirah** marketing site — email marketing for local businesses.
Canonical domain: **https://jhirah.com/**

Cloned from the original Replit project (Vite + React 18 + wouter) as a
fully static site. All backend-dependent features (auth, check-ins, campaigns,
analytics, admin) are stubbed to their signed-out/empty states.

## Build

```bash
npm ci && npm run build   # outputs dist/
```

## Deploy

Render static site: build `npm ci && npm run build`, publish `dist/`,
SPA rewrite `/* → /index.html` (client-side wouter routing).
