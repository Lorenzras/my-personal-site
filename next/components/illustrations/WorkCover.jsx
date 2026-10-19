'use client';

import { m } from '../motion';
import { Bar, C, Packet, Pointer, Shield, Sparkle, Svg, Win, cubicD, loop, useReduced } from './primitives';

const D = 5;

function Arrow({ x, y, reduced }) {
  const pts = [[x, y], [x + 12, y], [x + 24, y], [x + 36, y]];
  return (
    <g>
      <path d={cubicD(pts)} stroke={C.ok} strokeWidth={1.5} strokeDasharray="3 4" strokeLinecap="round" />
      <path d={`M${x + 32} ${y - 4} l5 4 l-5 4`} stroke={C.ok} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Packet pts={pts} reduced={reduced} dur={1.6} r={3} />
    </g>
  );
}

/* ai-document-masking */
function Masking({ reduced }) {
  const x = 112;
  const y = 22;
  const rows = [70, 52, 84, 60, 74];
  const mask = [false, true, true, false, true];
  return (
    <>
      <rect x={x + 10} y={y + 8} width={176} height={176} rx={12} fill={C.soft} />
      <rect x={x} y={y} width={176} height={176} rx={12} fill={C.paper} stroke={C.line} strokeWidth={1.5} />
      <Bar x={x + 18} y={y + 20} w={70} h={7} o={0.6} />
      <Bar x={x + 18} y={y + 34} w={44} h={4} o={0.25} />
      {rows.map((w, i) => {
        const ry = y + 58 + i * 22;
        const t0 = 0.12 + i * 0.1;
        return (
          <g key={i}>
            <Bar x={x + 18} y={ry} w={26} h={4} o={0.3} />
            <Bar x={x + 54} y={ry} w={w} h={4} o={0.45} />
            {mask[i] && (
              <m.rect
                x={x + 50}
                y={ry - 5}
                width={w + 8}
                height={14}
                rx={3}
                fill={C.ink}
                {...loop(reduced, { width: [0, 0, w + 8, w + 8, 0] }, { duration: D, times: [0, t0, t0 + 0.1, 0.9, 1], ease: 'easeOut' })}
              />
            )}
          </g>
        );
      })}
      <g transform={`translate(${x + 150} ${y + 150})`}>
        <circle r={20} fill={C.paper} stroke={C.ok} strokeWidth={1.5} />
        <Shield cx={0} cy={0} s={22} reduced={reduced} />
      </g>
      <m.g style={{ originX: 0.5, originY: 0.5 }} {...loop(reduced, { scale: [0.7, 1.1, 0.7], opacity: [0.5, 1, 0.5] }, { duration: 2.6 })}>
        <Sparkle cx={x - 18} cy={y + 50} s={9} fill={C.amber} />
      </m.g>
      <Sparkle cx={x - 4} cy={y + 74} s={5} fill={C.ok} />
    </>
  );
}

/* kintone-backlog-sync */
function Board({ x, y, mono, highlight }) {
  return (
    <Win x={x} y={y} w={140} h={150} mono={mono}>
      {[0, 1].map((c) => (
        <g key={c}>
          <rect x={x + 10 + c * 62} y={y + 28} width={58} height={112} rx={6} fill={C.soft} />
          <Bar x={x + 16 + c * 62} y={y + 34} w={22} h={4} o={0.5} />
          {[0, 1].map((j) => (
            <g key={j}>
              <rect x={x + 14 + c * 62} y={y + 46 + j * 30} width={50} height={24} rx={5} fill={C.paper} stroke={C.line} />
              <rect x={x + 14 + c * 62} y={y + 46 + j * 30} width={3} height={24} rx={1.5} fill={[C.amber, C.blue, C.pink, highlight][c * 2 + j]} />
              <Bar x={x + 22 + c * 62} y={y + 53 + j * 30} w={30} h={4} o={0.45} />
              <Bar x={x + 22 + c * 62} y={y + 61 + j * 30} w={18} h={4} o={0.22} />
            </g>
          ))}
        </g>
      ))}
    </Win>
  );
}

function Sync({ reduced }) {
  return (
    <>
      <Board x={30} y={36} mono="kt" highlight={C.blue} />
      <Board x={230} y={36} mono="BL" highlight={C.amber} />
      <g transform="translate(200 111)">
        <circle r={20} fill={C.paper} stroke={C.ok} strokeWidth={1.5} />
        <m.g {...loop(reduced, { rotate: [0, 180] }, { duration: 2.5, ease: 'easeInOut', repeatDelay: 0 })}>
          <path d="M-9 -2 a9 9 0 0 1 16 -5 M9 2 a9 9 0 0 1 -16 5" stroke={C.ok} strokeWidth={2} strokeLinecap="round" />
          <path d="M8 -12 v6 h-6 M-8 12 v-6 h6" stroke={C.ok} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </m.g>
      </g>
      {/* card travelling between the two boards */}
      <m.g {...loop(reduced, { x: [0, 0, 200, 200], opacity: [0, 1, 1, 0] }, { duration: D, times: [0, 0.15, 0.6, 1] })}>
        <rect x={44} y={142} width={50} height={24} rx={5} fill={C.paper} stroke={C.ok} strokeWidth={1.5} />
        <rect x={44} y={142} width={3} height={24} rx={1.5} fill={C.ok} />
        <Bar x={52} y={149} w={30} h={4} fill={C.ok} o={0.7} />
        <Bar x={52} y={157} w={18} h={4} o={0.25} />
      </m.g>
    </>
  );
}

