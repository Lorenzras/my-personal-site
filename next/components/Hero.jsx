'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { site } from '@/content';
import { HeroVisual } from './illustrations';

// Flowing lines in the background: data moving from left to right.
const LINES = Array.from({ length: 7 }, (_, i) => {
  const y = 80 + i * 70;
  const a = 40 * Math.sin(i * 1.3);
  return `M -50 ${y} C 300 ${y - 120 + a}, 600 ${y + 120 - a}, 900 ${y} S 1300 ${y - 80}, 1500 ${y + a}`;
});

// "Stop ____" cycles through client chores. Each phrase starts marked as manual
// work (vermilion), then the status row flips to "Automated" (teal) and the
// highlighter under the phrase turns teal. The dots let visitors pick one.
// Leading punctuation stays glued to the phrase; the rest wraps as one unit
// (「…、」 / 「もう人がやらなくていい。」) instead of breaking mid-phrase.
function Suffix({ text }) {
  const lead = /^[、。，,]/.test(text) ? text[0] : '';
  return (
    <span className="cycle-suffix">
      {lead}
      <span className="cycle-rest">{text.slice(lead.length)}</span>
    </span>
  );
}

const FLIP_AT = 1200; // ms after a phrase appears
const STEP = 3600; // ms per phrase

function CyclingPain({ pains, suffix, label, stateToday, stateFixed }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fixed, setFixed] = useState(false);
  // The first phrase is readable straight away; only later ones blur in.
  const first = useRef(true);
  useEffect(() => { if (i !== 0) first.current = false; }, [i]);
  const reduce = useReducedMotion();
  useEffect(() => {
    // Reduced motion: show the automated state, no cycling.
    if (reduce) { setFixed(true); return undefined; }
    setFixed(false);
    const flip = setTimeout(() => setFixed(true), FLIP_AT);
    const next = paused ? null : setTimeout(() => setI((n) => (n + 1) % pains.length), STEP);
    return () => { clearTimeout(flip); clearTimeout(next); };
  }, [i, paused, reduce, pains.length]);
  return (
    <>
      <span className={`cycle${fixed ? ' is-fixed' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            className="cycle-word"
            initial={i === 0 && first.current ? false : { opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hl">{pains[i]}</span>
          </motion.span>
        </AnimatePresence>
        {suffix && <Suffix text={suffix} />}
      </span>
      <span className={`hero-status${fixed ? ' is-fixed' : ''}`}>
        <span className="hs-chip hs-today" aria-hidden="true"><span className="hs-dot" />{stateToday}</span>
        <span className="hs-track" aria-hidden="true"><span /></span>
        <span className="hs-chip hs-fixed" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
          {stateFixed}
        </span>
        <span className="cycle-dots" onMouseLeave={() => setPaused(false)} role="group" aria-label={label}>
          {pains.map((p, n) => (
            <button
              key={p}
              type="button"
              aria-label={p}
              aria-pressed={n === i}
              className={n === i ? 'on' : ''}
              onMouseEnter={() => { setPaused(true); setI(n); }}
              onClick={() => { setPaused(true); setI(n); }}
            />
          ))}
        </span>
      </span>
    </>
  );
}

export default function Hero({ t, lang }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);
  // The background lines lean toward the pointer.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 15 });
  const sy = useSpring(py, { stiffness: 40, damping: 15 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 40);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 30);
  };

  return (
    <header className="hero" onPointerMove={onMove}>
      <motion.div className="flow-wrap" style={{ y }}>
        <motion.svg className="flow" viewBox="0 0 1400 600" preserveAspectRatio="none" style={{ x: sx, y: sy }} aria-hidden>
          {LINES.map((d, i) => (
            <g key={i}>
              <motion.path
                d={d}
                className="flow-line"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.2, delay: 0.15 * i, ease: 'easeInOut' }}
              />
              <path d={d} className="flow-dot" style={{ animationDelay: `${-i * 0.9}s` }} pathLength="100" />
            </g>
          ))}
        </motion.svg>
      </motion.div>

      <motion.div className="hero-inner" style={{ opacity: fade }}>
        <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {t.kicker}
        </motion.p>
        <motion.h1 initial={{ y: 30 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          {t.prefix} <CyclingPain pains={t.pains} suffix={t.suffix} label={t.kicker} stateToday={t.stateToday} stateFixed={t.stateFixed} />
          <span className="accent">{t.resolve}</span>
        </motion.h1>
        <motion.p className="lead" initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
          {t.intro}
        </motion.p>
        <motion.div className="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <a className="btn" href={`mailto:${site.email}`}>{t.ctaPrimary}</a>
          <a className="btn ghost" href={`/${lang}/#work`}>{t.ctaSecondary}</a>
        </motion.div>
      </motion.div>
      <motion.div className="hero-visual" style={{ opacity: fade }}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <HeroVisual />
        </motion.div>
      </motion.div>
      <motion.div className="scroll-cue" style={{ opacity: fade }} aria-hidden>
        <span />
      </motion.div>
    </header>
  );
}
