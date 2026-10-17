'use client';

// Shared building blocks for the site's illustrations.
// Every colour comes from a CSS variable so light/dark themes just work.
import { motion, useReducedMotion } from 'motion/react';

export const C = {
  paper: 'var(--ill-paper)',
  line: 'var(--ill-line)',
  ink: 'var(--ill-ink)',
  soft: 'var(--ill-soft)',
  bad: 'var(--accent)',
  ok: 'var(--accent-2)',
  amber: 'var(--ill-amber)',
  blue: 'var(--ill-blue)',
  pink: 'var(--ill-pink)',
  bg: 'var(--bg)',
};

export const r2 = (n) => Math.round(n * 100) / 100;

// Props for a looping animation, or nothing when motion is reduced
// (the element's static attributes then are the final state).
export function loop(reduced, animate, transition = {}) {
  if (reduced) return {};
  return {
    animate,
    transition: { duration: 3, ease: 'easeInOut', repeat: Infinity, ...transition },
  };
}

export function useReduced() {
  return !!useReducedMotion();
}

// Sample a cubic bezier into rounded keyframes (deterministic, SSR-safe).
export function cubicPts([x0, y0], [x1, y1], [x2, y2], [x3, y3], n = 16) {
  const xs = [];
  const ys = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    xs.push(r2(u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3));
    ys.push(r2(u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3));
  }
  return { xs, ys };
}

export const cubicD = (p) => `M${p[0]} C${p[1]} ${p[2]} ${p[3]}`;

// A small dot travelling along a cubic path.
export function Packet({ pts, reduced, dur = 2.4, delay = 0, r = 3.5, fill = C.ok, at = 0.5 }) {
  const { xs, ys } = cubicPts(...pts);
  const mid = Math.round(at * (xs.length - 1));
  if (reduced) return <circle cx={xs[mid]} cy={ys[mid]} r={r} fill={fill} />;
  const op = xs.map((_, i) => (i === 0 || i === xs.length - 1 ? 0 : 1));
  return (
    <motion.circle
      cx={xs[0]}
      cy={ys[0]}
      r={r}
      fill={fill}
      initial={{ opacity: 0 }}
      animate={{ cx: xs, cy: ys, opacity: op }}
      transition={{ duration: dur, delay, ease: 'linear', repeat: Infinity, repeatDelay: 0.4 }}
    />
  );
}

// Path that draws itself in on a loop.
export function Draw({ d, reduced, stroke = C.ok, w = 1.5, dur = 2.4, delay = 0, hold = 1.2, ...rest }) {
  if (reduced) return <path d={d} fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" {...rest} />;
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{ duration: dur, delay, times: [0, 0.35, 0.85, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: hold }}
      {...rest}
    />
  );
}

// Rounded text-like bar.
export function Bar({ x, y, w, h = 5, fill = C.ink, o = 1, ...rest }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} {...rest} />;
}

// App window: rounded card with a header strip and traffic dots.
export function Win({ x, y, w, h, children, head = 18, accent, stroke = C.line, mono }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={C.paper} stroke={stroke} strokeWidth={1.5} />
      <path d={`M${x + 0.75} ${y + head} H${x + w - 0.75}`} stroke={C.line} strokeWidth={1.5} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 11 + i * 8} cy={y + head / 2} r={2.2} fill={i === 0 && accent ? accent : C.line} />
      ))}
      {mono && (
        <text x={x + w - 10} y={y + head / 2 + 3.2} textAnchor="end" fontSize={9} fontWeight={700} fontFamily="ui-sans-serif, system-ui, sans-serif" fill={C.ink}>
          {mono}
        </text>
      )}
      {children}
    </g>
  );
}

// Mouse pointer glyph, tip at (0,0).
export function Pointer({ fill = C.ink }) {
  return (
    <path
      d="M0 0 L0 13 L3.4 9.9 L6 15.4 L8.2 14.4 L5.7 9 L10.2 9 Z"
      fill={fill}
      stroke={C.paper}
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
  );
}

// Shield with a check, centred on (cx, cy), roughly s wide.
export function Shield({ cx, cy, s = 24, fill = C.ok, reduced, draw = true }) {
  const k = s / 24;
  const d = `M${r2(cx)} ${r2(cy - 12 * k)} L${r2(cx + 10 * k)} ${r2(cy - 8 * k)} V${r2(cy)} C${r2(cx + 10 * k)} ${r2(cy + 7 * k)} ${r2(cx + 5 * k)} ${r2(cy + 11 * k)} ${r2(cx)} ${r2(cy + 13 * k)} C${r2(cx - 5 * k)} ${r2(cy + 11 * k)} ${r2(cx - 10 * k)} ${r2(cy + 7 * k)} ${r2(cx - 10 * k)} ${r2(cy)} V${r2(cy - 8 * k)} Z`;
  const check = `M${r2(cx - 4.5 * k)} ${r2(cy + 0.5 * k)} L${r2(cx - 1 * k)} ${r2(cy + 4 * k)} L${r2(cx + 5 * k)} ${r2(cy - 3 * k)}`;
  return (
    <g>
      <path d={d} fill={fill} />
      {draw ? (
        <Draw d={check} reduced={reduced} stroke={C.paper} w={2.2 * Math.max(k, 0.7)} dur={2.6} hold={0.6} />
      ) : (
        <path d={check} fill="none" stroke={C.paper} strokeWidth={2.2 * Math.max(k, 0.7)} strokeLinecap="round" strokeLinejoin="round" />
      )}
    </g>
  );
}

// Four-point sparkle centred on (cx, cy).
export function Sparkle({ cx, cy, s = 8, fill = C.ok }) {
  const d = `M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s} Z`;
  return <path d={d} fill={fill} />;
}

// Root <svg> with the common attributes.
export function Svg({ vb, children, className }) {
  return (
    <svg viewBox={vb} width="100%" aria-hidden="true" focusable="false" className={className} fill="none" style={{ display: 'block', overflow: 'visible' }}>
      {children}
    </svg>
  );
}
