'use client';

import { motion } from 'motion/react';
import { Bar, C, Pointer, Sparkle, Svg, Win, loop, useReduced } from './primitives';

/* ---------- retype: the same record typed into four places ---------- */
function Retype({ reduced }) {
  const cards = [
    [22, 18],
    [166, 18],
    [22, 116],
    [166, 116],
  ];
  const D = 6; // cycle length (s)
  return (
    <>
      {/* dashed "copy" arrows between cards */}
      <path d="M154 60 h8 M154 158 h8 M86 108 v6 M230 108 v6" stroke={C.ink} strokeWidth={1.5} strokeDasharray="2 3" strokeLinecap="round" opacity={0.5} />
      {cards.map(([x, y], i) => {
        const odd = i === 3;
        return (
          <g key={i}>
            <rect x={x} y={y} width={132} height={86} rx={9} fill={C.paper} stroke={odd ? C.bad : C.line} strokeWidth={1.5} />
            <circle cx={x + 16} cy={y + 16} r={6} fill={C.blue} opacity={0.8} />
            <Bar x={x + 28} y={y + 13.5} w={52} o={0.55} />
            {[0, 1, 2].map((r) => (
              <g key={r}>
                <Bar x={x + 10} y={y + 35 + r * 15} w={22} h={4} o={0.3} />
                <rect x={x + 38} y={y + 31 + r * 15} width={84} height={11} rx={3} fill={C.soft} />
              </g>
            ))}
            <Bar x={x + 42} y={y + 34.5} w={odd ? 48 : 56} h={4}  o={0.55} />
            <Bar x={x + 42} y={y + 64.5} w={34} h={4} o={0.55} />
            {/* the field being retyped */}
            <motion.rect
              x={x + 42}
              y={y + 49.5}
              width={odd ? 30 : 46}
              height={4}
              rx={2}
              fill={odd ? C.bad : C.ink}
              opacity={odd ? 1 : 0.55}
              {...loop(reduced, { width: [0, 0, odd ? 30 : 46, odd ? 30 : 46] }, { duration: D, times: [0, i * 0.2, i * 0.2 + 0.16, 1], ease: 'linear' })}
            />
            {odd && (
              <motion.g {...loop(reduced, { opacity: [0, 0, 1, 1] }, { duration: D, times: [0, 0.75, 0.8, 1] })}>
                <circle cx={x + 112} cy={y + 52} r={6} fill={C.bad} />
                <path d={`M${x + 112} ${y + 49} v3.2 M${x + 112} ${y + 55} v0.2`} stroke={C.paper} strokeWidth={1.8} strokeLinecap="round" />
              </motion.g>
            )}
          </g>
        );
      })}
      {/* cursor hopping between the four copies */}
      <motion.g
        {...(reduced
          ? {}
          : {
              animate: { x: [0, 0, 144, 144, 0, 0, 144, 144, 0], y: [0, 0, 0, 0, 98, 98, 98, 98, 0] },
              transition: { duration: D, times: [0, 0.16, 0.2, 0.36, 0.4, 0.56, 0.6, 0.96, 1], repeat: Infinity, ease: 'easeInOut' },
            })}
      >
       <g transform={reduced ? 'translate(254 170)' : 'translate(110 72)'}>
        <Pointer />
       </g>
      </motion.g>
    </>
  );
}

