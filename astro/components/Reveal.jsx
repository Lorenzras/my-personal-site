import { motion } from 'motion/react';

// Fades and lifts its children in when they enter the viewport, and back out
// when they leave, so scrolling up replays the scene in reverse.
// (React version, used inside islands. Static .astro pages use
// src/components/Reveal.astro, which reproduces the same animation.)
export function Reveal({ children, delay = 0, y = 32, className, as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function SectionHead({ kicker, title, body }) {
  return (
    <Reveal className="section-head">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {body && <p className="lead">{body}</p>}
    </Reveal>
  );
}
