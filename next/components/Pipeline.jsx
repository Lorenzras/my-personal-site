'use client';

import { Fragment, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { SectionHead } from './Shell';

// A pinned scene: as you scroll, a record travels kintone → API → Bedrock →
// back to kintone, lighting each step. Scrolling up sends it back.
export default function Pipeline({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = t.steps.length;
  const [step, setStep] = useState(-1);
  useMotionValueEvent(scrollYProgress, 'change', (p) => setStep(p < 0.05 ? -1 : Math.min(n - 1, Math.floor(p * n))));
  const fill = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  // Group consecutive `aws` steps inside the account boundary.
  const groups = [];
  t.steps.forEach((s, i) => {
    const last = groups[groups.length - 1];
    if (s.aws && last?.aws) last.steps.push([s, i]);
    else groups.push({ aws: !!s.aws, steps: [[s, i]] });
  });
  const node = ([s, i]) => (
    <div key={s.id} className={`node${i <= step ? ' lit' : ''}${i === step ? ' current' : ''}`}>
      <strong>{s.label}</strong>
      <span>{s.sub}</span>
    </div>
  );

  return (
    <section ref={ref} className="pipe-scroll" style={{ height: '220vh' }}>
      <div className="pipe-sticky block">
        <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
        <div className="pipeline">
          <div className="pipe-track" aria-hidden><motion.span style={{ width: fill }} /></div>
          {groups.map((g, gi) => (
            <Fragment key={gi}>
              {gi > 0 && <div className="link" />}
              {g.aws ? (
                <div className={`aws-boundary${g.steps.some(([, i]) => i === step) ? ' on' : ''}`}>
                  <span className="aws-label">🔒 {t.boundaryLabel}</span>
                  {g.steps.map((s, si) => <Fragment key={s[0].id}>{si > 0 && <div className="link" />}{node(s)}</Fragment>)}
                </div>
              ) : g.steps.map(node)}
            </Fragment>
          ))}
        </div>
        <p className="pipe-caption" aria-live="polite">{step >= 0 ? t.steps[step].detail : t.hint}</p>
      </div>
    </section>
  );
}
