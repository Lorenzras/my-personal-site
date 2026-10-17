import MaskPreview from '@/components/MaskPreview';
import { Reveal } from '@/components/Shell';
import { maskingDemo, profile } from '@/content/site';

export const metadata = {
  title: 'AI document masking · LenzLab',
  description: 'Personal data in business documents, found and masked by AI on AWS Bedrock.',
  alternates: { canonical: '/masking/' },
};

// Placeholder until the full video / motion demo is ready.
export default function Masking() {
  return (
    <main className="block page">
      <Reveal>
        <p className="kicker">{maskingDemo.kicker}</p>
        <h1 className="page-title">{maskingDemo.title}</h1>
        <p className="lead">{maskingDemo.body}</p>
      </Reveal>
      <Reveal delay={0.15} className="page-demo">
        <MaskPreview loop />
      </Reveal>
      <Reveal delay={0.2} className="coming">
        <span className="badge">Coming soon</span>
        <p className="muted">Full walkthrough video: upload a real-looking document, watch it get masked, and review the result in kintone.</p>
        <div className="actions">
          <a className="btn" href={`mailto:${profile.email}?subject=Document%20masking`}>Ask about masking</a>
          <a className="btn ghost" href="/">← Back home</a>
        </div>
      </Reveal>
    </main>
  );
}
