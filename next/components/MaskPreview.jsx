'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { maskingDemo } from '@/content/site';

const EASE = [0.65, 0, 0.35, 1];

// One pass of the animation: scan, highlight each personal field, mask it.
function Pass({ play }) {
  const on = (v) => (play ? v : undefined);
  const sensitive = maskingDemo.doc.filter((r) => r[2]).length;
  let n = 0;
  return (
    <>
      <div className="doc-head">
        <span>申込書 · Application form</span>
        <motion.span
          className="doc-status"
          initial={{ opacity: 0, y: 6 }}
          animate={on({ opacity: 1, y: 0 })}
          transition={{ delay: 0.9 + 0.35 * sensitive }}
        >
          ✓ {sensitive} items masked · ready for review
        </motion.span>
      </div>
      <motion.div
        className="scan"
        initial={{ top: '0%', opacity: 0 }}
        animate={on({ top: ['0%', '100%'], opacity: [0, 1, 1, 0] })}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />
      {maskingDemo.doc.map(([label, value, isSensitive]) => {
        const d = isSensitive ? 0.4 + 0.35 * n++ : 0;
        return (
          <div key={label} className="doc-row">
            <span className="doc-label">{label}</span>
            <span className="doc-value">
              {value}
              {isSensitive && (
                <>
                  <motion.span
                    className="detect"
                    initial={{ opacity: 0 }}
                    animate={on({ opacity: [0, 1, 0] })}
                    transition={{ delay: d, duration: 0.9 }}
                  />
                  <motion.span
                    className="mask"
                    initial={{ scaleX: 0 }}
                    animate={on({ scaleX: 1 })}
                    transition={{ delay: d + 0.5, duration: 0.45, ease: EASE }}
                  >
                    <em>MASKED</em>
                  </motion.span>
                </>
              )}
            </span>
          </div>
        );
      })}
    </>
  );
}

// A mock document whose personal fields get masked when it scrolls into view.
// `loop` replays it every few seconds (used on the demo page).
export default function MaskPreview({ loop = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: !loop, margin: '-20% 0px' });
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!loop || !inView) return;
    const t = setInterval(() => setRun((r) => r + 1), 6000);
    return () => clearInterval(t);
  }, [loop, inView]);

  return (
    <div ref={ref} className="doc" aria-label="Example document with personal data masked">
      <Pass key={run} play={inView} />
    </div>
  );
}
