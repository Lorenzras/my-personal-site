import { MotionConfig } from 'motion/react';

// Each Astro island is its own React root, so each one gets the
// MotionConfig that the Next.js Shell used to provide for the whole page:
// honour the OS "reduce motion" setting.
export default function withMotion(C) {
  const Wrapped = (props) => (
    <MotionConfig reducedMotion="user">
      <C {...props} />
    </MotionConfig>
  );
  Wrapped.displayName = `Motion(${C.displayName || C.name})`;
  return Wrapped;
}
