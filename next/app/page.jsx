import Hero from '@/components/Hero';
import Pains from '@/components/Pains';
import { Contact, Ideas, MaskingTeaser, Pipeline, Process, Projects, Security, Services } from '@/components/Sections';

export default function Home() {
  return (
    <main>
      <Hero />
      <Pains />
      <MaskingTeaser />
      <Services />
      <Pipeline />
      <Security />
      <Ideas />
      <Process />
      <Projects />
      <Contact />
    </main>
  );
}
