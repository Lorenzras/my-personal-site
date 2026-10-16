import * as THREE from 'three';

// All textures are drawn at runtime on canvases, so nothing is downloaded.
const cache = new Map();
const FONT = 'system-ui, -apple-system, "Segoe UI", "Hiragino Sans", "Noto Sans JP", "Yu Gothic", sans-serif';

function make(key, w, h, draw, opts = {}) {
  if (cache.has(key)) return cache.get(key);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = opts.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (opts.repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  }
  cache.set(key, tex);
  return tex;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

// Station sign: "01" + EN label + JP label.
export function signTexture(num, label, jp, color) {
  return make(`sign-${label}`, 1024, 320, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    roundRect(ctx, 8, 8, w - 16, h - 16, 28);
    ctx.stroke();
    ctx.fillStyle = 'rgba(8,10,16,0.55)';
    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = `700 120px ${FONT}`;
    ctx.textBaseline = 'middle';
    ctx.fillText(num, 48, h / 2 + 4);
    ctx.fillStyle = '#ffffff';
    ctx.font = `700 104px ${FONT}`;
    ctx.fillText(label.toUpperCase(), 250, h / 2 - 34);
    ctx.fillStyle = color;
    ctx.font = `600 64px ${FONT}`;
    ctx.fillText(jp, 254, h / 2 + 70);
  });
}

export function textTexture(key, lines, { w = 512, h = 128, color = '#fff', size = 64, bg } = {}) {
  return make(`text-${key}`, w, h, (ctx) => {
    if (bg) {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    lines.forEach((line, i) => {
      ctx.font = `700 ${size}px ${FONT}`;
      ctx.fillText(line, w / 2, (h / (lines.length + 1)) * (i + 1));
    });
  });
}

// Messy raw input: a spreadsheet printout with a red hanko circle.
export function paperTexture() {
  return make('paper', 256, 192, (ctx, w, h) => {
    ctx.fillStyle = '#f1ede4';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#7fb48a';
    ctx.lineWidth = 2;
    for (let x = 0; x < w; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 18) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    ctx.fillStyle = '#4b5563';
    for (let i = 0; i < 20; i += 1) ctx.fillRect(4 + (i % 7) * 32 + 4, 22 + Math.floor(i / 7) * 36 + 4, 18 + (i * 7) % 8, 6);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(w - 46, h - 44, 26, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(0, h * 0.55, w, 3);
  });
}

// Clean, stamped form after the RPA station.
export function formTexture() {
  return make('form', 256, 192, (ctx, w, h) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, 0, w, 26);
    ctx.fillStyle = '#cbd5e1';
    for (let i = 0; i < 5; i += 1) {
      ctx.fillRect(16, 42 + i * 26, 60, 12);
      ctx.fillRect(88, 42 + i * 26, 150 - (i % 2) * 40, 12);
    }
    ctx.strokeStyle = '#dc2626';
    ctx.fillStyle = '#dc2626';
    ctx.lineWidth = 7;
    ctx.beginPath(); ctx.arc(w - 50, h - 48, 34, 0, Math.PI * 2); ctx.stroke();
    ctx.font = `800 40px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('済', w - 50, h - 46);
  });
}

// A mini browser window, the output of the Frontend station.
export function browserTexture(accent = '#38bdf8', key = 'browser') {
  return make(key, 320, 220, (ctx, w, h) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, w, 28);
    ['#f87171', '#fbbf24', '#34d399'].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath(); ctx.arc(16 + i * 16, 14, 5, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = '#334155';
    roundRect(ctx, 70, 8, 200, 12, 6); ctx.fill();
    ctx.fillStyle = accent;
    ctx.fillRect(20, 46, 140, 16);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(20, 72, 220, 8);
    ctx.fillRect(20, 86, 180, 8);
    ['#38bdf8', '#a78bfa', '#f472b6'].forEach((c, i) => {
      ctx.fillStyle = '#1e293b';
      roundRect(ctx, 20 + i * 96, 110, 84, 70, 8); ctx.fill();
      ctx.fillStyle = c;
      ctx.fillRect(30 + i * 96, 120, 40, 8);
    });
    ctx.fillStyle = accent;
    roundRect(ctx, 20, 190, 90, 20, 10); ctx.fill();
  });
}

// Shipping parcel side with tape and label.
export function parcelTexture() {
  return make('parcel', 256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#b08a5a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let i = 0; i < 40; i += 1) ctx.fillRect(0, i * 7, w, 1);
    ctx.fillStyle = '#34d399';
    ctx.fillRect(w / 2 - 20, 0, 40, h);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(28, 150, 110, 72);
    ctx.fillStyle = '#0f172a';
    for (let i = 0; i < 14; i += 1) ctx.fillRect(36 + i * 7, 160, i % 3 ? 3 : 5, 34);
    ctx.font = `700 14px ${FONT}`;
    ctx.fillText('SHIPPED ✓', 38, 212);
  });
}

// Scrolling belt tread.
export function beltTexture() {
  return make('belt', 128, 64, (ctx, w, h) => {
    ctx.fillStyle = '#121418';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1f232b';
    for (let x = 0; x < w; x += 16) ctx.fillRect(x, 0, 6, h);
  }, { repeat: true });
}

// Concrete slabs with painted walkway lines.
export function floorTexture() {
  return make('floor', 1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#4a4f5a';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i += 1) {
      const v = 60 + Math.random() * 30;
      ctx.fillStyle = `rgba(${v},${v + 3},${v + 10},0.35)`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    ctx.strokeStyle = '#2b2f37';
    ctx.lineWidth = 4;
    for (let x = 0; x <= w; x += 256) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y <= h; y += 256) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  }, { repeat: true });
}

export function hazardTexture() {
  return make('hazard', 128, 32, (ctx, w, h) => {
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#111';
    for (let x = -h; x < w + h; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, h); ctx.lineTo(x + 12, h); ctx.lineTo(x + 12 + h, 0); ctx.lineTo(x + h, 0);
      ctx.fill();
    }
  }, { repeat: true });
}

// Philippine 8-ray sun emblem for the intake gate.
export function sunTexture() {
  return make('sun', 256, 256, (ctx, w, h) => {
    ctx.translate(w / 2, h / 2);
    ctx.fillStyle = '#fcd116';
    for (let i = 0; i < 8; i += 1) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(-10, 40); ctx.lineTo(0, 118); ctx.lineTo(10, 40);
      ctx.fill();
    }
    ctx.beginPath(); ctx.arc(0, 0, 44, 0, Math.PI * 2); ctx.fill();
  });
}
