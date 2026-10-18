'use client';

import { m } from '../motion';
import { Bar, C, Packet, Pointer, Shield, Sparkle, Svg, Win, cubicD, loop, useReduced } from './primitives';

// Connections: window anchor -> hub (or hub -> window), as cubic control points.
const LINKS = [
  { pts: [[220, 104], [252, 104], [262, 140], [262, 172]], dur: 2.2, delay: 0 },
  { pts: [[298, 172], [298, 134], [312, 116], [342, 116]], dur: 2.2, delay: 0.9 },
  { pts: [[206, 336], [246, 336], [262, 306], [262, 268]], dur: 2.4, delay: 0.5 },
  { pts: [[298, 268], [298, 306], [312, 334], [336, 334]], dur: 2.4, delay: 1.4 },
];

function Bob({ reduced, dy = 4, dur = 6, delay = 0, children }) {
  return (
    <m.g {...loop(reduced, { y: [0, -dy, 0] }, { duration: dur, delay })}>{children}</m.g>
  );
}

function TableApp({ reduced }) {
  const x = 24;
  const y = 30;
  const cols = [x + 14, x + 70, x + 132];
  return (
    <Win x={x} y={y} w={196} h={136} mono="DB">
      <rect x={x + 8} y={y + 26} width={180} height={14} rx={4} fill={C.soft} />
      {cols.map((cx, i) => (
        <Bar key={i} x={cx} y={y + 30.5} w={[30, 36, 26][i]} h={5} o={0.7} />
      ))}
      {[0, 1, 2, 3].map((row) => {
        const ry = y + 50 + row * 20;
        const hot = row === 1;
        return (
          <g key={row}>
            {hot && (
              <m.rect
                x={x + 8}
                y={ry - 5}
                width={180}
                height={17}
                rx={4}
                fill={C.ok}
                opacity={0.12}
                {...loop(reduced, { opacity: [0, 0.16, 0.16, 0] }, { duration: 4.4, times: [0, 0.2, 0.8, 1] })}
              />
            )}
            <circle cx={cols[0] + 4} cy={ry + 3} r={4} fill={[C.blue, C.ok, C.amber, C.pink][row]} opacity={0.85} />
            <Bar x={cols[0] + 13} y={ry + 0.5} w={[26, 22, 30, 18][row]} o={0.45} />
            <Bar x={cols[1]} y={ry + 0.5} w={[44, 36, 48, 30][row]} o={0.3} />
            <rect x={cols[2]} y={ry - 1} width={34} height={8} rx={4} fill={hot ? C.ok : C.soft} opacity={hot ? 0.9 : 1} />
          </g>
        );
      })}
    </Win>
  );
}

function BoardApp({ reduced }) {
  const x = 342;
  const y = 46;
  const colX = [x + 10, x + 72, x + 134];
  const strips = [
    [C.amber, C.blue],
    [C.blue],
    [C.ok],
  ];
  return (
    <Win x={x} y={y} w={196} h={142} mono="BL">
      {colX.map((cx, i) => (
        <g key={i}>
          <rect x={cx} y={y + 26} width={52} height={108} rx={6} fill={C.soft} />
          <Bar x={cx + 6} y={y + 32} w={22} h={4} o={0.55} />
          {strips[i].map((s, j) => (
            <g key={j}>
              <rect x={cx + 4} y={y + 42 + j * 32} width={44} height={26} rx={5} fill={C.paper} stroke={C.line} />
              <rect x={cx + 4} y={y + 42 + j * 32} width={3} height={26} rx={1.5} fill={s} />
              <Bar x={cx + 11} y={y + 49 + j * 32} w={28} h={4} o={0.5} />
              <Bar x={cx + 11} y={y + 57 + j * 32} w={18} h={4} o={0.25} />
            </g>
          ))}
        </g>
      ))}
      {/* card travelling from "doing" to "done" */}
      <m.g {...loop(reduced, { x: [0, 0, 62, 62, 0], opacity: [1, 1, 1, 1, 1] }, { duration: 5, times: [0, 0.3, 0.55, 0.92, 1] })}>
        <rect x={colX[1] + 4} y={y + 74} width={44} height={26} rx={5} fill={C.paper} stroke={C.ok} strokeWidth={1.5} />
        <rect x={colX[1] + 4} y={y + 74} width={3} height={26} rx={1.5} fill={C.ok} />
        <Bar x={colX[1] + 11} y={y + 81} w={28} h={4} o={0.5} />
        <path d={`M${colX[1] + 12} ${y + 91} l3 3 l6 -6`} stroke={C.ok} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </m.g>
    </Win>
  );
}

function ChatApp({ reduced }) {
  const x = 26;
  const y = 274;
  return (
    <Win x={x} y={y} w={180} h={134}>
      <circle cx={x + 18} cy={y + 36} r={7} fill={C.blue} opacity={0.85} />
      <rect x={x + 30} y={y + 28} width={84} height={18} rx={9} fill={C.soft} />
      <Bar x={x + 38} y={y + 34.5} w={56} o={0.4} />
      <circle cx={x + 18} cy={y + 64} r={7} fill={C.amber} opacity={0.85} />
      <rect x={x + 30} y={y + 56} width={104} height={18} rx={9} fill={C.soft} />
      <Bar x={x + 38} y={y + 62.5} w={72} o={0.4} />
      {/* automated message pops in */}
      <m.g
        style={{ originX: 1, originY: 0.5 }}
        {...loop(reduced, { scale: [0.6, 1, 1, 1, 0.6], opacity: [0, 1, 1, 1, 0] }, { duration: 4.4, times: [0, 0.12, 0.5, 0.88, 1], delay: 1 })}
      >
        <rect x={x + 62} y={y + 88} width={104} height={30} rx={10} fill={C.ok} opacity={0.14} />
        <rect x={x + 62} y={y + 88} width={104} height={30} rx={10} stroke={C.ok} strokeWidth={1.5} />
        <Sparkle cx={x + 76} cy={y + 103} s={5} />
        <Bar x={x + 86} y={y + 96} w={64} h={4} fill={C.ok} o={0.8} />
        <Bar x={x + 86} y={y + 106} w={40} h={4} fill={C.ok} o={0.45} />
      </m.g>
    </Win>
  );
}

