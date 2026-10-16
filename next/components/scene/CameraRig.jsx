'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { cameraKeys } from './layout';

const ease = (t) => t * t * (3 - 2 * t);

// Moves the camera along the line as the page scrolls.
export default function CameraRig() {
  const scroll = useScroll();
  const goal = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const lookNow = useMemo(() => new THREE.Vector3(0, 0.8, 0), []);

  useFrame((state, dt) => {
    const f = scroll.offset * (cameraKeys.length - 1);
    const i = Math.min(Math.floor(f), cameraKeys.length - 2);
    const t = ease(f - i);
    const a = cameraKeys[i];
    const b = cameraKeys[i + 1];
    const x = THREE.MathUtils.lerp(a.x, b.x, t);
    const z = THREE.MathUtils.lerp(a.targetZ ?? 0, b.targetZ ?? 0, t);
    // pull back on portrait screens so the scene still fits
    const zoom = state.size.width < state.size.height ? 1.8 : 1;
    const off = a.offset.map((v, k) => THREE.MathUtils.lerp(v, b.offset[k], t) * zoom);

    // subtle parallax from the pointer
    const px = state.pointer.x * 0.6;
    const py = state.pointer.y * 0.3;
    goal.set(x + off[0] + px, off[1] + py, z + off[2]);
    look.set(x, 0.8, z);

    const k = 1 - Math.exp(-dt * 4);
    state.camera.position.lerp(goal, k);
    lookNow.lerp(look, k);
    state.camera.lookAt(lookNow);
  });

  return null;
}
