'use client';

// The few interactive bits of the page chrome. Small client components with
// no motion dependency, so every page hydrates them straight away for almost
// no JavaScript.
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { languageNames, languages } from '@/content/site';

// Scroll progress bar, smoothed like motion's useSpring(scrollYProgress,
// { stiffness: 120, damping: 30 }) which drew it before.
export function ProgressBar() {
  const ref = useRef(null);
  useEffect(() => {
    const bar = ref.current;
    let x = 0;
    let v = 0;
    let last = 0;
    let raf = 0;
    const target = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const step = (now) => {
      const goal = target();
      let dt = Math.min(0.064, (now - (last || now)) / 1000);
      last = now;
      // Integrate in small sub-steps for stability.
      while (dt > 0) {
        const h = Math.min(dt, 0.004);
        v += (-120 * (x - goal) - 30 * v) * h;
        x += v * h;
        dt -= h;
      }
      if (Math.abs(v) < 0.01 && Math.abs(goal - x) < 0.001) {
        x = goal;
        v = 0;
        raf = 0;
        last = 0;
      } else {
        raf = requestAnimationFrame(step);
      }
      bar.style.transform = x >= 1 ? 'none' : `scaleX(${x})`;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(step); };
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, []);
  return <div ref={ref} className="progress" style={{ transform: 'scaleX(0)' }} />;
}

// Links to this same page in the other languages.
export function LangSwitch({ lang }) {
  const path = usePathname() || `/${lang}/`;
  const rest = path.replace(/^\/[a-z]{2}(?=\/|$)/, '');
  return (
    <span className="lang-switch">
      {languages.map((l) => (
        <a key={l} href={`/${l}${rest || '/'}`} hrefLang={l} lang={l} aria-current={l === lang ? 'true' : undefined}>
          <span className="full">{languageNames[l]}</span>
          <span className="short">{l.toUpperCase()}</span>
        </a>
      ))}
    </span>
  );
}

// Light by default; dark when the OS asks for it, unless the visitor picked
// a theme here. The choice is stored per browser and applied before paint by
// the inline script in the layout.
export function ThemeToggle({ label }) {
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

// Plays the server-rendered <Reveal> elements (components/Reveal.jsx): fades
// and lifts them in when they enter the viewport and back out when they
// leave, like motion's whileInView with `viewport.amount`. With reduced
// motion (MotionConfig reducedMotion="user" semantics) only opacity animates.
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const show = (el, on) => {
      const { y, delay, duration } = el.dataset;
      const t = `${duration}s ${EASE} ${delay}s`;
      el.style.transition = reduce.matches ? `opacity ${t}` : `opacity ${t}, transform ${t}`;
      el.style.opacity = on ? '1' : '0';
      el.style.transform = on ? 'none' : `translateY(${y}px)`;
    };
    const observers = new Map();
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      const amount = el.dataset.amount || '0.2';
      let io = observers.get(amount);
      if (!io) {
        io = new IntersectionObserver((entries) => entries.forEach((e) => show(e.target, e.isIntersecting)), { threshold: Number(amount) });
        observers.set(amount, io);
      }
      io.observe(el);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);
  return null;
}
