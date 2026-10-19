import { useSyncExternalStore } from 'react';

// Hydration-safe "prefers-reduced-motion". motion's useReducedMotion() reads
// the media query during the first client render, so with reduced motion on
// the client markup differs from the server markup (React error #418, a
// hydration mismatch; the Next.js build has the same issue). Here the first
// client render uses the server value (false) and React re-renders with the
// real value right after hydration, with no mismatch.
const QUERY = '(prefers-reduced-motion: reduce)';
const subscribe = (cb) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
