'use client';

import { useEffect, useState } from 'react';
import { factory } from './scene/store';

const SPEEDS = [
  { label: '×1', value: 1 },
  { label: '×2', value: 2 },
  { label: '全速', value: 4 },
];
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Belt speed toggle. The Konami code jumps straight to full speed.
export default function SpeedControl() {
  const [speed, setSpeed] = useState(1);
  const [banner, setBanner] = useState(false);

  useEffect(() => { factory.speed = speed; }, [speed]);

  useEffect(() => {
    let pos = 0;
    const onKey = (e) => {
      pos = e.key === KONAMI[pos] ? pos + 1 : (e.key === KONAMI[0] ? 1 : 0);
      if (pos === KONAMI.length) {
        pos = 0;
        setSpeed(4);
        setBanner(true);
        setTimeout(() => setBanner(false), 2500);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="speed" role="group" aria-label="Line speed">
        <span>LINE</span>
        {SPEEDS.map((s) => (
          <button key={s.value} type="button" className={speed === s.value ? 'on' : ''} onClick={() => setSpeed(s.value)}>
            {s.label}
          </button>
        ))}
      </div>
      {banner && <div className="banner">全速前進！</div>}
    </>
  );
}
