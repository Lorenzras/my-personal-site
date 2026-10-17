'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { SectionHead } from './Shell';
import { PainArt } from './illustrations';

const Check = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5l3.2 3L13 4.5" />
  </svg>
);
const Dot = () => <span className="state-dot" aria-hidden="true" />;

function Stat({ stat }) {
  if (!stat) return null;
  return (
    <p className="pain-stat">
      <span>{stat.label}</span>
      <span className="pain-stat-from">{stat.from}</span>
      <span className="pain-stat-arrow" aria-hidden="true">→</span>
      <span className="pain-stat-to">{stat.to}</span>
    </p>
  );
}

// One pain in the pinned scene: a Today / With automation switch, the
// illustration in matching state, and the pain or fix sentence (both at full
// contrast, crossfaded in the same grid cell).
function Card({ item, t, lang, fixed, onState }) {
  return (
    <>
      <div className="pain-toggle" role="group" aria-label={item.tag}>
        <span className="pain-toggle-thumb" aria-hidden="true" />
        <button type="button" aria-pressed={!fixed} onClick={() => onState(false)}><Dot />{t.stateToday}</button>
        <button type="button" aria-pressed={fixed} onClick={() => onState(true)}><Check />{t.stateFixed}</button>
      </div>
      <div className="pain-art"><PainArt id={item.id} fixed={fixed} /></div>
      <div className="pain-copy">
        <div className="pain-say pain-say-today" aria-hidden={fixed}>
          <p className="pain-text">{item.pain}</p>
        </div>
        <div className="pain-say pain-say-fixed" aria-hidden={!fixed}>
          <p className="pain-text">{item.fix}</p>
          {item.link && (
            <a href={`/${lang}${item.link.href}`} className="text-link" tabIndex={fixed ? undefined : -1}>{item.link.label} →</a>
          )}
        </div>
      </div>
      <Stat stat={item.stat} />
    </>
  );
}

// With reduced motion: a plain list, everything visible. Each pain shows both
// states of its illustration side by side, then the pain and the fix.
function StaticPains({ t, lang }) {
  return (
    <section id="problems" className="block">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div className="pains-static">
        {t.items.map((item) => (
          <article key={item.id} className="pain pain-static">
            <p className="tag">{item.tag}</p>
            <div className="pain-pair">
              <figure>
                <PainArt id={item.id} fixed={false} />
                <figcaption className="state-chip is-today"><Dot />{t.stateToday}</figcaption>
              </figure>
              <span className="pain-pair-arrow" aria-hidden="true">→</span>
              <figure>
                <PainArt id={item.id} fixed />
                <figcaption className="state-chip is-fixed"><Check />{t.stateFixed}</figcaption>
              </figure>
            </div>
            <div className="pain-static-copy">
              <p className="pain-static-line"><span className="state-chip is-today"><Dot />{t.stateToday}</span>{item.pain}</p>
              <p className="pain-static-line"><span className="state-chip is-fixed"><Check />{t.stateFixed}</span>{item.fix}</p>
              {item.link && <a href={`/${lang}${item.link.href}`} className="text-link">{item.link.label} →</a>}
              <Stat stat={item.stat} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// Where in a pain's scroll segment the state flips from Today to automated.
const FLIP = 0.5;
// Where the tabs and the switch land inside a segment.
const AT_TODAY = 0.2;
const AT_FIXED = 0.75;

// A pinned scene: scrolling steps through the pains one at a time. In the
// first half of each pain's segment it shows "Today"; in the second half the
// switch flips to "With automation", the illustration turns into its
// automated state and the fix replaces the pain. Scrolling back reverses it.
// The tabs and the switch jump to the matching scroll position.
function PinnedPains({ t, lang }) {
  const ref = useRef(null);
  const tabs = useRef(null);
  const n = t.items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const toIndex = (p) => Math.min(n - 1, Math.max(0, Math.floor(p * n)));
  const toFixed = (p) => Math.min(1, Math.max(0, p * n - toIndex(p))) >= FLIP || p >= 1;
  const [active, setActive] = useState(0);
  const [fixed, setFixed] = useState(false);
  const sync = (p) => { setActive(toIndex(p)); setFixed(toFixed(p)); };
  useEffect(() => sync(scrollYProgress.get()), []); // eslint-disable-line react-hooks/exhaustive-deps
  useMotionValueEvent(scrollYProgress, 'change', sync);

  // Keep the active tab visible when the tabs scroll sideways on phones.
  useEffect(() => {
    const box = tabs.current;
    const el = box?.children[active];
    if (el && box.scrollWidth > box.clientWidth) box.scrollTo({ left: el.offsetLeft - 24, behavior: 'smooth' });
  }, [active]);

  const jump = (i, at = AT_TODAY) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + at) / n), behavior: 'smooth' });
  };

  const item = t.items[active];
  return (
    <section id="problems" ref={ref} className="pains-scroll" style={{ height: `${n * 60 + 40}vh` }}>
      <div className="pains-sticky block">
        <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
        <div className={`pains-stage${fixed ? ' is-fixed' : ''}`}>
          <div ref={tabs} className="pain-tabs" role="tablist">
            {t.items.map((p, i) => (
              <button key={p.id} type="button" role="tab" aria-selected={i === active} className={i === active ? 'on' : ''} onClick={() => jump(i)}>
                <span className="pain-tab-num">{String(i + 1).padStart(2, '0')}</span>
                {p.tag}
                {i === active && <motion.span layoutId="pain-tab-bar" className="pain-tab-bar" />}
              </button>
            ))}
          </div>
          <div className="pain-slot">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.article
                key={item.id}
                className="pain"
                data-state={fixed ? 'fixed' : 'today'}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
              >
                <Card item={item} t={t} lang={lang} fixed={fixed} onState={(f) => jump(active, f ? AT_FIXED : AT_TODAY)} />
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Pains(props) {
  return useReducedMotion() ? <StaticPains {...props} /> : <PinnedPains {...props} />;
}
