import { site } from '@/content';

// Same output as Next.js' app/robots.js.
export function GET() {
  const body = `User-Agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
