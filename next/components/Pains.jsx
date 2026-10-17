'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { pains } from '@/content/site';
import { SectionHead } from './Shell';

// Each pain is crossed out as it scrolls to the middle of the screen,
// and the fix slides in underneath it.
function PainCard({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'center 0.45'] });
  const strike = useTransform(scrollYProgress, [0.35, 0.7], ['0% 3px', '100% 3px']);
  const painOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0.45]);
  const fixOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const fixY = useTransform(scrollYProgress, [0.6, 1], [24, 0]);
  const cardX = useTransform(scrollYProgress, [0, 0.5], [index % 2 ? '6%' : '-6%', '0%']);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <motion.article ref={ref} className="pain" style={{ x: cardX, opacity: cardOpacity }}>
      <div className="pain-num">{String(index + 1).padStart(2, '0')}</div>
      <div className="pain-body">
        <p className="tag">{item.tag}</p>
        <motion.p className="pain-text" style={{ opacity: painOpacity }}>
          <span className="pain-label">Pain</span>
          <motion.span className="pain-strike" style={{ backgroundSize: strike }}>{item.pain}</motion.span>
        </motion.p>
        <motion.div className="fix" style={{ opacity: fixOpacity, y: fixY }}>
          <span className="fix-label">Fix</span>
          <p>{item.fix}</p>
          {item.link && <a href={item.link.href} className="text-link">{item.link.label} →</a>}
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function Pains() {
  return (
    <section id="pains" className="block">
      <SectionHead
        kicker="SOUND FAMILIAR? · よくある課題"
        title="It starts with the problem."
        body="Most teams don’t need more tools. They need the chores between their tools to disappear."
      />
      <div className="pains">
        {pains.map((p, i) => <PainCard key={p.id} item={p} index={i} />)}
      </div>
    </section>
  );
}
