'use client';

import { LazyMotion, MotionConfig, domAnimation } from '../motion';

// Each island hydrates on its own schedule, so each one gets the MotionConfig
// that the Shell used to provide for the whole page: honour the OS "reduce
// motion" setting.
//
// The components use motion's lightweight `m` elements; LazyMotion supplies
// the animation features. `domAnimation` (animate / exit / whileInView /
// gestures) covers everything except shared-layout animations (`layoutId`),
// which the islands that need them get by passing `domMax`.
export default function withMotion(C, features = domAnimation) {
  const Wrapped = (props) => (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={features}>
        <C {...props} />
      </LazyMotion>
    </MotionConfig>
  );
  Wrapped.displayName = `Motion(${C.displayName || C.name})`;
  return Wrapped;
}
