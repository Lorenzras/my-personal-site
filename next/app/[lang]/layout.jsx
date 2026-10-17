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
      languages: { ...Object.fromEntries(languages.map((l) => [l, `/${l}/`])), 'x-default': '/en/' },
    },
    openGraph: {
      type: 'website',
      siteName: site.brand,
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}/`,
      locale: t.meta.locale,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: site.brand }],
    },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: ['/og.png'] },
    icons: { icon: '/icon.svg' },
  };
}

// Structured data: the business, brand first (no personal details).
const jsonLd = (lang, t) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.brand,
  url: `${site.url}/${lang}/`,
  email: site.email,
  description: t.meta.description,
  areaServed: 'JP',
  availableLanguage: ['ja', 'en'],
  knowsAbout: ['System integration', 'kintone', 'Backlog', 'AWS Bedrock', 'Workflow automation', 'Document masking'],
  makesOffer: t.services.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.outcome } })),
});

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang, t)) }} />
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
