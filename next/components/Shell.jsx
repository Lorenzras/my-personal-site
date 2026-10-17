'use client';

import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { profile } from '@/content/site';

// Wraps every page: honours the OS "reduce motion" setting and draws the
// scroll progress bar and top nav.
export default function Shell({ children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="progress" style={{ scaleX }} />
      <nav className="nav">
        <a href="/" className="logo">LENZ<span>LAB</span></a>
        <div className="nav-links">
          <a href="/#pains">Problems</a>
          <a href="/#services">Services</a>
          <a href="/#work">Work</a>
          <a href={`mailto:${profile.email}`} className="nav-cta">Contact</a>
        </div>
      </nav>
      {children}
    </MotionConfig>
  );
}

// Fades and lifts its children into view once.
export function Reveal({ children, delay = 0, y = 32, className, as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
