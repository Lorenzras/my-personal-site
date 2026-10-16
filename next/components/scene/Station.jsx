'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import RobotArm from './RobotArm';

// A gantry over the belt, a scanner beam, and a robot arm beside it.
export default function Station({ x, color, index }) {
  const beam = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 2 + index;
    beam.current.material.opacity = 0.25 + (Math.sin(t * 3) + 1) * 0.15;
  });

  return (
    <group position={[x, 0, 0]}>
      {[-1.4, 1.4].map((z) => (
        <mesh key={z} position={[0, 1.4, z]} castShadow>
          <boxGeometry args={[0.25, 2.8, 0.25]} />
          <meshStandardMaterial color="#2a3142" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 2.85, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 3.05]} />
        <meshStandardMaterial color="#2a3142" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.31, 2.85, 0]}>
        <boxGeometry args={[0.02, 0.12, 2.8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh ref={beam} position={[0, 1.7, 0]}>
        <boxGeometry args={[0.05, 2.2, 1.8]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 2.4, 0]} color={color} intensity={6} distance={6} />
      <RobotArm color={color} phase={index * 1.3} position={[-1.2, 0, -2.4]} />
      {/* station pad */}
      <mesh position={[0, 0.01, -1.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}
