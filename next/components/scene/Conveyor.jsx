'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BELT_START, BELT_END } from './layout';

const LENGTH = BELT_END - BELT_START;
const ROLLERS = Math.floor(LENGTH / 1.2);

export default function Conveyor() {
  const stripes = useRef();
  useFrame((_, dt) => {
    if (!stripes.current) return;
    stripes.current.position.x = (stripes.current.position.x + dt * 1.6) % 2;
  });

  return (
    <group position={[BELT_START + LENGTH / 2, 0, 0]}>
      {/* frame */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[LENGTH, 0.3, 2.2]} />
        <meshStandardMaterial color="#1f2433" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* belt surface */}
      <mesh position={[0, 0.52, 0]} receiveShadow>
        <boxGeometry args={[LENGTH, 0.04, 1.8]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.9} />
      </mesh>
      {/* moving stripes give the belt motion */}
      <group ref={stripes}>
        {Array.from({ length: Math.ceil(LENGTH / 2) + 1 }, (_, i) => (
          <mesh key={i} position={[-LENGTH / 2 + i * 2, 0.545, 0]}>
            <boxGeometry args={[0.08, 0.01, 1.8]} />
            <meshStandardMaterial color="#2a3142" />
          </mesh>
        ))}
      </group>
      {/* side rails */}
      {[-1.05, 1.05].map((z) => (
        <mesh key={z} position={[0, 0.62, z]}>
          <boxGeometry args={[LENGTH, 0.12, 0.08]} />
          <meshStandardMaterial color="#fbbf24" emissive="#7c4a03" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* legs */}
      {Array.from({ length: ROLLERS }, (_, i) => (
        <mesh key={i} position={[-LENGTH / 2 + 0.6 + i * 1.2, 0.1, 0]} castShadow>
          <boxGeometry args={[0.12, 0.3, 2]} />
          <meshStandardMaterial color="#323a4d" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