/* ---------- status: ticket keeps changing, bell ignored, deadline missed ---------- */
function Status({ reduced }) {
  const x = 22;
  const y = 30;
  return (
    <>
      <rect x={x} y={y} width={156} height={160} rx={10} fill={C.paper} stroke={C.line} strokeWidth={1.5} />
      <rect x={x} y={y} width={4} height={160} rx={2} fill={C.amber} />
      <Bar x={x + 16} y={y + 18} w={70} h={6} o={0.6} />
      {/* status pill cycling */}
      <motion.rect
        x={x + 98}
        y={y + 14}
        width={46}
        height={14}
        rx={7}
        fill={C.amber}
        {...loop(reduced, { fill: ['var(--ill-amber)', 'var(--ill-blue)', 'var(--ill-pink)', 'var(--ill-amber)'] }, { duration: 4.5, times: [0, 0.33, 0.66, 1], ease: 'anticipate' })}
      />
      <Bar x={x + 106} y={y + 19} w={30} h={4} fill={C.paper} o={0.9} />
      {[0, 1, 2, 3].map((i) => (
        <Bar key={i} x={x + 16} y={y + 42 + i * 13} w={[124, 110, 118, 72][i]} h={4} o={0.22} />
      ))}
      <path d={`M${x + 16} ${y + 104} H${x + 140}`} stroke={C.line} strokeWidth={1.5} />
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx={x + 24} cy={y + 122 + i * 22} r={7} fill={[C.blue, C.pink][i]} opacity={0.8} />
          <rect x={x + 36} y={y + 114 + i * 22} width={[92, 70][i]} height={16} rx={8} fill={C.soft} />
          <Bar x={x + 44} y={y + 120 + i * 22} w={[60, 40][i]} h={4} o={0.35} />
        </g>
      ))}

      {/* ignored bell */}
      <g transform="translate(236 46)">
        <motion.g style={{ originX: 0.5, originY: 0 }} {...loop(reduced, { rotate: [0, -14, 12, -8, 0, 0] }, { duration: 2.4, times: [0, 0.1, 0.2, 0.3, 0.4, 1] })}>
          <path d="M-12 8 C-12 -6 -8 -12 0 -12 C8 -12 12 -6 12 8 L15 12 H-15 Z" fill={C.paper} stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round" />
          <path d="M-4 15 a4 4 0 0 0 8 0" stroke={C.ink} strokeWidth={1.5} />
        </motion.g>
        <circle cx={11} cy={-10} r={7} fill={C.bad} />
        <Bar x={8} y={-11} w={6} h={2.4} fill={C.paper} />
        {/* muted: a slash through */}
        <path d="M-18 -16 L20 22" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
      </g>

      {/* calendar with a missed deadline */}
      <g transform="translate(200 92)">
        <rect x={0} y={0} width={100} height={100} rx={10} fill={C.paper} stroke={C.line} strokeWidth={1.5} />
        <path d="M0 10 a10 10 0 0 1 10 -10 h80 a10 10 0 0 1 10 10 v12 h-100 Z" fill={C.bad} opacity={0.9} />
        <rect x={24} y={-5} width={4} height={12} rx={2} fill={C.ink} />
        <rect x={72} y={-5} width={4} height={12} rx={2} fill={C.ink} />
        {Array.from({ length: 12 }, (_, k) => {
          const cx = 18 + (k % 4) * 21.33;
          const cy = 38 + Math.floor(k / 4) * 20;
          const past = k < 6;
          return <rect key={k} x={Math.round(cx * 100) / 100 - 6} y={cy - 6} width={12} height={12} rx={3} fill={past ? C.soft : 'none'} stroke={past ? 'none' : C.line} />;
        })}
        <motion.circle
          cx={60.66}
          cy={58}
          r={10}
          stroke={C.bad}
          strokeWidth={2}
          style={{ originX: 0.5, originY: 0.5 }}
          {...loop(reduced, { scale: [1, 1.25, 1], opacity: [1, 0.5, 1] }, { duration: 1.6 })}
        />
        <path d="M56.66 54 l8 8 m0 -8 l-8 8" stroke={C.bad} strokeWidth={2} strokeLinecap="round" />
      </g>
    </>
  );
}

