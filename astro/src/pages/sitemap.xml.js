import { dictionaries, languages, site } from '@/content';

// Every page in every language, each listing its translations
// (same output as Next.js' app/sitemap.js).
export function GET() {
  const paths = ['/', ...dictionaries.en.work.items.map((w) => `/work/${w.slug}/`)];
  const urls = paths.flatMap((p) =>
    languages.map((lang) => [
      '<url>',
      `<loc>${site.url}/${lang}${p}</loc>`,
      ...languages.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${site.url}/${l}${p}" />`),
      '<changefreq>monthly</changefreq>',
      `<priority>${p === '/' ? 1 : 0.6}</priority>`,
      '</url>',
    ].join('\n')),
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
