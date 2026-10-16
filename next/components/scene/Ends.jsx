'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BELT_START, DOCK_X } from './layout';

// Intake hopper where raw tasks enter the line.
export function Intake() {
  const ring = useRef();
  useFrame((_, dt) => { ring.current.rotation.y += dt; });
  return (
    <group position={[BELT_START - 0.5, 0, 0]}>
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[1.5, 0.7, 1.6, 6, 1, true]} />
        <meshStandardMaterial color="#2a3142" metalness={0.6} roughness={0.4} side={2} />
      </mesh>
      <mesh ref={ring} position={[0, 2.45, 0]}>
        <torusGeometry args={[1.5, 0.05, 8, 6]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.8, 1.2]} />
        <meshStandardMaterial color="#1f2433" />
      </mesh>
    </group>
  );
}

// Shipping dock at the end of the line: the "contact" station.
export function Dock() {
  const light = useRef();
  useFrame(({ clock }) => {
    light.current.material.emissiveIntensity = 1.5 + Math.sin(clock.elapsedTime * 3) * 1;
  });
  return (
    <group position={[DOCK_X + 2.5, 0, 0]}>
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 3.6, 4]} />
        <meshStandardMaterial color="#1f2433" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.51, 1.1, 0]}>
        <boxGeometry args={[0.02, 2, 2.4]} />
        <meshStandardMaterial color="#05060a" />
      </mesh>
      <mesh ref={light} position={[-0.52, 2.5, 0]}>
        <boxGeometry args={[0.02, 0.2, 2.4]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" toneMapped={false} />
      </mesh>
      <pointLight position={[-1.5, 2.5, 0]} color="#34d399" intensity={8} distance={8} />
    </group>
  );
}
