'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { sunTexture, textTexture, hazardTexture } from './textures';
import { BELT_START, DOCK_X } from './layout';
import { factory } from './store';

const gunmetal = { color: '#2b3240', metalness: 0.8, roughness: 0.35 };

// Intake hopper where raw tasks enter, under a Philippine sun emblem.
export function Intake() {
  const ring = useRef();
  const funnel = useMemo(() => {
    const pts = [[0.45, 0], [0.5, 0], [0.55, 0.5], [1.45, 1.4], [1.55, 1.5], [1.45, 1.52], [0.48, 0.55], [0.4, 0.05]]
      .map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 8);
  }, []);
  const sign = textTexture('intake', ['入口 · INTAKE', 'raw tasks'], { w: 512, h: 160, size: 46, color: '#fbbf24' });
  useFrame((_, dt) => { if (ring.current) ring.current.rotation.z += dt * 0.4; });

  return (
    <group position={[BELT_START - 0.4, 0, 0]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 1, 16]} />
        <meshStandardMaterial {...gunmetal} />
      </mesh>
      <mesh geometry={funnel} position={[0, 1.0, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...gunmetal} side={THREE.DoubleSide} />
        <Edges threshold={20} color="#fbbf24" />
      </mesh>
      {/* Philippine sun emblem on a frame behind the hopper */}
      <group position={[0, 3.6, -1.4]}>
        <mesh ref={ring}>
          <planeGeometry args={[2.2, 2.2]} />
          <meshBasicMaterial map={sunTexture()} transparent color={[2.6, 2.2, 1]} toneMapped={false} depthWrite={false} />
        </mesh>
      </group>
      <mesh position={[0, 2.0, -1.45]}>
        <planeGeometry args={[2.2, 0.69]} />
        <meshBasicMaterial map={sign} transparent color={[1.8, 1.8, 1.8]} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

const SLATS = 12;

// Shipping dock: torii-style gate, roll-up door, trailer and a beacon.
export function Dock() {
  const beacon = useRef();
  const slats = useRef();
  const hz = useMemo(() => {
    const t = hazardTexture().clone();
    t.repeat.set(4, 1);
    t.needsUpdate = true;
    return t;
  }, []);
  const sign = textTexture('dock', ['出荷 · SHIP IT'], { w: 512, h: 128, size: 60, color: '#34d399' });

  useFrame(() => {
    if (beacon.current) beacon.current.rotation.y = factory.t * 3;
    // door rolls up when the camera reaches the dock
    const open = THREE.MathUtils.clamp(((factory.focusX ?? 0) - (DOCK_X - 8)) / 6, 0, 1);
    if (slats.current) {
      slats.current.children.forEach((s, i) => {
        s.position.y = 0.15 + i * 0.2 + open * 2.4 * (1 - i / (SLATS * 1.6));
      });
    }
  });

  return (
    <group position={[DOCK_X + 2, 0, 0]}>
      {/* building face */}
      <mesh position={[0.6, 2.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 4.8, 7]} />
        <meshStandardMaterial color="#141822" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* opening + slats */}
      <mesh position={[-0.005, 1.25, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2.6, 2.5]} />
        <meshBasicMaterial color="#020305" />
      </mesh>
      <group ref={slats} rotation={[0, -Math.PI / 2, 0]} position={[-0.05, 0, 0]}>
        {Array.from({ length: SLATS }, (_, i) => (
          <mesh key={i} position={[0, 0.15 + i * 0.2, 0]}>
            <boxGeometry args={[2.6, 0.18, 0.04]} />
            <meshStandardMaterial color="#9aa3b2" metalness={0.7} roughness={0.35} />
          </mesh>
        ))}
      </group>
      {/* bumpers */}
      {[-1.6, 1.6].map((z) => (
        <mesh key={z} position={[-0.1, 0.4, z]}>
          <boxGeometry args={[0.2, 0.6, 0.4]} />
          <meshStandardMaterial map={hz} />
        </mesh>
      ))}
      {/* torii-style gate in front of the dock */}
      <group position={[-1.6, 0, 0]}>
        {[-1.9, 1.9].map((z) => (
          <mesh key={z} position={[0, 2.0, z]} castShadow>
            <cylinderGeometry args={[0.14, 0.16, 4, 16]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, 4.1, 0]} castShadow>
          <boxGeometry args={[0.3, 0.22, 5.2]} />
          <meshStandardMaterial color="#111" roughness={0.6} />
        </mesh>
        <mesh position={[0, 3.6, 0]}>
          <boxGeometry args={[0.2, 0.16, 4.3]} />
          <meshStandardMaterial color="#c2410c" roughness={0.5} />
        </mesh>
        <mesh position={[-0.12, 3.85, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.2, 0.55]} />
          <meshBasicMaterial map={sign} transparent color={[1.8, 1.8, 1.8]} toneMapped={false} depthWrite={false} />
        </mesh>
      </group>
      <pointLight position={[-3, 3.5, 1]} color="#fff1dc" intensity={18} distance={12} decay={1.6} />
      {/* beacon */}
      <group position={[0, 5.1, 2.6]}>
        <mesh>
          <capsuleGeometry args={[0.16, 0.2, 4, 16]} />
          <meshBasicMaterial color={[0.6, 5, 2.6]} toneMapped={false} />
        </mesh>
        <group ref={beacon}>
          <pointLight color="#34d399" intensity={6} distance={9} position={[0.4, 0, 0]} />
        </group>
      </group>
      {/* trailer backed into the bay */}
      <RoundedBox args={[6, 2.6, 2.6]} radius={0.08} position={[4.2, 1.7, -4.4]} castShadow>
        <meshStandardMaterial color="#d1d5db" metalness={0.5} roughness={0.4} />
      </RoundedBox>
    </group>
  );
}