/* kintone-chat-alerts */
function Alerts({ reduced }) {
  return (
    <>
      <Win x={26} y={34} w={150} h={152} mono="kt">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Bar x={40} y={66 + i * 26} w={30} h={4} o={0.3} />
            <rect x={78} y={60 + i * 26} width={84} height={16} rx={4} fill={C.soft} stroke={i === 2 ? C.ok : 'none'} strokeWidth={1.5} />
            <Bar x={84} y={66 + i * 26} w={[50, 40, 0, 56][i]} h={4} o={0.45} />
          </g>
        ))}
        {/* the changed value */}
        <m.rect x={84} y={118} width={44} height={4} rx={2} fill={C.ok} {...loop(reduced, { width: [0, 0, 44, 44] }, { duration: D, times: [0, 0.08, 0.25, 1] })} />
        <m.g {...loop(reduced, { opacity: [0, 0, 1, 1, 0] }, { duration: D, times: [0, 0.2, 0.28, 0.9, 1] })}>
          <circle cx={162} cy={112} r={6} fill={C.ok} />
        </m.g>
      </Win>
      <Arrow x={182} y={110} reduced={reduced} />
      <Win x={224} y={34} w={150} h={152}>
        <circle cx={240} cy={68} r={7} fill={C.blue} opacity={0.8} />
        <rect x={252} y={60} width={80} height={16} rx={8} fill={C.soft} />
        <Bar x={260} y={66} w={50} h={4} o={0.35} />
        <m.g style={{ originX: 0, originY: 0 }} {...loop(reduced, { scale: [0.5, 0.5, 1, 1, 0.5], opacity: [0, 0, 1, 1, 0] }, { duration: D, times: [0, 0.4, 0.5, 0.9, 1] })}>
          <circle cx={240} cy={102} r={7} fill={C.ok} />
          <path d="M236.5 102 l2.5 2.5 l4.5 -5" stroke={C.paper} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={252} y={92} width={110} height={44} rx={10} fill={C.paper} stroke={C.ok} strokeWidth={1.5} />
          <rect x={252} y={92} width={110} height={44} rx={10} fill={C.ok} opacity={0.1} />
          <Bar x={262} y={102} w={62} h={4} fill={C.ok} o={0.8} />
          <Bar x={262} y={111} w={84} h={4} o={0.3} />
          <Bar x={262} y={120} w={48} h={4} o={0.3} />
        </m.g>
        <g transform="translate(352 54)">
          <m.g style={{ originX: 0.5, originY: 0 }} {...loop(reduced, { rotate: [0, 0, -14, 12, 0, 0] }, { duration: D, times: [0, 0.45, 0.5, 0.55, 0.6, 1] })}>
            <path d="M-7 4 C-7 -4 -4 -7 0 -7 C4 -7 7 -4 7 4 L9 7 H-9 Z" fill={C.paper} stroke={C.ok} strokeWidth={1.5} strokeLinejoin="round" />
          </m.g>
        </g>
      </Win>
    </>
  );
}

/* kintone-daily-report */
function Report({ reduced }) {
  const bars = [34, 52, 40, 66, 58];
  return (
    <>
      <Win x={26} y={34} w={150} h={152} mono="kt">
        {[0, 1, 2, 3].map((i) => {
          const t0 = 0.05 + i * 0.1;
          const w = [60, 44, 70, 36][i];
          return (
            <g key={i}>
              <Bar x={40} y={64 + i * 28} w={34} h={4} o={0.3} />
              <rect x={40} y={72 + i * 28} width={122} height={12} rx={4} fill={C.paper} stroke={C.line} />
              <m.rect x={45} y={76 + i * 28} width={w} height={4} rx={2} fill={C.ink} opacity={0.5} {...loop(reduced, { width: [0, 0, w, w] }, { duration: D, times: [0, t0, t0 + 0.08, 1] })} />
            </g>
          );
        })}
      </Win>
      <Arrow x={182} y={110} reduced={reduced} />
      <Win x={224} y={34} w={150} h={152}>
        <Bar x={238} y={62} w={60} h={6} o={0.55} />
        <path d="M238 170 H360" stroke={C.line} strokeWidth={1.5} />
        {[0, 1, 2].map((g) => (
          <path key={g} d={`M238 ${150 - g * 24} H360`} stroke={C.soft} strokeWidth={1.5} />
        ))}
        {bars.map((h, i) => (
          <m.rect
            key={i}
            x={246 + i * 22}
            y={170 - h}
            width={14}
            height={h}
            rx={3}
            fill={i === 3 ? C.ok : C.blue}
            opacity={i === 3 ? 1 : 0.55}
            style={{ originY: 1 }}
            {...loop(reduced, { scaleY: [0, 0, 1, 1, 0] }, { duration: D, times: [0, 0.45 + i * 0.04, 0.6 + i * 0.04, 0.92, 1] })}
          />
        ))}
        <Sparkle cx={352} cy={64} s={6} fill={C.amber} />
      </Win>
    </>
  );
}

