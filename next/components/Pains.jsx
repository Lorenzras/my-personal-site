'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SectionHead } from './Shell';

function Card({ item, t, lang, strike, painOpacity, fixOpacity, fixY }) {
  return (
    <>
      <motion.p className="pain-text" style={{ opacity: painOpacity }}>
        <span className="pain-label">{t.painLabel}</span>
        <motion.span className="pain-strike" style={{ backgroundSize: strike }}>{item.pain}</motion.span>
      </motion.p>
      <motion.div className="fix" style={{ opacity: fixOpacity, y: fixY }}>
        <span className="fix-label">{t.fixLabel}</span>
        <p>{item.fix}</p>
        {item.link && <a href={`/${lang}${item.link.href}`} className="text-link">{item.link.label} →</a>}
      </motion.div>
    </>
  );
}

// With reduced motion: a plain list, everything visible.
function StaticPains({ t, lang }) {
  return (
    <section id="problems" className="block">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div className="pains-static">
        {t.items.map((item) => (
          <article key={item.id} className="pain">
            <p className="tag">{item.tag}</p>
            <Card item={item} t={t} lang={lang} strike="100% 3px" painOpacity={0.6} fixOpacity={1} fixY={0} />
          </article>
        ))}
      </div>
    </section>
  );
}

// A pinned scene: scrolling steps through the pains one at a time. Each pain
// is crossed out and its fix slides in; scrolling back up reverses it.
// The tabs jump straight to a pain.
function PinnedPains({ t, lang }) {
  const ref = useRef(null);
  const tabs = useRef(null);
  const n = t.items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const toIndex = (p) => Math.min(n - 1, Math.max(0, Math.floor(p * n)));
  const [active, setActive] = useState(0);
  useEffect(() => setActive(toIndex(scrollYProgress.get())), []); // eslint-disable-line react-hooks/exhaustive-deps
  useMotionValueEvent(scrollYProgress, 'change', (p) => setActive(toIndex(p)));

  // Progress within the current pain, 0 → 1.
  const local = useTransform(scrollYProgress, (p) => Math.min(1, Math.max(0, p * n - toIndex(p))));
  const strike = useTransform(local, [0, 0.3], ['0% 3px', '100% 3px']);
  const painOpacity = useTransform(local, [0.15, 0.4], [1, 0.45]);
  const fixOpacity = useTransform(local, [0, 0.2, 0.5], [0.15, 0.15, 1]);
  const fixY = useTransform(local, [0.2, 0.5], [16, 0]);

  // Keep the active tab visible when the tabs scroll sideways on phones.
  useEffect(() => {
    const box = tabs.current;
    const el = box?.children[active];
    if (el && box.scrollWidth > box.clientWidth) box.scrollTo({ left: el.offsetLeft - 24, behavior: 'smooth' });
  }, [active]);

  const jump = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.6) / n), behavior: 'smooth' });
  };

  const item = t.items[active];
  return (
    <section id="problems" ref={ref} className="pains-scroll" style={{ height: `${n * 55 + 40}vh` }}>
      <div className="pains-sticky block">
        <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
        <div className="pains-stage">
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
              >
                <Card item={item} t={t} lang={lang} strike={strike} painOpacity={painOpacity} fixOpacity={fixOpacity} fixY={fixY} />
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
