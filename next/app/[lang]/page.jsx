import Hero from '@/components/Hero';
import Pains from '@/components/Pains';
import Integrations from '@/components/Integrations';
import Pipeline from '@/components/Pipeline';
import { Contact, Difference, Process, Security, Services, Work } from '@/components/Sections';
import { MaskingSection } from '@/components/MaskPreview';
import { getContent } from '@/content';

export default async function Home({ params }) {
  const { lang } = await params;
  const t = getContent(lang);
  return (
    <main>
      <Hero t={t.hero} lang={lang} />
      <Pains t={t.pains} lang={lang} />
      <Difference t={t.difference} />
      <Services t={t.services} />
      <Integrations t={t.integrations} />
      <MaskingSection t={t.masking} lang={lang} />
      <Pipeline t={t.pipeline} />
      <Security t={t.security} />
      <Process t={t.process} />
      <Work t={t.work} lang={lang} />
      <Contact t={t.contact} />
    </main>
  );
}
