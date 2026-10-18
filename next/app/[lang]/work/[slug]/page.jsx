import { notFound } from 'next/navigation';
import LazyIsland from '@/components/LazyIsland';
import { Reveal } from '@/components/Reveal';
import { dictionaries, getContent, languages, site } from '@/content';

export const dynamicParams = false;
export function generateStaticParams() {
  return languages.flatMap((lang) => dictionaries[lang].work.items.map((w) => ({ lang, slug: w.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const item = getContent(lang).work.items.find((w) => w.slug === slug);
  const title = `${item?.title} · ${site.brand}`;
  const description = `${item?.problem} ${item?.built}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/work/${slug}/`,
      languages: { ...Object.fromEntries(languages.map((l) => [l, `/${l}/work/${slug}/`])), 'x-default': `/en/work/${slug}/` },
    },
    openGraph: { type: 'article', siteName: site.brand, title, description, url: `/${lang}/work/${slug}/`, images: [{ url: '/og.png', width: 1200, height: 630 }] },
  };
}

// One page per case study. The full demo (video or motion) gets added here
// later; until then it shows the summary and, for masking, the live mock.
// The text is server HTML; the cover / mock hydrates when it scrolls into view.
export default async function WorkPage({ params }) {
  const { lang, slug } = await params;
  const t = getContent(lang);
  const item = t.work.items.find((w) => w.slug === slug);
  if (!item) notFound();
  const labels = t.work.labels;
  return (
    <main className="block page">
      <Reveal>
        <p className="kicker">{t.work.kicker}</p>
        <h1 className="page-title">{item.title}</h1>
        <ul className="tags">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </Reveal>
      <div className="case">
        {[['problem', item.problem], ['built', item.built], ['outcome', item.outcome]].map(([k, v], i) => (
          <Reveal key={k} delay={0.1 * i} className="case-step">
            <p className="tag">{labels[k]}</p>
            <p>{v}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="page-demo">
        {slug.includes('mask')
          ? <LazyIsland name="maskPreview" props={{ t: t.masking, interactive: true }} />
          : <div className="page-cover"><LazyIsland name="workCover" props={{ slug }} /></div>}
      </Reveal>
      <Reveal className="coming">
        <span className="badge">{labels.comingSoon}</span>
        <p className="muted">{labels.demoNote}</p>
        <div className="actions">
          <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent(item.title)}`}>{t.contact.cta}</a>
          <a className="btn ghost" href={`/${lang}/#work`}>{labels.back}</a>
        </div>
      </Reveal>
    </main>
  );
}
