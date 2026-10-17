'use client';

import { usePathname } from 'next/navigation';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { languageNames, languages, site } from '@/content';

// Wraps every page: honours the OS "reduce motion" setting and draws the
// scroll progress bar, top nav and language switch.
export default function Shell({ lang, nav, children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const path = usePathname() || `/${lang}/`;
  const rest = path.replace(/^\/[a-z]{2}(?=\/|$)/, '');
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="progress" style={{ scaleX }} />
      <nav className="nav">
        <a href={`/${lang}/`} className="logo">LENZ<span>LAB</span></a>
        <div className="nav-links">
          <a href={`/${lang}/#problems`}>{nav.problems}</a>
          <a href={`/${lang}/#services`}>{nav.services}</a>
          <a href={`/${lang}/#integrations`}>{nav.integrations}</a>
          <a href={`/${lang}/#work`}>{nav.work}</a>
          <span className="lang-switch">
            {languages.map((l) => (
              <a key={l} href={`/${l}${rest || '/'}`} hrefLang={l} lang={l} aria-current={l === lang ? 'true' : undefined}>
                <span className="full">{languageNames[l]}</span>
                <span className="short">{l.toUpperCase()}</span>
              </a>
            ))}
          </span>
          <a href={`mailto:${site.email}`} className="nav-cta">{nav.contact}</a>
        </div>
      </nav>
      {children}
    </MotionConfig>
  );
}

// Fades and lifts its children in when they enter the viewport, and back out
// when they leave, so scrolling up replays the scene in reverse.
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
