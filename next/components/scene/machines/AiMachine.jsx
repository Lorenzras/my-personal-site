'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { factory } from '../store';

const POINTS = 240;
const CLUSTERS = [
  [-0.35, 0.15, 0.1, '#f472b6'],
  [0.3, 0.3, -0.15, '#38bdf8'],
  [0.05, -0.2, 0.3, '#fbbf24'],
];

// AI & Data: a glass "neural eye" with a swirling cloud of embedding points
// that keep settling into three clusters, and a laser that scans the belt.
export default function AiMachine({ color, low }) {
  const cloud = useRef();
  const laser = useRef();
  const dome = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 16; i += 1) {
      const a = (i / 16) * (Math.PI / 2);
      pts.push(new THREE.Vector2(Math.cos(a) * 0.95, Math.sin(a) * 0.95));
    }
    return new THREE.LatheGeometry(pts, 48);
  }, []);
  const { geometry, targets, starts } = useMemo(() => {
    const pos = new Float32Array(POINTS * 3);
    const col = new Float32Array(POINTS * 3);
    const tgt = new Float32Array(POINTS * 3);
    const st = new Float32Array(POINTS * 3);
    const c = new THREE.Color();
    for (let i = 0; i < POINTS; i += 1) {
      const [cx, cy, cz, hex] = CLUSTERS[i % 3];
      c.set(hex).multiplyScalar(3);
      tgt.set([cx + (Math.random() - 0.5) * 0.3, cy + (Math.random() - 0.5) * 0.3, cz + (Math.random() - 0.5) * 0.3], i * 3);
      const r = 0.7 * Math.cbrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      st.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
      col.set([c.r, c.g, c.b], i * 3);
    }
    pos.set(st);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return { geometry: g, targets: tgt, starts: st };
  }, []);

  useFrame(() => {
    // 0 → scattered, 1 → clustered, looping every ~6s
    const k = (Math.sin(factory.t * 1.0) + 1) / 2;
    const e = k * k * (3 - 2 * k);
    const arr = geometry.attributes.position.array;
    for (let i = 0; i < POINTS * 3; i += 1) arr[i] = starts[i] + (targets[i] - starts[i]) * e;
    geometry.attributes.position.needsUpdate = true;
    if (cloud.current) cloud.current.rotation.y = factory.t * 0.3;
    if (laser.current) laser.current.rotation.z = Math.sin(factory.t * 2.4) * 0.35;
  });

  return (
    <group>
      {/* neural eye behind the belt */}
      <group position={[1.5, 0, -2.4]}>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.1, 1.2, 0.6, 48]} />
          <meshStandardMaterial color="#1f2433" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.61, 0]}>
          <torusGeometry args={[1.0, 0.03, 8, 64]} />
          <meshBasicMaterial color={new THREE.Color(color).multiplyScalar(5)} toneMapped={false} />
        </mesh>
        <mesh geometry={dome} position={[0, 0.6, 0]}>
          {low ? (
            <meshPhysicalMaterial transmission={1} roughness={0.12} thickness={0.4} ior={1.3} color="#ffe4f1" />
          ) : (
            <MeshTransmissionMaterial samples={4} resolution={256} thickness={0.4} chromaticAberration={0.05} anisotropicBlur={0.1} roughness={0.08} color="#ffe4f1" />
          )}
        </mesh>
        <points ref={cloud} geometry={geometry} position={[0, 1.15, 0]}>
          <pointsMaterial size={0.05} vertexColors toneMapped={false} sizeAttenuation />
        </points>
      </group>
      {/* scanning laser fan from the portal */}
      <group ref={laser} position={[0, 2.7, 0]}>
        <mesh position={[0, -1.0, 0]}>
          <coneGeometry args={[0.9, 2.0, 32, 1, true]} />
          <meshBasicMaterial color={color} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      </group>
      {/* pixel-picker reticle, a nod to the colour-detecting game bots */}
      <mesh position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.46, 32]} />
        <meshBasicMaterial color={new THREE.Color(color).multiplyScalar(3)} toneMapped={false} />
      </mesh>
    </group>
  );
}
