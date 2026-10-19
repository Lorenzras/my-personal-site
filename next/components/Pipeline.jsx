'use client';

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SectionHead } from './Shell';

const START = 0.05;
const END = 0.85;

// Piecewise-linear interpolation through the node centres.
function along(p, stops, values) {
  if (!values.length) return 0;
  if (p <= stops[0]) return values[0];
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i]) {
      const f = (p - stops[i - 1]) / (stops[i] - stops[i - 1]);
      return values[i - 1] + f * (values[i] - values[i - 1]);
    }
  }
  return values[values.length - 1];
}

// A pinned scene: as you scroll, a record chip travels through each step and
// lights it up. Scrolling up sends it back.
export default function Pipeline({ t }) {
  const ref = useRef(null);
  const track = useRef(null);
  const nodes = useRef([]);
  const reduce = useReducedMotion();
  const n = t.steps.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const stops = t.steps.map((_, i) => START + ((END - START) * i) / (n - 1));
  const toStep = (p) => (p < START - 0.02 ? -1 : stops.reduce((s, at, i) => (p >= at - 0.02 ? i : s), 0));

  const [step, setStep] = useState(-1);
  useEffect(() => setStep(toStep(scrollYProgress.get())), []); // eslint-disable-line react-hooks/exhaustive-deps
  useMotionValueEvent(scrollYProgress, 'change', (p) => setStep(toStep(p)));

  // Measure node centres relative to the track so the chip can follow them.
  const centres = useRef({ x: [], y: [] });
  useLayoutEffect(() => {
    const measure = () => {
      const box = track.current?.getBoundingClientRect();
      if (!box) return;
      const rects = nodes.current.map((el) => el.getBoundingClientRect());
      centres.current = {
        x: rects.map((r) => r.left + r.width / 2 - box.left),
        y: rects.map((r) => r.top + r.height / 2 - box.top),
      };
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const x = useTransform(scrollYProgress, (p) => along(p, stops, centres.current.x));
  const y = useTransform(scrollYProgress, (p) => along(p, stops, centres.current.y));
  const chipOpacity = useTransform(scrollYProgress, [START - 0.04, START], [0, 1]);

  // Group consecutive `aws` steps inside the account boundary.
  const groups = [];
  t.steps.forEach((s, i) => {
    const last = groups[groups.length - 1];
    if (s.aws && last?.aws) last.steps.push([s, i]);
    else groups.push({ aws: !!s.aws, steps: [[s, i]] });
  });
  const lit = reduce ? n : step;
  const node = ([s, i]) => (
    <div key={s.id} ref={(el) => { nodes.current[i] = el; }} className={`node${i <= lit ? ' lit' : ''}${i === step ? ' current' : ''}`}>
      <strong>{s.label}</strong>
      <span>{s.sub}</span>
    </div>
  );

  const body = (
    <div className={reduce ? 'block' : 'pipe-sticky block'}>
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div ref={track} className="pipeline">
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
        {!reduce && <motion.span className="record-chip" style={{ x, y, opacity: chipOpacity }} aria-hidden>{t.chip}</motion.span>}
      </div>
      <p className="pipe-caption" aria-live="polite">
        {reduce ? t.body : step >= 0 ? t.steps[step].detail : t.hint}
      </p>
    </div>
  );

  if (reduce) return <section ref={ref}>{body}</section>;
  return <section ref={ref} className="pipe-scroll" style={{ height: '200vh' }}>{body}</section>;
}
