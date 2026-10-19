'use client';

import { motion } from 'motion/react';
import { Bar, C, Pointer, Shield, Sparkle, Svg, Win, loop, useReduced } from './primitives';

// Every illustration has two states: `fixed` false shows today's manual chore,
// `fixed` true shows the automated result. Elements in `.pa-today` / `.pa-fixed`
// crossfade, `.pa-move` groups slide between positions, `.pa-draw` paths draw in
// and `.pa-pop` badges pop in (all CSS transitions in globals.css, so the
// markup is deterministic and reduced motion simply skips the transitions).
// Looping chores stop while the automated state is shown.

const mv = (x, y, s = 1) => ({ transform: `translate(${x}px, ${y}px) scale(${s})` });

// A teal check badge that pops in with the automated state.
function OkBadge({ cx, cy, r = 8 }) {
  return (
    <g className="pa-pop">
      <circle cx={cx} cy={cy} r={r} fill={C.ok} />
      <path d={`M${cx - r * 0.45} ${cy} l${r * 0.35} ${r * 0.35} l${r * 0.6} ${-r * 0.7}`} stroke={C.paper} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}


/* ---------- retype: the same record typed into four places → entered once, synced ---------- */
const RETYPE_TODAY = [[22, 18, 1], [166, 18, 1], [22, 116, 1], [166, 116, 1]];
const RETYPE_FIXED = [[8, 67, 1], [222, 8, 0.62], [222, 80, 0.62], [222, 152, 0.62]];

function AppGlyph({ i }) {
  if (i === 2) {
    return (
      <g>
        <rect x={107} y={11} width={15} height={11} rx={2} stroke={C.ink} strokeWidth={1.3} />
        <path d="M107.5 12 l7 5 l7 -5" stroke={C.ink} strokeWidth={1.3} strokeLinejoin="round" />
      </g>
    );
  }
  return (
    <g>
      <rect x={107} y={9} width={15} height={15} rx={4} fill={C.soft} />
      <text x={114.5} y={20} textAnchor="middle" fontSize={9} fontWeight={800} fontFamily="ui-sans-serif, system-ui, sans-serif" fill={C.ink}>
        {['k', 'B', '', '¥'][i]}
      </text>
    </g>
  );
}

function Retype({ reduced, fixed }) {
  const still = reduced || fixed;
  const pos = fixed ? RETYPE_FIXED : RETYPE_TODAY;
  const D = 6; // cycle length (s)
  return (
    <>
      {/* today: dashed "copy by hand" arrows between the four cards */}
      <path className="pa-today" d="M154 60 h12 M154 158 h12 M86 104 v12 M230 104 v12" stroke={C.bad} strokeWidth={1.6} strokeDasharray="3 4" strokeLinecap="round" opacity={0.7} />
      {/* fixed: one record syncing out to the other three */}
      <g className="pa-fixed" stroke={C.ok} strokeWidth={2} strokeLinecap="round">
        <path className="pa-draw" pathLength="1" d="M140 110 C181 110 181 35 222 35" />
        <path className="pa-draw" pathLength="1" d="M140 110 H222" />
        <path className="pa-draw" pathLength="1" d="M140 110 C181 110 181 179 222 179" />
      </g>
      {pos.map(([x, y, s], i) => {
        const odd = i === 3;
        const stroke = fixed ? (i === 0 ? C.ok : C.line) : odd ? C.bad : C.line;
        return (
          <g key={i} className="pa-move" style={mv(x, y, s)}>
            <rect className="pa-tint" width={132} height={86} rx={9} fill={C.paper} style={{ stroke }} strokeWidth={1.5} />
            <circle cx={16} cy={16} r={6} fill={C.blue} opacity={0.8} />
            <Bar x={28} y={13.5} w={52} o={0.55} />
            <AppGlyph i={i} />
            {[0, 1, 2].map((r) => (
              <g key={r}>
                <Bar x={10} y={35 + r * 15} w={22} h={4} o={0.3} />
                <rect x={38} y={31 + r * 15} width={84} height={11} rx={3} fill={C.soft} />
              </g>
            ))}
            <Bar x={42} y={34.5} w={56} h={4} o={0.55} />
            <Bar x={42} y={64.5} w={34} h={4} o={0.55} />
            {/* today: the field being retyped (the fourth copy differs) */}
            <g className="pa-today">
              <motion.rect
                x={42}
                y={49.5}
                width={odd ? 30 : 46}
                height={4}
                rx={2}
                fill={odd ? C.bad : C.ink}
                opacity={odd ? 1 : 0.55}
                {...loop(still, { width: [0, 0, odd ? 30 : 46, odd ? 30 : 46] }, { duration: D, times: [0, i * 0.2, i * 0.2 + 0.16, 1], ease: 'linear' })}
              />
              {odd && (
                <motion.g {...loop(still, { opacity: [0, 0, 1, 1] }, { duration: D, times: [0, 0.75, 0.8, 1] })}>
                  <circle cx={112} cy={52} r={6} fill={C.bad} />
                  <path d="M112 49 v3.2 M112 55 v0.2" stroke={C.paper} strokeWidth={1.8} strokeLinecap="round" />
                </motion.g>
              )}
            </g>
            {/* fixed: the same value everywhere */}
            <Bar className="pa-fixed" x={42} y={49.5} w={46} h={4} fill={C.ok} />
          </g>
        );
      })}
      {/* today: cursor hopping between the four copies */}
      <g className="pa-today">
        <motion.g
          {...(still
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
      </g>
      <g className="pa-fixed">
        {[8, 80, 152].map((y) => <OkBadge key={y} cx={303} cy={y + 3} />)}
      </g>
    </>
  );
}

/* ---------- status: bell ignored, deadline missed → message delivered, deadline met ---------- */
function Status({ reduced, fixed }) {
  const still = reduced || fixed;
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

      {/* today: ignored bell */}
      <g className="pa-today" transform="translate(236 46)">
        <motion.g style={{ originX: 0.5, originY: 0 }} {...loop(still, { rotate: [0, -14, 12, -8, 0, 0] }, { duration: 2.4, times: [0, 0.1, 0.2, 0.3, 0.4, 1] })}>
          <path d="M-12 8 C-12 -6 -8 -12 0 -12 C8 -12 12 -6 12 8 L15 12 H-15 Z" fill={C.paper} stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round" />
          <path d="M-4 15 a4 4 0 0 0 8 0" stroke={C.ink} strokeWidth={1.5} />
        </motion.g>
        <circle cx={11} cy={-10} r={7} fill={C.bad} />
        <Bar x={8} y={-11} w={6} h={2.4} fill={C.paper} />
        <path d="M-18 -16 L20 22" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
      </g>

      {/* fixed: the change arrives as a chat message */}
      <g className="pa-fixed">
        <path className="pa-draw" pathLength="1" d="M178 62 C188 62 186 48 198 48" stroke={C.ok} strokeWidth={2} strokeLinecap="round" />
        <rect x={198} y={22} width={108} height={52} rx={12} fill={C.paper} stroke={C.ok} strokeWidth={1.5} />
        <circle cx={215} cy={40} r={8} fill={C.ok} opacity={0.85} />
        <Bar x={229} y={34} w={56} h={5} o={0.55} />
        <Bar x={229} y={45} w={40} h={4} o={0.3} />
        <Bar x={209} y={58} w={78} h={4} o={0.22} />
        <OkBadge cx={304} cy={24} />
      </g>

      {/* calendar: missed deadline → met */}
      <g transform="translate(200 92)">
        <rect x={0} y={0} width={100} height={100} rx={10} fill={C.paper} stroke={C.line} strokeWidth={1.5} />
        <path className="pa-tint" d="M0 10 a10 10 0 0 1 10 -10 h80 a10 10 0 0 1 10 10 v12 h-100 Z" style={{ fill: fixed ? C.ok : C.bad }} opacity={0.9} />
        <rect x={24} y={-5} width={4} height={12} rx={2} fill={C.ink} />
        <rect x={72} y={-5} width={4} height={12} rx={2} fill={C.ink} />
        {Array.from({ length: 12 }, (_, k) => {
          const cx = 18 + (k % 4) * 21.33;
          const cy = 38 + Math.floor(k / 4) * 20;
          const past = k < 6;
          return <rect key={k} x={Math.round(cx * 100) / 100 - 6} y={cy - 6} width={12} height={12} rx={3} fill={past ? C.soft : 'none'} stroke={past ? 'none' : C.line} />;
        })}
        <g className="pa-today">
          <motion.circle
            cx={60.66}
            cy={58}
            r={10}
            stroke={C.bad}
            strokeWidth={2}
            style={{ originX: 0.5, originY: 0.5 }}
            {...loop(still, { scale: [1, 1.25, 1], opacity: [1, 0.5, 1] }, { duration: 1.6 })}
          />
          <path d="M56.66 54 l8 8 m0 -8 l-8 8" stroke={C.bad} strokeWidth={2} strokeLinecap="round" />
        </g>
        <g className="pa-fixed">
          <OkBadge cx={60.66} cy={58} r={9} />
        </g>
      </g>
    </>
  );
}

/* ---------- masking: manual redaction, one field missed → every field masked ---------- */
const MASK_W = [78, 62, 70, 88, 54, 66];
const MASKED = [true, true, false, true, false, true];
const MISSED = 2;

function Masking({ reduced, fixed }) {
  const still = reduced || fixed;
  const x = 78;
  const y = 16;
  const rows = [0, 1, 2, 3, 4, 5];
  const D = 5;
  return (
    <>
      <rect x={x + 8} y={y + 6} width={164} height={190} rx={10} fill={C.soft} />
      <rect className="pa-tint" x={x} y={y} width={164} height={190} rx={10} fill={C.paper} style={{ stroke: fixed ? C.ok : C.line }} strokeWidth={1.5} />
      <Bar x={x + 16} y={y + 18} w={64} h={7} o={0.6} />
      <Bar x={x + 16} y={y + 32} w={40} h={4} o={0.25} />
      {rows.map((r) => {
        const ry = y + 52 + r * 22;
        const t0 = 0.08 + r * 0.1;
        return (
          <g key={r}>
            <Bar x={x + 16} y={ry + 2} w={28} h={4} o={0.3} />
            <Bar x={x + 54} y={ry + 2} w={[70, 54, 62, 80, 46, 58][r]} h={4} o={0.45} />
            {/* today: masks drawn by hand, one field missed */}
            <g className="pa-today">
              {MASKED[r] && (
                <motion.rect
                  x={x + 50}
                  y={ry - 3}
                  width={MASK_W[r]}
                  height={14}
                  rx={3}
                  fill={C.ink}
                  {...loop(still, { width: [0, 0, MASK_W[r], MASK_W[r], 0] }, { duration: D, times: [0, t0, t0 + 0.08, 0.92, 1], ease: 'easeOut' })}
                />
              )}
              {r === MISSED && (
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
                  {...loop(still, { opacity: [0, 0, 1, 0.4, 1, 1, 0] }, { duration: D, times: [0, 0.6, 0.66, 0.74, 0.82, 0.92, 1] })}
                />
              )}
            </g>
            {/* fixed: every personal field masked, including the one missed */}
            {(MASKED[r] || r === MISSED) && (
              <rect className="pa-fixed" x={x + 50} y={ry - 3} width={MASK_W[r]} height={14} rx={3} fill={C.ink} />
            )}
          </g>
        );
      })}
      <g className="pa-today">
        {/* sweeping scan line */}
        <motion.g {...loop(still, { y: [0, 0, 132, 132] }, { duration: D, times: [0, 0.06, 0.66, 1], ease: 'linear' })} opacity={reduced ? 0 : 1}>
          <rect x={x + 6} y={y + 46} width={152} height={2} rx={1} fill={C.ok} opacity={0.7} />
        </motion.g>
        {/* warning tag on the missed field */}
        <motion.g {...loop(still, { opacity: [0, 0, 1, 1, 0] }, { duration: D, times: [0, 0.62, 0.68, 0.92, 1] })}>
          <circle cx={x + 164} cy={y + 103} r={11} fill={C.bad} />
          <path d={`M${x + 164} ${y + 97} v6.5 M${x + 164} ${y + 108} v0.3`} stroke={C.paper} strokeWidth={2.2} strokeLinecap="round" />
        </motion.g>
      </g>
      <g className="pa-fixed">
        <OkBadge cx={x + 164} cy={y + 103} r={11} />
        <Sparkle cx={x + 146} cy={y + 22} s={7} fill={C.ok} />
      </g>
    </>
  );
}

/* ---------- ai-risk: file dragged into a public AI cloud → AI inside your own account ---------- */
function AiRisk({ reduced, fixed }) {
  const still = reduced || fixed;
  const D = 4.5;
  return (
    <>
      {/* fixed: your own cloud account around everything */}
      <g className="pa-fixed">
        <rect x={6} y={18} width={308} height={194} rx={16} fill={C.ok} fillOpacity={0.05} stroke={C.ok} strokeWidth={1.5} strokeDasharray="5 5" />
        <rect x={20} y={9} width={30} height={18} rx={6} fill={C.paper} />
        <rect x={28} y={15} width={14} height={10} rx={2} fill={C.ok} />
        <path d="M31 15 v-3 a4 4 0 0 1 8 0 v3" stroke={C.ok} strokeWidth={1.6} />
      </g>
      <Win x={16} y={34} w={150} h={160} mono="AI">
        <rect x={28} y={64} width={92} height={22} rx={11} fill={C.soft} />
        <Bar x={38} y={73} w={60} h={4} o={0.4} />
        <rect x={64} y={96} width={90} height={22} rx={11} fill={C.blue} opacity={0.16} />
        <Bar x={74} y={105} w={56} h={4} fill={C.blue} o={0.7} />
        <rect x={28} y={160} width={126} height={22} rx={8} fill={C.paper} stroke={C.line} />
        <Bar x={38} y={169} w={40} h={4} o={0.3} />
        <Sparkle cx={140} cy={171} s={5} fill={C.blue} />
      </Win>

      <g className="pa-today">
        {/* public cloud */}
        <path d="M222 118 h66 a22 22 0 0 0 0 -44 a30 30 0 0 0 -56 -10 a24 24 0 0 0 -10 54 Z" fill={C.paper} stroke={C.line} strokeWidth={1.5} />
        <circle cx={254} cy={90} r={14} stroke={C.ink} strokeWidth={1.5} opacity={0.6} />
        <path d="M240 90 h28 M254 76 c-8 8 -8 20 0 28 c8 -8 8 -20 0 -28" stroke={C.ink} strokeWidth={1.2} opacity={0.6} />
        <path d="M134 150 C 180 150 200 140 236 124" stroke={C.bad} strokeWidth={1.5} strokeDasharray="3 5" strokeLinecap="round" opacity={0.6} />
        {/* the file + cursor being dragged */}
        <motion.g
          {...loop(still, { x: [0, 0, 98, 98, 0], y: [0, 0, -36, -36, 0], opacity: [0, 1, 1, 0, 0] }, { duration: D, times: [0, 0.1, 0.6, 0.85, 1] })}
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
        <motion.g style={{ originX: 0.5, originY: 0.5 }} {...loop(still, { scale: [1, 1.12, 1] }, { duration: 1.4 })}>
          <path d="M262 136 L284 174 H240 Z" fill={C.bad} stroke={C.bad} strokeWidth={3} strokeLinejoin="round" />
          <path d="M262 149 v12 M262 167 v0.4" stroke={C.paper} strokeWidth={2.6} strokeLinecap="round" />
        </motion.g>
      </g>

      {/* fixed: a private AI model inside the same account */}
      <g className="pa-fixed">
        <path className="pa-draw" pathLength="1" d="M154 120 C186 120 190 96 216 96" stroke={C.ok} strokeWidth={2} strokeLinecap="round" />
        <rect x={216} y={60} width={76} height={70} rx={12} fill={C.paper} stroke={C.ok} strokeWidth={1.5} />
        <rect x={236} y={77} width={36} height={36} rx={7} stroke={C.ok} strokeWidth={1.5} />
        <path d="M244 77 v-5 M254 77 v-5 M264 77 v-5 M244 113 v5 M254 113 v5 M264 113 v5" stroke={C.ok} strokeWidth={1.5} strokeLinecap="round" />
        <Sparkle cx={254} cy={95} s={8} fill={C.ok} />
        <g className="pa-pop">
          <Shield cx={254} cy={168} s={30} reduced draw={false} />
        </g>
      </g>
    </>
  );
}

/* ---------- kintone: a wobbling tower of scripts → one tested package on every app ---------- */
const BLOCKS = [
  { w: 140, dx: 0, c: C.blue },
  { w: 124, dx: 10, c: C.amber },
  { w: 132, dx: -6, c: C.bad, crack: true },
  { w: 116, dx: 14, c: C.pink },
  { w: 104, dx: 4, c: C.blue },
];

function Tower({ reduced, fixed }) {
  const still = reduced || fixed;
  const base = 190;
  const h = 28;
  const shift = fixed ? -34 : 0;
  // Wobble while it is today's tower; settle upright once it is a package.
  const wobble = reduced ? {} : fixed ? { animate: { rotate: 0 }, transition: { duration: 0.5 } } : loop(false, { rotate: [0, 2.2, -1.6, 1, 0] }, { duration: 3.2 });
  return (
    <>
      <path className="pa-today" d="M64 192 H256" stroke={C.line} strokeWidth={1.5} strokeLinecap="round" />
      <g className="pa-move" style={mv(shift, 0)}>
        <ellipse cx={160} cy={194} rx={80} ry={5} fill={C.soft} />
        <motion.g style={{ originX: 0.5, originY: 1 }} {...wobble}>
          {BLOCKS.map((b, i) => {
            const bx = 160 - b.w / 2 + b.dx;
            const by = base - (i + 1) * (h + 3);
            return (
              <g key={i} className="pa-move" style={mv(fixed ? b.w / 2 - 70 - b.dx : 0, 0)}>
                <rect className="pa-tint" x={bx} y={by} width={b.w} height={h} rx={6} fill={C.paper} style={{ stroke: b.crack && !fixed ? C.bad : C.line }} strokeWidth={1.5} />
                <rect x={bx} y={by} width={5} height={h} rx={2.5} fill={b.c} opacity={0.9} />
                <path d={`M${bx + 16} ${by + 9} l-4 5 l4 5 M${bx + 26} ${by + 9} l4 5 l-4 5`} stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                <Bar x={bx + 38} y={by + 9} w={b.w * 0.42} h={4} o={0.4} />
                <Bar x={bx + 38} y={by + 16} w={b.w * 0.26} h={4} o={0.22} />
                {i === 0 && (
                  <text x={bx + b.w - 10} y={by + 18} textAnchor="end" fontSize={9} fontWeight={700} fontFamily="ui-sans-serif, system-ui, sans-serif" fill={C.ink}>kt</text>
                )}
                {b.crack && (
                  <g className="pa-today">
                    <motion.path
                      d={`M${bx + b.w * 0.62} ${by} l-5 9 l7 5 l-6 8 l3 6`}
                      stroke={C.bad}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      {...loop(still, { pathLength: [0, 1, 1] }, { duration: 3.2, times: [0, 0.4, 1] })}
                    />
                  </g>
                )}
              </g>
            );
          })}
        </motion.g>
      </g>
      {/* today: chip falling off */}
      <g className="pa-today">
        <motion.rect
          x={226}
          y={104}
          width={7}
          height={7}
          rx={1.5}
          fill={C.bad}
          {...loop(still, { y: [0, 0, 76], opacity: [0, 1, 0], rotate: [0, 0, 90] }, { duration: 3.2, times: [0, 0.4, 1], ease: 'easeIn' })}
        />
      </g>
      {/* fixed: wrapped as one package, installed on every app */}
      <g className="pa-fixed">
        <rect x={50} y={26} width={152} height={172} rx={14} stroke={C.ok} strokeWidth={2} />
        <g stroke={C.ok} strokeWidth={2} strokeLinecap="round">
          <path className="pa-draw" pathLength="1" d="M202 112 C232 112 232 63 262 63" />
          <path className="pa-draw" pathLength="1" d="M202 112 H262" />
          <path className="pa-draw" pathLength="1" d="M202 112 C232 112 232 161 262 161" />
        </g>
        {[48, 97, 146].map((ty) => (
          <g key={ty}>
            <rect x={262} y={ty} width={34} height={30} rx={7} fill={C.paper} stroke={C.line} strokeWidth={1.5} />
            <rect x={269} y={ty + 9} width={12} height={12} rx={3} fill={C.ok} opacity={0.85} />
            <Bar x={284} y={ty + 13} w={6} h={4} o={0.4} />
          </g>
        ))}
        <OkBadge cx={202} cy={26} r={10} />
      </g>
    </>
  );
}

const ART = { retype: Retype, status: Status, masking: Masking, 'ai-risk': AiRisk, kintone: Tower };

export default function PainArt({ id, className, fixed = false }) {
  const reduced = useReduced();
  const Art = ART[id];
  if (!Art) return null;
  return (
    <Svg vb="0 0 320 220" className={`pa${fixed ? ' is-fixed' : ''}${className ? ` ${className}` : ''}`}>
      <Art reduced={reduced} fixed={fixed} />
    </Svg>
  );
}
