'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { cameraKeys } from './layout';
import { factory } from './store';

const ease = (t) => t * t * (3 - 2 * t);
const lerp = THREE.MathUtils.lerp;

// Moves the camera along the line as the page scrolls, and runs factory time.
export default function CameraRig() {
  const scroll = useScroll();
  const goal = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const lookNow = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    factory.t += dt * factory.speed;
    factory.power = Math.min(1, factory.power + dt / 2.2);

    const f = scroll.offset * (cameraKeys.length - 1);
    const i = Math.min(Math.floor(f), cameraKeys.length - 2);
    const t = ease(f - i);
    const a = cameraKeys[i];
    const b = cameraKeys[i + 1];
    const x = lerp(a.x, b.x, t);
    const z = lerp(a.targetZ ?? 0, b.targetZ ?? 0, t);
    const y = lerp(a.y ?? 1, b.y ?? 1, t);
    // pull back on portrait screens so the scene still fits
    const zoom = state.size.width < state.size.height ? 1.8 : 1;
    const off = a.offset.map((v, k) => lerp(v, b.offset[k], t) * zoom);

    // subtle parallax from the pointer
    goal.set(x + off[0] + state.pointer.x * 0.6, off[1] + state.pointer.y * 0.3, z + off[2]);
    look.set(x, y, z);

    const k = 1 - Math.exp(-dt * 4);
    state.camera.position.lerp(goal, k);
    lookNow.lerp(look, k);
    state.camera.lookAt(lookNow);
    factory.focusX = lookNow.x;
  });

  return null;
}
