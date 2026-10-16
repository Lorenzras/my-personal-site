'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import RobotArm from '../RobotArm';
import { itemPhase } from '../WorkItems';
import { textTexture } from '../textures';
import { factory } from '../store';

const KEYS_X = 10;
const KEYS_Y = 3;

// RPA: a bot types at a tiny workstation while a hanko press stamps 済
// onto every sheet that passes under the portal.
export default function RpaMachine({ color, x }) {
  const piston = useRef();
  const keys = useRef();
  const bar = useRef();
  const keyColor = useMemo(() => new THREE.Color(), []);
  const dim = useMemo(() => new THREE.Color('#2b3240'), []);
  const lit = useMemo(() => new THREE.Color(color).multiplyScalar(4), [color]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const screen = textTexture('rpa-screen', ['UiPath ▶ Run', 'login… ok', 'input… ok'], { w: 256, h: 160, size: 24, color: '#fbbf24', bg: '#0b0f17' });

  useFrame(() => {
    // stamp hits when an item is directly under the press
    const p = itemPhase(x);
    const hit = p < 0.12 ? Math.sin((p / 0.12) * Math.PI) : 0;
    if (piston.current) piston.current.position.y = 2.35 - hit * 1.35;
    if (bar.current) bar.current.scale.x = Math.max(0.02, (factory.t * 0.4) % 1);
    if (keys.current) {
      const active = Math.floor(factory.t * 14) % (KEYS_X * KEYS_Y);
      const second = Math.floor(factory.t * 9 + 7) % (KEYS_X * KEYS_Y);
      for (let i = 0; i < KEYS_X * KEYS_Y; i += 1) {
        keys.current.setColorAt(i, keyColor.copy(i === active || i === second ? lit : dim));
      }
      keys.current.instanceColor.needsUpdate = true;
    }
  });

  const keyRef = (el) => {
    keys.current = el;
    if (!el || el.userData.ready) return;
    for (let i = 0; i < KEYS_X * KEYS_Y; i += 1) {
      dummy.position.set((i % KEYS_X) * 0.07 - 0.32, 0, Math.floor(i / KEYS_X) * 0.07 - 0.07);
      dummy.updateMatrix();
      el.setMatrixAt(i, dummy.matrix);
      el.setColorAt(i, dim);
    }
    el.userData.ready = true;
  };

  return (
    <group>
      {/* hanko press inside the portal */}
      <group ref={piston} position={[0, 2.35, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1, 12]} />
          <meshStandardMaterial color="#aab2c0" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.28, 24]} />
          <meshStandardMaterial color="#7a3b12" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.03, 24]} />
          <meshBasicMaterial color={[3, 0.3, 0.3]} toneMapped={false} />
        </mesh>
      </group>

      {/* workstation */}
      <group position={[-2.2, 0, -2.4]} rotation={[0, 0.35, 0]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1, 0.8]} />
          <meshStandardMaterial color="#1f2433" metalness={0.6} roughness={0.4} />
        </mesh>
        <RoundedBox args={[1.0, 0.68, 0.06]} radius={0.03} position={[0, 1.55, -0.2]} castShadow>
          <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 1.6, -0.165]}>
          <planeGeometry args={[0.9, 0.5]} />
          <meshBasicMaterial map={screen} color={[1.6, 1.6, 1.6]} toneMapped={false} />
        </mesh>
        <group position={[-0.4, 1.32, -0.164]}>
          <mesh ref={bar} position={[0.4, 0, 0]}>
            <planeGeometry args={[0.8, 0.04]} />
            <meshBasicMaterial color={[4, 2.4, 0.3]} toneMapped={false} />
          </mesh>
        </group>
        <mesh position={[0, 1.2, -0.2]}>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#2b3240" />
        </mesh>
        <instancedMesh ref={keyRef} args={[null, null, KEYS_X * KEYS_Y]} position={[0, 1.03, 0.15]}>
          <boxGeometry args={[0.055, 0.03, 0.055]} />
          <meshStandardMaterial roughness={0.4} toneMapped={false} />
        </instancedMesh>
      </group>

      {/* arm "typing" over the keyboard */}
      <RobotArm
        color={color}
        position={[-1.0, 0, -1.9]}
        cycle={(t) => [2.5 + Math.sin(t * 0.7) * 0.15, -0.35 + Math.sin(t * 6) * 0.04, 1.75 + Math.sin(t * 6 + 1) * 0.06, 0.9]}
        tool={(
          <mesh position={[0, 0.12, 0]}>
            <coneGeometry args={[0.06, 0.24, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
          </mesh>
        )}
      />
    </group>
  );
}
