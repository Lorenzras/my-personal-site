import { dictionaries, languages, site } from '@/content';

export const dynamic = 'force-static';

// Every page in every language, each listing its translations.
export default function sitemap() {
  const paths = ['/', ...dictionaries.en.work.items.map((w) => `/work/${w.slug}/`)];
  return paths.flatMap((p) =>
    languages.map((lang) => ({
      url: `${site.url}/${lang}${p}`,
      changeFrequency: 'monthly',
      priority: p === '/' ? 1 : 0.6,
      alternates: { languages: Object.fromEntries(languages.map((l) => [l, `${site.url}/${l}${p}`])) },
    })),
  );
}
