'use client';

import { m } from './motion';

// Fades and lifts its children in when they enter the viewport, and back out
// when they leave, so scrolling up replays the scene in reverse.
// (motion version, used inside client islands; server components use
// components/Reveal.jsx, which reproduces the same animation without React.)
export function Reveal({ children, delay = 0, y = 32, className, as = 'div' }) {
  const M = m[as];
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
