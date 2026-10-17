'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { site } from '@/content';
import { Reveal, SectionHead } from './Shell';

const EASE = [0.22, 1, 0.36, 1];
const stagger = (i) => ({ duration: 0.55, delay: i * 0.07, ease: EASE });
// In-view animations replay in reverse when scrolled back out.
const VIEW = { amount: 0.25 };

export function Difference({ t }) {
  return (
    <section className="block">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div className="diff">
        {t.points.map((p, i) => (
          <motion.article
            key={p.title}
            className="diff-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={stagger(i)}
          >
            <span className="diff-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.title}</h3>
            <p className="muted">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// Pick an offer on the left; its details animate in on the right.
export function Services({ t }) {
  const [active, setActive] = useState(0);
  const s = t.items[active];
  return (
    <section id="services" className="block">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div className="offers">
        <div className="offer-list" role="tablist">
          {t.items.map((it, i) => (
            <motion.button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`offer-tab${i === active ? ' on' : ''}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={stagger(i)}
            >
              {i === active && <motion.span layoutId="offer-bg" className="offer-bg" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
              <strong>{it.name}</strong>
              <span>{it.forWho}</span>
            </motion.button>
          ))}
        </div>
        <div className="offer-panel" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <h3>{s.name}</h3>
              <p className="offer-outcome">{s.outcome}</p>
              <ul className="offer-includes">
                {s.includes.map((x, i) => (
                  <motion.li key={x} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>{x}</motion.li>
                ))}
              </ul>
              {s.price && (
                <p className="offer-price">
                  {s.price}
                  {s.confirm && <span className="badge" title="Placeholder price. Confirm in content/en.js">TBC</span>}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Check({ text, progress, at }) {
  const pathLength = useTransform(progress, [at, at + 0.08], [0, 1]);
  const opacity = useTransform(progress, [at - 0.06, at + 0.04], [0.35, 1]);
  return (
    <motion.li style={{ opacity }}>
      <svg viewBox="0 0 24 24" aria-hidden><motion.path d="M5 12.5l4.5 4.5L19 7.5" style={{ pathLength }} /></svg>
      {text}
    </motion.li>
  );
}

// Each item is ticked as it scrolls up the screen, and unticked on the way back.
export function Security({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const n = t.checks.length;
  return (
    <section className="block split">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <ul ref={ref} className="checks">
        {t.checks.map((c, i) => <Check key={c} text={c} progress={scrollYProgress} at={(i / n) * 0.85} />)}
      </ul>
    </section>
  );
}

function Step({ step, i, n, progress }) {
  const at = i / n;
  const lit = useTransform(progress, [at, at + 0.05], [0, 1]);
  const borderColor = useTransform(lit, [0, 1], ['rgba(255,255,255,0.15)', 'rgba(79,209,197,1)']);
  const opacity = useTransform(lit, [0, 1], [0.4, 1]);
  return (
    <motion.li style={{ opacity }}>
      <motion.span className="step-dot" style={{ borderColor }}>{i + 1}</motion.span>
      <h3>{step.title}</h3>
      <p className="muted">{step.body}</p>
    </motion.li>
  );
}

// A vertical timeline whose line fills, and whose steps light up, as you scroll.
export function Process({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.5'] });
  return (
    <section className="block">
      <SectionHead kicker={t.kicker} title={t.title} />
      <ol ref={ref} className="process">
        <motion.span className="process-line" style={{ scaleY: scrollYProgress }} />
        {t.steps.map((s, i) => <Step key={s.title} step={s} i={i} n={t.steps.length} progress={scrollYProgress} />)}
      </ol>
    </section>
  );
}

// Cards tilt toward the pointer.
function WorkCard({ item, href, label, i }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.a
      href={href}
      className="project"
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={stagger(i)}
    >
      <h3>{item.title}</h3>
      <p className="muted">{item.problem}</p>
      <ul className="tags">{item.tags.map((x) => <li key={x}>{x}</li>)}</ul>
      <span className="text-link">{label} →</span>
    </motion.a>
  );
}

export function Work({ t, lang }) {
  return (
    <section id="work" className="block">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div className="projects">
        {t.items.map((w, i) => <WorkCard key={w.slug} item={w} href={`/${lang}/work/${w.slug}/`} label={t.labels.view} i={i} />)}
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