/* ---------- masking: manual redaction, one field missed ---------- */
function Masking({ reduced }) {
  const x = 78;
  const y = 16;
  const rows = [0, 1, 2, 3, 4, 5];
  const masked = [true, true, false, true, false, true];
  const missed = 2;
  const D = 5;
  return (
    <>
      <rect x={x + 8} y={y + 6} width={164} height={190} rx={10} fill={C.soft} />
      <rect x={x} y={y} width={164} height={190} rx={10} fill={C.paper} stroke={C.line} strokeWidth={1.5} />
      <Bar x={x + 16} y={y + 18} w={64} h={7} o={0.6} />
      <Bar x={x + 16} y={y + 32} w={40} h={4} o={0.25} />
      {rows.map((r) => {
        const ry = y + 52 + r * 22;
        const t0 = 0.08 + r * 0.1;
        return (
          <g key={r}>
            <Bar x={x + 16} y={ry + 2} w={28} h={4} o={0.3} />
            <Bar x={x + 54} y={ry + 2} w={[70, 54, 62, 80, 46, 58][r]} h={4} o={0.45} />
            {masked[r] && (
              <motion.rect
                x={x + 50}
                y={ry - 3}
                width={[78, 62, 70, 88, 54, 66][r]}
                height={14}
                rx={3}
                fill={C.ink}
                {...loop(reduced, { width: [0, 0, [78, 62, 70, 88, 54, 66][r], [78, 62, 70, 88, 54, 66][r], 0] }, { duration: D, times: [0, t0, t0 + 0.08, 0.92, 1], ease: 'easeOut' })}
              />
            )}
            {r === missed && (
              <motion.rect
                x={x + 48}
                y={ry - 5}
                width={74}
                height={18}
                rx={4}
                fill={C.bad}
                fillOpacity={0.12}
                stroke={C.bad}
                strokeWidth={1.5}
                {...loop(reduced, { opacity: [0, 0, 1, 0.4, 1, 1, 0] }, { duration: D, times: [0, 0.6, 0.66, 0.74, 0.82, 0.92, 1] })}
              />
            )}
          </g>
        );
      })}
      {/* sweeping scan line */}
      <motion.g {...loop(reduced, { y: [0, 0, 132, 132] }, { duration: D, times: [0, 0.06, 0.66, 1], ease: 'linear' })} opacity={reduced ? 0 : 1}>
        <rect x={x + 6} y={y + 46} width={152} height={2} rx={1} fill={C.ok} opacity={0.7} />
      </motion.g>
      {/* warning tag on the missed field */}
      <motion.g {...loop(reduced, { opacity: [0, 0, 1, 1, 0] }, { duration: D, times: [0, 0.62, 0.68, 0.92, 1] })}>
        <circle cx={x + 164} cy={y + 103} r={11} fill={C.bad} />
        <path d={`M${x + 164} ${y + 97} v6.5 M${x + 164} ${y + 108} v0.3`} stroke={C.paper} strokeWidth={2.2} strokeLinecap="round" />
      </motion.g>
    </>
  );
}

/* ---------- ai-risk: confidential file dragged into a public AI cloud ---------- */
function AiRisk({ reduced }) {
  const D = 4.5;
  return (
    <>
      <Win x={16} y={34} w={150} h={160} mono="AI">
        <rect x={28} y={64} width={92} height={22} rx={11} fill={C.soft} />
        <Bar x={38} y={73} w={60} h={4} o={0.4} />
        <rect x={64} y={96} width={90} height={22} rx={11} fill={C.blue} opacity={0.16} />
        <Bar x={74} y={105} w={56} h={4} fill={C.blue} o={0.7} />
        <rect x={28} y={160} width={126} height={22} rx={8} fill={C.paper} stroke={C.line} />
        <Bar x={38} y={169} w={40} h={4} o={0.3} />
        <Sparkle cx={140} cy={171} s={5} fill={C.blue} />
      </Win>

      {/* public cloud */}
      <g>
        <path d="M222 118 h66 a22 22 0 0 0 0 -44 a30 30 0 0 0 -56 -10 a24 24 0 0 0 -10 54 Z" fill={C.paper} stroke={C.line} strokeWidth={1.5} />
        <circle cx={254} cy={90} r={14} stroke={C.ink} strokeWidth={1.5} opacity={0.6} />
        <path d="M240 90 h28 M254 76 c-8 8 -8 20 0 28 c8 -8 8 -20 0 -28" stroke={C.ink} strokeWidth={1.2} opacity={0.6} />
      </g>
      <path d="M134 150 C 180 150 200 140 236 124" stroke={C.bad} strokeWidth={1.5} strokeDasharray="3 5" strokeLinecap="round" opacity={0.6} />

      {/* the file + cursor being dragged */}
      <motion.g
        {...loop(reduced, { x: [0, 0, 98, 98, 0], y: [0, 0, -36, -36, 0], opacity: [0, 1, 1, 0, 0] }, { duration: D, times: [0, 0.1, 0.6, 0.85, 1] })}
      >
        <g transform={reduced ? 'translate(176 106)' : 'translate(116 128)'}>
          <path d="M0 4 a4 4 0 0 1 4 -4 h16 l8 8 v22 a4 4 0 0 1 -4 4 h-20 a4 4 0 0 1 -4 -4 Z" fill={C.paper} stroke={C.ink} strokeWidth={1.5} />
          <Bar x={5} y={14} w={16} h={3} o={0.5} />
          <Bar x={5} y={20} w={12} h={3} o={0.5} />
          <rect x={4} y={25} width={20} height={5} rx={1.5} fill={C.bad} />
          <g transform="translate(22 24)"><Pointer /></g>
        </g>
      </motion.g>

      {/* warning */}
      <motion.g style={{ originX: 0.5, originY: 0.5 }} {...loop(reduced, { scale: [1, 1.12, 1] }, { duration: 1.4 })}>
        <path d="M262 136 L284 174 H240 Z" fill={C.bad} stroke={C.bad} strokeWidth={3} strokeLinejoin="round" />
        <path d="M262 149 v12 M262 167 v0.4" stroke={C.paper} strokeWidth={2.6} strokeLinecap="round" />
      </motion.g>
    </>
  );
}

