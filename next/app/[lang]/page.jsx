import LazyIsland from '@/components/LazyIsland';
import { Contact, Difference } from '@/components/StaticSections';
import { getContent } from '@/content';

// The hero hydrates straight away. Difference and Contact are plain server
// HTML. The other sections are client islands that are server-rendered but
// only load and hydrate when they near the viewport; Pains and Pipeline load
// when the browser is idle (they change height under reduced motion, and
// their pinned scroll state should be live before they are reached).
export default async function Home({ params }) {
  const { lang } = await params;
  const t = getContent(lang);
  return (
    <main>
      <LazyIsland name="hero" when="now" props={{ t: t.hero, lang }} />
      <LazyIsland name="pains" when="idle" props={{ t: t.pains, lang }} />
      <Difference t={t.difference} />
      <LazyIsland name="services" props={{ t: t.services }} />
      <LazyIsland name="integrations" props={{ t: t.integrations }} />
      <LazyIsland name="masking" props={{ t: t.masking, lang }} />
      <LazyIsland name="pipeline" when="idle" props={{ t: t.pipeline }} />
      <LazyIsland name="security" props={{ t: t.security }} />
      <LazyIsland name="process" props={{ t: t.process }} />
      <LazyIsland name="work" props={{ t: t.work, lang }} />
      <Contact t={t.contact} />
    </main>
  );
}
