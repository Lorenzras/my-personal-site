'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { SectionHead } from './Shell';

// A pinned scene: scrolling steps through the pains one at a time. Each pain
// is crossed out and its fix slides in; scrolling back up reverses it.
// The tabs jump straight to a pain.
export default function Pains({ t, lang }) {
  const ref = useRef(null);
  const n = t.items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  // Progress within the current pain, 0 → 1.
  const local = useTransform(scrollYProgress, (p) => Math.min(1, Math.max(0, p * n - Math.min(n - 1, Math.floor(p * n)))));
  const strike = useTransform(local, [0.1, 0.45], ['0% 3px', '100% 3px']);
  const painOpacity = useTransform(local, [0.3, 0.6], [1, 0.4]);
  const fixOpacity = useTransform(local, [0.35, 0.65], [0, 1]);
  const fixY = useTransform(local, [0.35, 0.65], [24, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
  });

  // Keep the active tab visible when the tabs scroll sideways on phones.
  const tabs = useRef(null);
  useEffect(() => {
    const el = tabs.current?.children[active];
    const box = tabs.current;
    if (el && box && box.scrollWidth > box.clientWidth) box.scrollTo({ left: el.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  const jump = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.75) / n), behavior: 'smooth' });
  };

  const item = t.items[active];
  return (
    <section id="problems" ref={ref} className="pains-scroll" style={{ height: `${n * 80 + 60}vh` }}>
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
          <AnimatePresence mode="wait">
            <motion.article
              key={item.id}
              className="pain"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35 }}
            >
              <motion.p className="pain-text" style={{ opacity: painOpacity }}>
                <span className="pain-label">{t.painLabel}</span>
                <motion.span className="pain-strike" style={{ backgroundSize: strike }}>{item.pain}</motion.span>
              </motion.p>
              <motion.div className="fix" style={{ opacity: fixOpacity, y: fixY }}>
                <span className="fix-label">{t.fixLabel}</span>
                <p>{item.fix}</p>
                {item.link && <a href={`/${lang}${item.link.href}`} className="text-link">{item.link.label} →</a>}
              </motion.div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
