# LenzLab 3D: Automation Factory

The new lenzlab.com homepage: a 3D conveyor line built with Next.js, React Three Fiber and drei.
Scrolling moves the camera from the intake hopper, through one machine per skill area
(RPA → AI & Data → Backend → Frontend → Cloud), into the project showroom and out to the
shipping dock (contact). Work items change form at each station: paper → stamped form →
data orb → API capsule → UI window → parcel. Everything is procedural (no downloaded assets).

Add `?quality=low` to the URL to force the lighter render path (phones get it automatically).

## Run

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## Edit content

Everything visible on the page lives in `content/site.js` (profile, stations, projects).

## Add a 3D project

1. Put a `.glb` file in `public/models/`.
2. Add `model: '/models/your-file.glb'` to the project in `content/site.js`.

Its pedestal in the showroom will show the model instead of the built-in placeholder (`exhibit`).

## Deploy

`amplify.yml` in the repo root builds this folder and publishes `next/out` on AWS Amplify.
