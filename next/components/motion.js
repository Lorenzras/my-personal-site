// Everything the site uses from Motion, imported from `framer-motion` (the
// package `motion/react` re-exports). `motion/react` reads `fm.motion` from a
// namespace import, which keeps the full `motion` component and all of its
// features (drag, layout projection, ...) in the Turbopack bundle even when
// only `m` is used. Importing the named exports directly lets the unused
// parts be tree-shaken; animation features come from <LazyMotion> instead
// (components/islands/withMotion.jsx).
export {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  domMax,
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
