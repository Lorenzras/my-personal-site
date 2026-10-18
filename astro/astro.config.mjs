import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Static build: every page is pre-rendered to dist/<path>/index.html,
// matching the Next.js `output: 'export'` + `trailingSlash: true` layout.
export default defineConfig({
  site: 'https://www.lenzlab.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [react()],
  vite: {
    // Same "@/..." imports as the Next.js app (jsconfig paths).
    resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  },
});