/* kuroco-kintone-forms */
function Forms({ reduced }) {
  return (
    <>
      <Win x={22} y={30} w={156} h={160}>
        <rect x={34} y={56} width={132} height={22} rx={5} fill={C.soft} />
        <Bar x={42} y={64.5} w={50} h={5} o={0.5} />
        {[0, 1].map((i) => (
          <g key={i}>
            <Bar x={34} y={90 + i * 28} w={30} h={4} o={0.3} />
            <rect x={34} y={98 + i * 28} width={132} height={14} rx={4} fill={C.paper} stroke={C.line} />
            <Bar x={40} y={103 + i * 28} w={[64, 82][i]} h={4} o={0.45} />
          </g>
        ))}
        <m.rect
          x={34}
          y={158}
          width={60}
          height={20}
          rx={6}
          fill={C.ok}
          style={{ originX: 0.5, originY: 0.5 }}
          {...loop(reduced, { scale: [1, 1, 0.92, 1, 1] }, { duration: D, times: [0, 0.2, 0.25, 0.3, 1] })}
        />
        <Bar x={48} y={166} w={32} h={4} fill={C.paper} />
        <m.g {...loop(reduced, { x: [40, 0, 0, 40], y: [-20, 0, 0, -20], opacity: [0, 1, 1, 0] }, { duration: D, times: [0, 0.18, 0.3, 0.4] })}>
          <g transform="translate(80 170)"><Pointer /></g>
        </m.g>
      </Win>
      <Arrow x={184} y={110} reduced={reduced} />
      <Win x={226} y={30} w={156} h={160} mono="kt">
        <rect x={236} y={56} width={136} height={16} rx={4} fill={C.soft} />
        {[0, 1, 2].map((c) => (
          <Bar key={c} x={244 + c * 44} y={62} w={24} h={4} o={0.55} />
        ))}
        {[0, 1, 2].map((r) => (
          <g key={r}>
            {[0, 1, 2].map((c) => (
              <Bar key={c} x={244 + c * 44} y={86 + r * 20} w={[30, 22, 26][(r + c) % 3]} h={4} o={0.3} />
            ))}
            <path d={`M236 ${96 + r * 20} H372`} stroke={C.soft} strokeWidth={1.5} />
          </g>
        ))}
        <m.g {...loop(reduced, { opacity: [0, 0, 1, 1, 0], x: [0, 0, 0, 0, 0], y: [-10, -10, 0, 0, 0] }, { duration: D, times: [0, 0.55, 0.65, 0.92, 1] })}>
          <rect x={236} y={144} width={136} height={18} rx={4} fill={C.ok} opacity={0.14} />
          <rect x={236} y={144} width={136} height={18} rx={4} stroke={C.ok} strokeWidth={1.5} />
          {[0, 1, 2].map((c) => (
            <Bar key={c} x={244 + c * 44} y={151} w={[30, 22, 26][c]} h={4} fill={C.ok} o={0.85} />
          ))}
        </m.g>
      </Win>
    </>
  );
}

/* fallback: generic three-step flow */
function Generic({ reduced }) {
  const nodes = [70, 200, 330];
  return (
    <>
      {[0, 1].map((i) => {
        const pts = [[nodes[i] + 34, 110], [nodes[i] + 60, 80], [nodes[i + 1] - 60, 140], [nodes[i + 1] - 34, 110]];
        return (
          <g key={i}>
            <path d={cubicD(pts)} stroke={C.ok} strokeWidth={1.5} strokeDasharray="3 4" />
            <Packet pts={pts} reduced={reduced} delay={i * 1.1} />
          </g>
        );
      })}
      {nodes.map((cx, i) => (
        <g key={i}>
          <rect x={cx - 34} y={76} width={68} height={68} rx={14} fill={C.paper} stroke={i === 2 ? C.ok : C.line} strokeWidth={1.5} />
          {i < 2 ? (
            <>
              <Bar x={cx - 20} y={98} w={40} h={5} o={0.5} />
              <Bar x={cx - 20} y={108} w={28} h={5} o={0.3} />
              <Bar x={cx - 20} y={118} w={34} h={5} o={0.3} />
            </>
          ) : (
            <Shield cx={cx} cy={110} s={28} reduced={reduced} />
          )}
        </g>
      ))}
    </>
  );
}

const COVERS = {
  'ai-document-masking': Masking,
  'kintone-backlog-sync': Sync,
  'kintone-chat-alerts': Alerts,
  'kintone-daily-report': Report,
  'kuroco-kintone-forms': Forms,
};

export default function WorkCover({ slug, className }) {
  const reduced = useReduced();
  const Art = COVERS[slug] || Generic;
  return (
    <Svg vb="0 0 400 220" className={className}>
      <rect x={0} y={0} width={400} height={220} rx={14} fill={C.soft} />
      <Art reduced={reduced} />
    </Svg>
  );
}
