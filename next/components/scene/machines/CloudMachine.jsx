'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { parcelTexture, textTexture } from '../textures';
import { factory } from '../store';

const LIFTED = 4;

function Drone({ color }) {
  const ref = useRef();
  const rotors = useRef([]);
  useFrame(() => {
    const t = factory.t * 0.6;
    ref.current.position.set(Math.cos(t) * 2.2, 4.4 + Math.sin(t * 2) * 0.25, -1.6 + Math.sin(t) * 1.2);
    ref.current.rotation.y = -t;
    rotors.current.forEach((r) => { if (r) r.rotation.y += 0.9; });
  });
  return (
    <group ref={ref}>
      <RoundedBox args={[0.5, 0.14, 0.5]} radius={0.05} castShadow>
        <meshStandardMaterial color="#e5e7eb" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => (
        <group key={i} position={[a * 0.36, 0.06, b * 0.36]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.025, 0.1, 6]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <mesh ref={(el) => { rotors.current[i] = el; }} position={[0, 0.06, 0]}>
            <boxGeometry args={[0.36, 0.01, 0.04]} />
            <meshStandardMaterial color="#9ca3af" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.08, 0.26]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={new THREE.Color(color).multiplyScalar(6)} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.32, 0.26, 0.32]} />
        <meshStandardMaterial map={parcelTexture()} roughness={0.7} />
      </mesh>
    </group>
  );
}

// Cloud: finished parcels ride a glass lift up into a glowing cloud while a
// delivery drone circles; a board counts deployments.
export default function CloudMachine({ color }) {
  const lifted = useRef([]);
  const puffs = useRef();
  const board = textTexture('deploy', ['DEPLOYED ✓', 'build 0.8s · 0 errors'], { w: 512, h: 192, size: 44, color: '#34d399', bg: '#06110c' });
  const puffData = useMemo(() => [
    [0, 0, 0, 0.9], [0.9, 0.1, 0.1, 0.7], [-0.85, -0.05, 0.1, 0.75], [0.4, 0.45, -0.2, 0.65], [-0.35, 0.5, 0.05, 0.6], [0.2, -0.25, 0.5, 0.55],
  ], []);

  useFrame(() => {
    lifted.current.forEach((m, i) => {
      if (!m) return;
      const u = (factory.t * 0.25 + i / LIFTED) % 1;
      m.position.y = 0.6 + u * 4.6;
      m.rotation.y = u * 4;
      m.scale.setScalar(u > 0.85 ? (1 - u) / 0.15 : 1);
    });
    if (puffs.current) puffs.current.rotation.y = factory.t * 0.08;
  });

  return (
    <group>
      <group position={[2.2, 0, -2.3]}>
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.9, 0.3, 32]} />
          <meshStandardMaterial color="#1f2433" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.8, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 5.2, 32, 1, true]} />
          <meshPhysicalMaterial transmission={1} roughness={0.05} thickness={0.1} color="#dffff3" side={THREE.DoubleSide} />
        </mesh>
        {[0.3, 5.4].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.52, 0.04, 8, 32]} />
            <meshBasicMaterial color={new THREE.Color(color).multiplyScalar(5)} toneMapped={false} />
          </mesh>
        ))}
        {Array.from({ length: LIFTED }, (_, i) => (
          <mesh key={i} ref={(el) => { lifted.current[i] = el; }} castShadow>
            <boxGeometry args={[0.4, 0.3, 0.4]} />
            <meshStandardMaterial map={parcelTexture()} roughness={0.7} />
          </mesh>
        ))}
        <group ref={puffs} position={[0, 6.0, 0]}>
          {puffData.map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]}>
              <icosahedronGeometry args={[r, 2]} />
              <meshStandardMaterial color="#e6fff6" emissive={color} emissiveIntensity={0.35} roughness={0.9} />
            </mesh>
          ))}
        </group>
        <Sparkles count={30} color={color} scale={[1, 5, 1]} position={[0, 2.8, 0]} size={3} speed={0.6} />
      </group>
      <Drone color={color} />
      <mesh position={[-1.8, 2.2, -2.6]} rotation={[0, 0.3, 0]}>
        <planeGeometry args={[1.6, 0.6]} />
        <meshBasicMaterial map={board} color={[1.8, 1.8, 1.8]} toneMapped={false} />
      </mesh>
    </group>
  );
}
