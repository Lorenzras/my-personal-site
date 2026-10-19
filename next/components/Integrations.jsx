'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useInView, useReducedMotion, useScroll, useTransform } from './motion';
import { SectionHead } from './MotionReveal';

const R = 40; // node orbit radius, in % of the hub box

const pos = (i, n) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2;
  // Rounded so server and browser render identical numbers (no hydration mismatch).
  return [50 + R * Math.cos(a), 50 + R * Math.sin(a)].map((v) => Math.round(v * 1000) / 1000);
};

function Spoke({ i, n, progress, on }) {
  const [x, y] = pos(i, n);
  const start = (i / n) * 0.6;
  const pathLength = useTransform(progress, [start, start + 0.35], [0, 1]);
  return (
    <g className={on ? 'spoke on' : 'spoke'}>
      <m.line x1="50" y1="50" x2={x} y2={y} style={{ pathLength }} />
      {on && (
        <>
          <circle r="0.9" className="spoke-packet">
            <animateMotion dur="1.4s" repeatCount="indefinite" path={`M50,50 L${x},${y}`} />
          </circle>
          <circle r="0.9" className="spoke-packet back">
            <animateMotion dur="1.4s" begin="0.7s" repeatCount="indefinite" path={`M${x},${y} L50,50`} />
          </circle>
        </>
      )}
    </g>
  );
}

// The client's business in the middle, connected tools around it. Spokes draw
// in as you scroll (and retract when you scroll back). It tours a few tools on
// its own until the visitor hovers or taps one. On phones the orbit becomes a
// grid of chips.
export default function Integrations({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'center 0.5'] });
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const n = t.nodes.length;
  const node = t.nodes[active];

  useEffect(() => {
    if (!inView || touched || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 2600);
    return () => clearInterval(id);
  }, [inView, touched, reduce, n]);

  const pick = (i) => { setTouched(true); setActive(i); };

  return (
    <section id="integrations" className="block">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div className="hub-wrap">
        <div ref={ref} className="hub">
          <svg viewBox="0 0 100 100" className="hub-lines" aria-hidden>
            {t.nodes.map((nd, i) => <Spoke key={nd.id} i={i} n={n} progress={scrollYProgress} on={i === active} />)}
          </svg>
          <div className="hub-center">{t.hub}</div>
          {t.nodes.map((nd, i) => {
            const [x, y] = pos(i, n);
            return (
              <div key={nd.id} className="hub-slot" style={{ left: `${x}%`, top: `${y}%` }}>
                <m.button
                  type="button"
                  className={`hub-node${i === active ? ' on' : ''}`}
                  aria-pressed={i === active}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                  onClick={() => pick(i)}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                >
                  {nd.name}
                </m.button>
              </div>
            );
          })}
        </div>
        <div className="hub-detail" aria-live="polite">
          <AnimatePresence mode="wait">
            <m.div key={node.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <p className="tag">{node.category}</p>
              <h3>{node.name}</h3>
              <p className="muted">{node.example}</p>
            </m.div>
          </AnimatePresence>
          <p className="hint">{t.hint}</p>
        </div>
      </div>
    </section>
  );
}
