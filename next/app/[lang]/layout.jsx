import '../globals.css';
import Shell from '@/components/Shell';
import { getContent, languages, site } from '@/content';

export const dynamicParams = false;
export const generateStaticParams = () => languages.map((lang) => ({ lang }));

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getContent(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${lang}/`,
      languages: Object.fromEntries(languages.map((l) => [l, `/${l}/`])),
    },
    icons: { icon: '/icon.svg' },
  };
}

export const viewport = { themeColor: '#0b0d12' };

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const t = getContent(lang);
  return (
    <html lang={lang}>
      <body>
        <Shell lang={lang} nav={t.nav}>
          {children}
          <footer className="footer">© {new Date().getFullYear()} {site.name} · {site.brand}</footer>
        </Shell>
      </body>
    </html>
  );
}
