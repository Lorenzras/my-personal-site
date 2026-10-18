'use client';

import { m } from '../motion';
import { Bar, C, Draw, Shield, Sparkle, Svg, loop, useReduced } from './primitives';

const S = { stroke: C.ink, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
const SOK = { ...S, stroke: C.ok };

function Tile({ size }) {
  const r = size / 4;
  return <rect x={0.75} y={0.75} width={size - 1.5} height={size - 1.5} rx={r} fill={C.soft} stroke={C.line} strokeWidth={1.5} />;
}

/* ---------------- OfferIcon (64x64) ---------------- */
function Audit({ reduced }) {
  return (
    <>
      <path d="M16 22 H30 M34 22 C42 22 40 42 48 42" {...S} opacity={0.6} />
      <rect x={10} y={17} width={10} height={10} rx={3} fill={C.paper} {...S} />
      <rect x={28} y={17} width={10} height={10} rx={3} fill={C.paper} {...S} />
      <rect x={44} y={37} width={10} height={10} rx={3} fill={C.paper} {...S} />
      <m.g {...loop(reduced, { x: [0, 16, 16, 0], y: [0, -4, -4, 0] }, { duration: 4, times: [0, 0.4, 0.6, 1] })}>
        <circle cx={22} cy={38} r={9} fill={C.paper} fillOpacity={0.7} {...SOK} strokeWidth={2} />
        <path d="M28.5 44.5 L35 51" {...SOK} strokeWidth={2.6} />
        <path d="M18.5 38 l2.5 2.5 l4.5 -5" {...SOK} />
      </m.g>
    </>
  );
}

function Integration({ reduced }) {
  return (
    <>
      <path d="M22 32 C30 20 34 44 42 32" {...SOK} strokeDasharray="3 3" />
      <rect x={8} y={22} width={18} height={20} rx={5} fill={C.paper} {...S} />
      <Bar x={12} y={28} w={10} h={3} o={0.5} />
      <Bar x={12} y={34} w={7} h={3} o={0.3} />
      <rect x={38} y={22} width={18} height={20} rx={5} fill={C.paper} {...S} />
      <circle cx={47} cy={32} r={4} fill={C.ok} />
      <Packet2 reduced={reduced} />
    </>
  );
}

// Tiny inline packet for icons (avoids extra keyframe samples).
function Packet2({ reduced }) {
  const xs = [26, 28.5, 32, 35.5, 38];
  const ys = [28.5, 28, 32, 36, 35.5];
  if (reduced) return <circle cx={32} cy={32} r={2.6} fill={C.ok} />;
  return (
    <m.circle
      cx={xs[0]}
      cy={ys[0]}
      r={2.6}
      fill={C.ok}
      animate={{ cx: xs, cy: ys, opacity: [0, 1, 1, 1, 0] }}
      transition={{ duration: 1.8, ease: 'linear', repeat: Infinity, repeatDelay: 0.4 }}
    />
  );
}

function AiDoc({ reduced }) {
  return (
    <>
      <path d="M14 14 a4 4 0 0 1 4 -4 h16 l8 8 v28 a4 4 0 0 1 -4 4 h-20 a4 4 0 0 1 -4 -4 Z" fill={C.paper} {...S} />
      <path d="M34 10 v8 h8" {...S} />
      <Bar x={19} y={24} w={16} h={3} o={0.45} />
      <Bar x={19} y={30} w={12} h={3} fill={C.ink} o={0.9} />
      <Bar x={19} y={36} w={18} h={3} o={0.45} />
      <m.g style={{ originX: 0.5, originY: 0.5 }} {...loop(reduced, { scale: [0.8, 1.1, 0.8], rotate: [0, 45, 90] }, { duration: 3 })}>
        <Sparkle cx={47} cy={14} s={6} fill={C.amber} />
      </m.g>
      <Shield cx={45} cy={46} s={18} reduced={reduced} />
    </>
  );
}

function KintoneBox({ reduced }) {
  const cells = [[16, 16], [34, 16], [16, 34], [34, 34]];
  return (
    <>
      {cells.map(([x, y], i) => (
        <m.rect
          key={i}
          x={x}
          y={y}
          width={14}
          height={14}
          rx={4}
          fill={i === 3 ? C.ok : C.paper}
          stroke={i === 3 ? C.ok : C.ink}
          strokeWidth={1.5}
          {...(i === 3 ? loop(reduced, { opacity: [1, 0.45, 1] }, { duration: 2.2 }) : {})}
        />
      ))}
      <path d="M38.5 41 l2.5 2.5 l4.5 -5" stroke={C.paper} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={10} y={10} width={44} height={44} rx={10} {...S} strokeDasharray="4 4" opacity={0.6} />
    </>
  );
}

const OFFERS = { audit: Audit, integration: Integration, ai: AiDoc, kintone: KintoneBox };

export function OfferIcon({ id, className }) {
  const reduced = useReduced();
  const I = OFFERS[id];
  if (!I) return null;
  return (
    <Svg vb="0 0 64 64" className={className}>
      <Tile size={64} />
      <I reduced={reduced} />
    </Svg>
  );
}

/* ---------------- DiffIcon (48x48) ---------------- */
const DIFFS = [
  // 0: working prototype on a screen
  ({ reduced }) => (
    <>
      <rect x={9} y={12} width={30} height={21} rx={4} fill={C.paper} {...S} />
      <path d="M19 38 h10 M24 33 v5" {...S} />
      <m.path d="M21 18 L29 22.5 L21 27 Z" fill={C.ok} style={{ originX: 0.5, originY: 0.5 }} {...loop(reduced, { scale: [1, 1.15, 1] }, { duration: 2 })} />
    </>
  ),
  // 1: security sheet
  ({ reduced }) => (
    <>
      <path d="M11 11 a3 3 0 0 1 3 -3 h12 l6 6 v20 a3 3 0 0 1 -3 3 h-15 a3 3 0 0 1 -3 -3 Z" fill={C.paper} {...S} />
      <Bar x={15} y={17} w={11} h={2.6} o={0.45} />
      <Bar x={15} y={22} w={8} h={2.6} o={0.45} />
      <Shield cx={32} cy={32} s={15} reduced={reduced} />
    </>
  ),
  // 2: bilingual docs
  ({ reduced }) => (
    <>
      <rect x={9} y={10} width={18} height={24} rx={3} fill={C.paper} {...S} />
      <Bar x={13} y={16} w={10} h={2.6} o={0.45} />
      <Bar x={13} y={21} w={7} h={2.6} o={0.45} />
      <m.g {...loop(reduced, { x: [0, 2, 0], y: [0, -1, 0] }, { duration: 3 })}>
        <rect x={20} y={15} width={18} height={24} rx={3} fill={C.paper} {...SOK} />
        <Bar x={24} y={21} w={10} h={2.6} fill={C.ok} o={0.7} />
        <Bar x={24} y={26} w={7} h={2.6} fill={C.ok} o={0.7} />
        <Bar x={24} y={31} w={9} h={2.6} fill={C.ok} o={0.4} />
      </m.g>
    </>
  ),
  // 3: low risk, small steps
  ({ reduced }) => (
    <>
      <path d="M8 38 h8 v-6 h8 v-6 h8" {...S} />
      <circle cx={34} cy={18} r={8} fill={C.ok} />
      <Draw d="M30.5 18 l2.5 2.5 l4.5 -5" reduced={reduced} stroke={C.paper} w={2} />
    </>
  ),
];

export function DiffIcon({ index, className }) {
  const reduced = useReduced();
  const I = DIFFS[index];
  if (!I) return null;
  return (
    <Svg vb="0 0 48 48" className={className}>
      <Tile size={48} />
      <I reduced={reduced} />
    </Svg>
  );
}

/* ---------------- ProcessIcon (48x48) ---------------- */
const STEPS = [
  // 0: understand
  ({ reduced }) => (
    <>
      <circle cx={17} cy={17} r={4} {...S} />
      <path d="M10 30 a7 7 0 0 1 14 0" {...S} />
      <m.g {...loop(reduced, { x: [0, -2, 0], y: [0, -2, 0] }, { duration: 3 })}>
        <circle cx={30} cy={26} r={7} fill={C.paper} {...SOK} strokeWidth={2} />
        <path d="M35 31 L40 36" {...SOK} strokeWidth={2.4} />
      </m.g>
    </>
  ),
  // 1: prototype
  ({ reduced }) => (
    <>
      <rect x={8} y={11} width={26} height={20} rx={4} fill={C.paper} {...S} />
      <Bar x={12} y={16} w={12} h={2.6} o={0.45} />
      <Bar x={12} y={21} w={8} h={2.6} o={0.45} />
      <m.g style={{ originX: 0.5, originY: 0.5 }} {...loop(reduced, { rotate: [0, -18, 0] }, { duration: 2.4 })}>
        <path d="M26 39 L33.5 31.5" {...SOK} strokeWidth={3.2} />
        <path d="M38.6 25.2 a5.5 5.5 0 1 0 2.2 5.4 l-3.4 -0.6 l-1 -2.8 Z" fill={C.paper} {...SOK} strokeWidth={1.8} />
      </m.g>
    </>
  ),
  // 2: build & secure
  ({ reduced }) => (
    <>
      <rect x={8} y={26} width={12} height={12} rx={3} fill={C.paper} {...S} />
      <rect x={8} y={12} width={12} height={12} rx={3} fill={C.paper} {...S} />
      <m.rect x={22} y={26} width={12} height={12} rx={3} fill={C.paper} {...S} {...loop(reduced, { y: [-6, 0, 0, -6], opacity: [0, 1, 1, 0] }, { duration: 3, times: [0, 0.25, 0.85, 1] })} />
      <rect x={28} y={14} width={13} height={10} rx={2.5} fill={C.ok} />
      <path d="M31 14 v-2.5 a3.5 3.5 0 0 1 7 0 V14" {...SOK} />
      <circle cx={34.5} cy={19} r={1.5} fill={C.paper} />
    </>
  ),
  // 3: hand over
  ({ reduced }) => (
    <>
      <path d="M10 20 L20 15 L30 20 L20 25 Z" fill={C.paper} {...S} />
      <path d="M10 20 V31 L20 36 L30 31 V20 M20 25 V36" {...S} />
      <m.g {...loop(reduced, { x: [0, 3, 0] }, { duration: 2 })}>
        <path d="M30 28 H40 M36 24 L40 28 L36 32" {...SOK} strokeWidth={2} />
      </m.g>
    </>
  ),
];

export function ProcessIcon({ index, className }) {
  const reduced = useReduced();
  const I = STEPS[index];
  if (!I) return null;
  return (
    <Svg vb="0 0 48 48" className={className}>
      <Tile size={48} />
      <I reduced={reduced} />
    </Svg>
  );
}
