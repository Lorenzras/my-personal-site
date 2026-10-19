# LenzLab: motion site

The lenzlab.com homepage, motion version. Next.js (static export) + [Motion](https://motion.dev).
No 3D; the 3D "Automation Factory" lives on its own branch.

## Languages

Each language has its own URL: `/en/`, `/ja/`. Visiting `/` redirects to the browser's language
(falls back to English). All copy lives in `content/<lang>.js`; every file has the same shape.
To add a language, copy `content/en.js`, translate the strings, and register it in `content/index.js` and `content/site.js`.

## Page

Pain points → why LenzLab → services → integration hub → AI masking → Bedrock pipeline → security →
process → work → contact. Scroll-driven scenes (pains, pipeline, masking, security, process) play
forward when scrolling down and reverse when scrolling up. The hero, pain tabs, services, integration
hub, masking form and work cards are interactive. Animations respect the OS "reduce motion" setting.

Each work item gets a page at `/<lang>/work/<slug>/` (demo placeholder for now).
Prices marked `confirm: true` show a "TBC" badge until confirmed.

## Run

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## Deploy

`amplify.yml` in the repo root builds this folder and serves `next/out`.
