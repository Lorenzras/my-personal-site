import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { site } from '@/content';
import { Reveal, SectionHead } from './Reveal';
import { DiffIcon, OfferIcon, ProcessIcon, WorkCover } from './illustrations';

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
            <span className="diff-icon"><DiffIcon index={i} /></span>
            <h3>{p.title}</h3>
            <p className="muted">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function OfferDetail({ s }) {
  return (
    <>
      <span className="offer-icon"><OfferIcon id={s.id} /></span>
      <h3>{s.name}</h3>
      <p className="offer-outcome">{s.outcome}</p>
      <ul className="offer-includes">
        {s.includes.map((x, i) => (
          <motion.li key={x} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>{x}</motion.li>
        ))}
      </ul>
    </>
  );
}

// Pick an offer on the left; its details animate in on the right (or open
// under it on phones).
export function Services({ t }) {
  const [active, setActive] = useState(0);
  const s = t.items[active];
  return (
    <section id="services" className="block">
      <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
      <div className="offers">
        <div className="offer-list">
          {t.items.map((it, i) => (
            <div key={it.id} className="offer-item">
              <motion.button
                type="button"
                aria-expanded={i === active}
                className={`offer-tab${i === active ? ' on' : ''}`}
                aria-controls={`offer-${it.id}`}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEW}
                transition={stagger(i)}
              >
                {i === active && <motion.span layoutId="offer-bg" className="offer-bg" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
                <span className="offer-tab-icon"><OfferIcon id={it.id} /></span>
                <strong>{it.name}</strong>
                <span>{it.forWho}</span>
              </motion.button>
              {/* Phones: the details open right under the tapped offer. */}
              <AnimatePresence initial={false}>
                {i === active && (
                  <motion.div
                    className="offer-inline"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OfferDetail s={it} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="offer-panel">
          <AnimatePresence mode="wait">
            <motion.div key={s.id} id={`offer-${s.id}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <OfferDetail s={s} />
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
  const opacity = useTransform(lit, [0, 1], [0.4, 1]);
  return (
    <motion.li style={{ opacity }}>
      <span className="step-dot">{i + 1}<motion.span className="step-ring" style={{ opacity: lit }} /></span>
      <div className="step-head">
        <span className="step-icon"><ProcessIcon index={i} /></span>
        <h3>{step.title}</h3>
      </div>
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
      <div className="process-wrap">
      <motion.span className="process-line" style={{ scaleY: scrollYProgress }} aria-hidden="true" />
      <ol ref={ref} className="process">
        {t.steps.map((s, i) => <Step key={s.title} step={s} i={i} n={t.steps.length} progress={scrollYProgress} />)}
      </ol>
      </div>
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
      className={`project${i === 0 ? ' featured' : ''}`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={stagger(i)}
    >
      <div className="project-cover"><WorkCover slug={item.slug} /></div>
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
