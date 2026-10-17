'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { languageNames, languages, site } from '@/content';

// Wraps every page: honours the OS "reduce motion" setting and draws the
// scroll progress bar, top nav and language switch.
export default function Shell({ lang, nav, themeLabel, children }) {
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
          <ThemeToggle label={themeLabel} />
          <a href={`mailto:${site.email}`} className="nav-cta">{nav.contact}</a>
        </div>
      </nav>
      {children}
    </MotionConfig>
  );
}

// Light by default; dark when the OS asks for it, unless the visitor picked
// a theme here. The choice is stored per browser and applied before paint by
// the inline script in the layout.
function ThemeToggle({ label }) {
  const [dark, setDark] = useState(null);
  useEffect(() => {
    const set = document.documentElement.dataset.theme;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDark(set ? set === 'dark' : mq.matches);
    const onChange = (e) => { if (!document.documentElement.dataset.theme) setDark(e.matches); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    setDark(!dark);
  };
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label} aria-pressed={dark === null ? undefined : dark}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        {dark ? (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
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
