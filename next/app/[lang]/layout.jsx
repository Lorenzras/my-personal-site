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

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d12' },
  ],
};

// Applies a theme the visitor picked earlier before first paint (no flash).
const themeScript = "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}";

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const t = getContent(lang);
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Shell lang={lang} nav={t.nav} themeLabel={t.meta.themeToggle}>
          {children}
          <footer className="footer">© {new Date().getFullYear()} {site.name} · {site.brand}</footer>
        </Shell>
      </body>
    </html>
  );
}
