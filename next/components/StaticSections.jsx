// Server components: plain HTML, no React code shipped. Only the animated
// icons inside "Difference" hydrate, when they scroll into view.
import { site } from '@/content';
import LazyIsland from './LazyIsland';
import { Reveal, SectionHead } from './Reveal';

export function Difference({ t }) {
  return (
    <section className="block">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div className="diff">
        {t.points.map((p, i) => (
          <Reveal key={p.title} as="article" className="diff-item" y={40} amount={0.25} duration={0.55} delay={i * 0.07}>
            <span className="diff-icon"><LazyIsland name="diffIcon" props={{ index: i }} /></span>
            <h3>{p.title}</h3>
            <p className="muted">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact({ t }) {
  return (
    <section id="contact" className="block contact">
      <Reveal>
        <p className="kicker">{t.kicker}</p>
        <h2>{t.title}</h2>
        <p className="lead">{t.body}</p>
        <div className="actions center">
          <a className="btn" href={`mailto:${site.email}`}>{t.cta}</a>
        </div>
        <p className="meta">{site.email} · {t.languages}</p>
      </Reveal>
    </section>
  );
}
