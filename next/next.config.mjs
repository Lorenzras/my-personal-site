import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the old Gatsby site in the parent folder out of this build.
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
