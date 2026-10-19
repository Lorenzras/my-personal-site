'use client';

import { Activity, lazy, useEffect, useRef, useState } from 'react';

// Deferred hydration for below-the-fold interactive sections ("islands").
//
// The island is still rendered on the server, so its full HTML (and text, for
// search engines) is in the static page. In the browser its code is not even
// downloaded until it is needed: React.lazy waits on a gate, so during
// hydration the island's Suspense boundary suspends and React keeps the
// server HTML as it is (no fallback, no layout shift). When the gate opens
// (the island nears the viewport, the visitor points at / focuses it, or, for
// `when="idle"`, the browser goes idle after load) the chunk loads and React
// hydrates the boundary in place.
//
// Props must be serialisable (they come from server components). LazyIsland
// keeps no state that changes after mount: re-rendering a still-dehydrated
// boundary with new props would make React throw the server HTML away.
const loaders = {
  hero: () => import('./islands/Hero'),
  pains: () => import('./islands/Pains'),
  services: () => import('./islands/Services'),
  integrations: () => import('./islands/Integrations'),
  masking: () => import('./islands/MaskingSection'),
  pipeline: () => import('./islands/Pipeline'),
  security: () => import('./islands/Security'),
  process: () => import('./islands/Process'),
  work: () => import('./islands/Work'),
  diffIcon: () => import('./islands/DiffIcon'),
  maskPreview: () => import('./islands/MaskPreview'),
  workCover: () => import('./islands/WorkCover'),
};

// Server only: the same islands, synchronously, so the static HTML has them
// in place (a suspending React.lazy would be streamed out of order, into a
// hidden <div> moved into place by an inline script). Next replaces
// `typeof window` at build time, so this branch and these requires are
// dropped from the browser bundle.
const ssrIslands = typeof window === 'undefined'
  ? {
      hero: () => require('./islands/Hero').default,
      pains: () => require('./islands/Pains').default,
      services: () => require('./islands/Services').default,
      integrations: () => require('./islands/Integrations').default,
      masking: () => require('./islands/MaskingSection').default,
      pipeline: () => require('./islands/Pipeline').default,
      security: () => require('./islands/Security').default,
      process: () => require('./islands/Process').default,
      work: () => require('./islands/Work').default,
      diffIcon: () => require('./islands/DiffIcon').default,
      maskPreview: () => require('./islands/MaskPreview').default,
      workCover: () => require('./islands/WorkCover').default,
    }
  : null;

function gate(name) {
  if (typeof window === 'undefined') return { open() {}, Island: ssrIslands[name]() };
  let open;
  const ready = new Promise((resolve) => { open = resolve; });
  return { open, Island: lazy(() => ready.then(loaders[name])) };
}

const onIdle = (cb) => {
  const run = () => (window.requestIdleCallback ? requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 200));
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
};

export default function LazyIsland({ name, props, when = 'visible' }) {
  const [{ open, Island }] = useState(() => gate(name));
  const marker = useRef(null);

  useEffect(() => {
    const m = marker.current;
    const el = m.nextElementSibling || m.parentElement;
    const events = ['pointerover', 'pointerdown', 'focusin'];
    const stop = () => {
      io?.disconnect();
      events.forEach((e) => el.removeEventListener(e, go));
    };
    const go = () => { stop(); open(); };
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) go(); }, { rootMargin: '200px 0px' })
      : null;
    if (io) io.observe(el); else go();
    events.forEach((e) => el.addEventListener(e, go, { passive: true }));
    if (when === 'idle') onIdle(go);
    else if (when === 'now') go();
    return stop;
  }, [open, when]);

  return (
    <>
      <span ref={marker} hidden />
      <Activity mode="visible">
        <Island {...props} />
      </Activity>
    </>
  );
}
