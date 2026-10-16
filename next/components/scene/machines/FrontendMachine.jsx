'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import RobotArm from '../RobotArm';
import { browserTexture } from '../textures';
import { factory } from '../store';

const ACCENTS = ['#38bdf8', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#fb7185'];

// Frontend: a wall of floating UI panels assembling themselves, and an arm
// with a suction cup placing them.
export default function FrontendMachine({ color }) {
  const panels = useRef([]);
  const maps = useMemo(() => ACCENTS.map((a, i) => browserTexture(a, `browser-${i}`)), []);

  useFrame(() => {
    panels.current.forEach((g, i) => {
      if (!g) return;
      const t = factory.t * 0.8 + i * 0.9;
      // each panel slides in, holds, then slides back out
      const k = (Math.sin(t) + 1) / 2;
      g.position.z = -2.6 + k * 0.5;
      g.position.y = g.userData.y + Math.sin(t * 1.3) * 0.05;
      g.rotation.y = 0.25 - k * 0.15;
    });
  });

  return (
    <group>
      {ACCENTS.map((a, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const y = 1.6 + row * 0.95;
        return (
          <group
            key={a}
            ref={(el) => { panels.current[i] = el; if (el) el.userData.y = y; }}
            position={[-0.4 + col * 1.25, y, -2.6]}
          >
            <RoundedBox args={[1.1, 0.78, 0.05]} radius={0.03} castShadow>
              <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.3} />
            </RoundedBox>
            <mesh position={[0, 0, 0.03]}>
              <planeGeometry args={[1.02, 0.7]} />
              <meshBasicMaterial map={maps[i]} color={[1.5, 1.5, 1.5]} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
      <RobotArm
        color={color}
        position={[-1.6, 0, -1.6]}
        phase={2}
        tool={(
          <group>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.12, 8]} />
              <meshStandardMaterial color="#aab2c0" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.14, 0]}>
              <cylinderGeometry args={[0.13, 0.05, 0.08, 20]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
            </mesh>
          </group>
        )}
      />
    </group>
  );
}
