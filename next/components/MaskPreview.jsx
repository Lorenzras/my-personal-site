'use client';

import { useRef, useState } from 'react';
import { m, useScroll, useTransform } from './motion';
import { Reveal, SectionHead } from './MotionReveal';

function MaskedValue({ value, progress, from, revealed, onToggle, labels, pulse }) {
  const scaleX = useTransform(progress, [from, from + 0.12], [0, 1]);
  const ring = useTransform(progress, [from - 0.08, from, from + 0.12], [0, 1, 0]);
  return (
    <button type="button" className={`doc-value masked${pulse ? ' pulse' : ''}`} onClick={onToggle} aria-pressed={revealed} title={revealed ? labels.hide : labels.reveal}>
      {value}
      <m.span className="detect" style={{ opacity: ring }} />
      <m.span className="mask" style={{ scaleX }} animate={{ opacity: revealed ? 0 : 1 }}>
        <em>{labels.masked}</em>
      </m.span>
    </button>
  );
}

// A sample form whose personal fields are masked as it scrolls into view and
// unmasked as it scrolls back out. Clicking a field toggles it.
export default function MaskPreview({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'center 0.45'] });
  const scanTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const scanOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const statusOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const [revealed, setRevealed] = useState({});
  const { doc } = t;
  const count = doc.rows.filter((r) => r[2]).length;
  let k = 0;

  return (
    <div ref={ref} className="doc">
      <div className="doc-head">
        <span>{doc.title}</span>
        <m.span className="doc-status" style={{ opacity: statusOpacity }}>
          ✓ {doc.status.replace('{n}', count)}
        </m.span>
      </div>
      <m.div className="scan" style={{ top: scanTop, opacity: scanOpacity }} />
      {doc.rows.map(([label, value, sensitive]) => {
        const from = sensitive ? 0.15 + (0.6 * k++) / count : 0;
        return (
          <div key={label} className="doc-row">
            <span className="doc-label">{label}</span>
            {sensitive ? (
              <MaskedValue
                value={value}
                progress={scrollYProgress}
                from={from}
                labels={t.labels}
                revealed={!!revealed[label]}
                pulse={k === 1 && !Object.keys(revealed).length}
                onToggle={() => setRevealed((r) => ({ ...r, [label]: !r[label] }))}
              />
            ) : (
              <span className="doc-value">{value}</span>
            )}
          </div>
        );
      })}
      <p className="doc-hint">{t.labels.hint}</p>
    </div>
  );
}

export function MaskingSection({ t, lang }) {
  return (
    <section className="block split">
      <div>
        <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
        <Reveal delay={0.1}>
          <a className="btn ghost" href={`/${lang}${t.link.href}`}>{t.link.label} →</a>
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <MaskPreview t={t} />
      </Reveal>
    </section>
  );
}
