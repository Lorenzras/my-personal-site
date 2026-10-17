'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { profile } from '@/content/site';

// Flowing lines in the background: data moving from left to right.
const LINES = Array.from({ length: 7 }, (_, i) => {
  const y = 80 + i * 70;
  const a = 40 * Math.sin(i * 1.3);
  return `M -50 ${y} C 300 ${y - 120 + a}, 600 ${y + 120 - a}, 900 ${y} S 1300 ${y - 80}, 1500 ${y + a}`;
});

function CyclingPain() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.painVerbs.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="cycle">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="cycle-word"
          initial={{ y: '0.6em', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.6em', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="strike"
            initial={{ backgroundSize: '0% 0.08em' }}
            animate={{ backgroundSize: '100% 0.08em' }}
            transition={{ delay: 1.3, duration: 0.6, ease: 'easeInOut' }}
          >
            {profile.painVerbs[i]}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <header className="hero">
      <motion.svg className="flow" viewBox="0 0 1400 600" preserveAspectRatio="none" style={{ y }} aria-hidden>
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

      <motion.div className="hero-inner" style={{ opacity: fade }}>
        <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {profile.kicker}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          Stop <CyclingPain />
          <br />
          <span className="accent">Let it run itself.</span>
        </motion.h1>
        <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
          {profile.intro}
        </motion.p>
        <motion.div className="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <a className="btn" href="#pains">Find your pain point</a>
          <a className="btn ghost" href={`mailto:${profile.email}`}>{profile.email}</a>
        </motion.div>
        <motion.p className="meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          {profile.name} · {profile.role} · {profile.location}
        </motion.p>
      </motion.div>
      <motion.div className="scroll-cue" style={{ opacity: fade }} aria-hidden>
        <span />
      </motion.div>
    </header>
  );
}