function MailApp({ reduced }) {
  const x = 336;
  const y = 266;
  return (
    <Win x={x} y={y} w={202} h={144}>
      <rect x={x + 12} y={y + 28} width={30} height={22} rx={4} fill={C.soft} stroke={C.line} />
      <path d={`M${x + 13} ${y + 30} L${x + 27} ${y + 41} L${x + 41} ${y + 30}`} stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round" opacity={0.7} />
      <Bar x={x + 52} y={y + 31} w={80} h={5} o={0.55} />
      <Bar x={x + 52} y={y + 41} w={54} h={5} o={0.3} />
      {[0, 1, 2].map((i) => (
        <Bar key={i} x={x + 12} y={y + 62 + i * 11} w={[172, 158, 120][i]} h={4} o={0.22} />
      ))}
      {/* attachment chip */}
      <g>
        <rect x={x + 12} y={y + 104} width={86} height={26} rx={7} fill={C.paper} stroke={C.line} />
        <rect x={x + 18} y={y + 109} width={14} height={16} rx={2.5} fill={C.blue} opacity={0.85} />
        <Bar x={x + 38} y={y + 111} w={48} h={4} o={0.45} />
        <Bar x={x + 38} y={y + 119} w={28} h={4} o={0.25} />
      </g>
      <m.g {...loop(reduced, { opacity: [0, 1, 1, 0] }, { duration: 4, times: [0, 0.2, 0.8, 1], delay: 2 })}>
        <circle cx={x + 172} cy={y + 117} r={11} fill={C.ok} />
        <path d={`M${x + 167} ${y + 117} l3.5 3.5 l6.5 -7`} stroke={C.paper} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </m.g>
    </Win>
  );
}

function Hub({ reduced }) {
  return (
    <g>
      <m.circle
        cx={280}
        cy={220}
        r={58}
        stroke={C.ok}
        strokeWidth={1.5}
        strokeDasharray="3 7"
        opacity={0.5}
        style={{ originX: 0.5, originY: 0.5 }}
        {...loop(reduced, { rotate: 360 }, { duration: 30, ease: 'linear' })}
      />
      <m.circle
        cx={280}
        cy={220}
        r={46}
        fill={C.ok}
        opacity={0.08}
        style={{ originX: 0.5, originY: 0.5 }}
        {...loop(reduced, { scale: [1, 1.18, 1], opacity: [0.1, 0.02, 0.1] }, { duration: 3.2 })}
      />
      <rect x={240} y={176} width={80} height={88} rx={16} fill={C.paper} stroke={C.ok} strokeWidth={1.5} />
      <Shield cx={280} cy={210} s={30} reduced={reduced} />
      {[0, 1, 2].map((i) => (
        <m.rect
          key={i}
          x={254 + i * 18}
          y={244}
          width={14}
          height={5}
          rx={2.5}
          fill={C.ok}
          opacity={0.9}
          {...loop(reduced, { opacity: [0.2, 0.9, 0.2] }, { duration: 1.8, delay: i * 0.3 })}
        />
      ))}
    </g>
  );
}

export default function HeroVisual({ className }) {
  const reduced = useReduced();
  return (
    <Svg vb="0 0 560 440" className={className}>
      {/* soft backdrop */}
      <circle cx={280} cy={220} r={190} fill={C.soft} />
      <circle cx={280} cy={220} r={120} fill={C.soft} />

      {LINKS.map((l, i) => (
        <g key={i}>
          <path d={cubicD(l.pts)} stroke={C.ok} strokeWidth={1.5} strokeDasharray="4 5" opacity={0.55} strokeLinecap="round" />
          <Packet pts={l.pts} reduced={reduced} dur={l.dur} delay={l.delay} at={0.55} />
          <Packet pts={l.pts} reduced={reduced} dur={l.dur} delay={l.delay + l.dur / 2} r={2.5} at={0.2} />
        </g>
      ))}

      <Hub reduced={reduced} />
      <Bob reduced={reduced} delay={0}><TableApp reduced={reduced} /></Bob>
      <Bob reduced={reduced} delay={1.5} dy={5}><BoardApp reduced={reduced} /></Bob>
      <Bob reduced={reduced} delay={0.8} dy={3}><ChatApp reduced={reduced} /></Bob>
      <Bob reduced={reduced} delay={2.2} dy={5}><MailApp reduced={reduced} /></Bob>

      {/* a cursor nudging the board */}
      <m.g
        {...loop(reduced, { x: [0, -18, -18, 0], y: [0, -10, -10, 0] }, { duration: 5, times: [0, 0.3, 0.6, 1] })}
      >
        <g transform="translate(470 196)"><Pointer /></g>
      </m.g>
      <Sparkle cx={236} cy={60} s={6} fill={C.amber} />
      <Sparkle cx={320} cy={404} s={5} fill={C.pink} />
      <path d="M524 30 v10 m-5 -5 h10" stroke={C.blue} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
    </Svg>
  );
}