/* ---------- kintone: a wobbling tower of customisation scripts ---------- */
function Tower({ reduced }) {
  const blocks = [
    { w: 140, dx: 0, c: C.blue },
    { w: 124, dx: 10, c: C.amber },
    { w: 132, dx: -6, c: C.bad, crack: true },
    { w: 116, dx: 14, c: C.pink },
    { w: 104, dx: 4, c: C.blue },
  ];
  const base = 190;
  const h = 28;
  return (
    <>
      <path d="M64 192 H256" stroke={C.line} strokeWidth={1.5} strokeLinecap="round" />
      <ellipse cx={160} cy={194} rx={80} ry={5} fill={C.soft} />
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        {...loop(reduced, { rotate: [0, 2.2, -1.6, 1, 0] }, { duration: 3.2 })}
      >
        {blocks.map((b, i) => {
          const bx = 160 - b.w / 2 + b.dx;
          const by = base - (i + 1) * (h + 3);
          return (
            <g key={i}>
              <rect x={bx} y={by} width={b.w} height={h} rx={6} fill={C.paper} stroke={b.crack ? C.bad : C.line} strokeWidth={1.5} />
              <rect x={bx} y={by} width={5} height={h} rx={2.5} fill={b.c} opacity={0.9} />
              <path d={`M${bx + 16} ${by + 9} l-4 5 l4 5 M${bx + 26} ${by + 9} l4 5 l-4 5`} stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              <Bar x={bx + 38} y={by + 9} w={b.w * 0.42} h={4} o={0.4} />
              <Bar x={bx + 38} y={by + 16} w={b.w * 0.26} h={4} o={0.22} />
              {i === 0 && (
                <text x={bx + b.w - 10} y={by + 18} textAnchor="end" fontSize={9} fontWeight={700} fontFamily="ui-sans-serif, system-ui, sans-serif" fill={C.ink}>kt</text>
              )}
              {b.crack && (
                <motion.path
                  d={`M${bx + b.w * 0.62} ${by} l-5 9 l7 5 l-6 8 l3 6`}
                  stroke={C.bad}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  {...loop(reduced, { pathLength: [0, 1, 1] }, { duration: 3.2, times: [0, 0.4, 1] })}
                />
              )}
            </g>
          );
        })}
      </motion.g>
      {/* chip falling off */}
      <motion.rect
        x={226}
        y={104}
        width={7}
        height={7}
        rx={1.5}
        fill={C.bad}
        {...loop(reduced, { y: [0, 0, 76], opacity: [0, 1, 0], rotate: [0, 0, 90] }, { duration: 3.2, times: [0, 0.4, 1], ease: 'easeIn' })}
      />
    </>
  );
}

const ART = { retype: Retype, status: Status, masking: Masking, 'ai-risk': AiRisk, kintone: Tower };

export default function PainArt({ id, className }) {
  const reduced = useReduced();
  const Art = ART[id];
  if (!Art) return null;
  return (
    <Svg vb="0 0 320 220" className={className}>
      <Art reduced={reduced} />
    </Svg>
  );
}
