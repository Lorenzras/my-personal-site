# LenzLab: motion site

The lenzlab.com homepage, motion version. Next.js (static export) + [Motion](https://motion.dev) for
scroll-linked and in-view animation. No 3D; the 3D "Automation Factory" lives on its own branch.

The page leads with client pain points, each crossed out as you scroll and replaced with the fix,
then services, an animated AWS Bedrock pipeline, security basics, integration ideas, process, work and contact.
`/masking/` is a placeholder for the AI document masking demo (an animated mock document for now).

Animations respect the OS "reduce motion" setting.

## Run

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## Edit content

Everything visible lives in `content/site.js`.
Items with `suggested: true` are proposed ideas and show a "Proposed" badge: delete them, or remove
the flag once they're true.

## Deploy

`amplify.yml` in the repo root builds this folder and serves `next/out`.
