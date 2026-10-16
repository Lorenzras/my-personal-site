'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { stations } from '@/content/site';
import { BELT_START, BELT_END, stationX } from './layout';

const COUNT = 22;
const SPEED = 1.6;
const LENGTH = BELT_END - BELT_START;
const RAW = new THREE.Color('#6b7280');
const palette = stations.map((s) => new THREE.Color(s.color));

// Crates enter grey and pick up each station's colour as they pass it,
// so the line visibly "processes" work.
function colourAt(x, out) {
  let c = RAW;
  stations.forEach((_, i) => {
    if (x > stationX(i)) c = palette[i];
  });
  return out.copy(c);
}

export default function Crates() {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colour = useMemo(() => new THREE.Color(), []);
  const offsets = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => (i / COUNT) * LENGTH),
    [],
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime * SPEED;
    offsets.forEach((o, i) => {
      const x = BELT_START + ((o + t) % LENGTH);
      // small hop when passing under each arm
      let hop = 0;
      stations.forEach((_, s) => {
        const d = x - stationX(s);
        if (d >= 0 && d < 0.6) hop = Math.sin((d / 0.6) * Math.PI) * 0.35;
      });
      dummy.position.set(x, 0.85 + hop, 0);
      dummy.rotation.set(0, hop * 1.5, 0);
      const s = x > BELT_END - 1 ? Math.max(0, BELT_END - x) : 1;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      mesh.current.setColorAt(i, colourAt(x, colour));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]} castShadow>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial roughness={0.35} metalness={0.2} />
    </instancedMesh>
  );
}
