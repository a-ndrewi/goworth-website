# GoWorth website

Landing page for [GoWorth](https://github.com/a-ndrewi/GoWorth), the travel planner for iPhone and Android: app captures, product videos and App Store / Google Play download buttons. English and Romanian.

Built with React 19, Vite, Tailwind CSS 4 and Motion.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Before launch

- Set the real App Store URL in [`src/config.ts`](src/config.ts). The Google Play URL already uses the app's package, `com.andrewi.goworth`.
- `links.site` is encoded in the "Scan to download" QR code. Point it at the production domain.
- Set `links.webApp` to show an "Open in browser" button next to the store badges.

## Content

- `public/screens`: captures from the app (dark theme).
- `public/video`: the two vertical product ads, re-encoded at 720×1280 for the web.
- `public/photos`: destination photos from Wikimedia Commons, all CC0. Sources and creators are in `public/photos/provenance.json`.
- All copy lives in [`src/i18n.tsx`](src/i18n.tsx).
- `src/legal/legal.ts` and `legal-ro.ts` are copied from the app (`goworth/src/data`). Keep them in sync when the app's legal texts change. They open at `#/legal/privacy`, `terms`, `subscriptions` and `credits`.

## Deploy

Pushes to `main` build and deploy to GitHub Pages through `.github/workflows/deploy.yml`. Enable it once under **Settings → Pages → Source: GitHub Actions**. The build uses a relative base path, so it also works on any static host (Vercel, Netlify, Cloudflare Pages) with `npm run build` and `dist` as the output directory.
