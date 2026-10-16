'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { textTexture } from '../textures';
import { factory } from '../store';

const LEDS = 48;
const PULSES = 6;

function Rack({ position, color }) {
  const leds = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const on = useMemo(() => new THREE.Color(color).multiplyScalar(5), [color]);
  const ok = useMemo(() => new THREE.Color('#34d399').multiplyScalar(4), []);
  const off = useMemo(() => new THREE.Color('#151924'), []);
  const seeds = useMemo(() => Array.from({ length: LEDS }, () => Math.random()), []);

  const ref = (el) => {
    leds.current = el;
    if (!el || el.userData.ready) return;
    for (let i = 0; i < LEDS; i += 1) {
      dummy.position.set((i % 4) * 0.14 - 0.21, Math.floor(i / 4) * 0.19 + 0.3, 0);
      dummy.updateMatrix();
      el.setMatrixAt(i, dummy.matrix);
      el.setColorAt(i, off);
    }
    el.userData.ready = true;
  };

  useFrame(() => {
    if (!leds.current?.instanceColor) return;
    const step = Math.floor(factory.t * 8);
    for (let i = 0; i < LEDS; i += 1) {
      const blink = Math.sin(step * (1 + seeds[i] * 3) + seeds[i] * 50) > 0.2;
      leds.current.setColorAt(i, blink ? (i % 4 === 3 ? ok : on) : off);
    }
    leds.current.instanceColor.needsUpdate = true;
  });

  return (
    <group position={position}>
      <RoundedBox args={[0.8, 2.6, 1]} radius={0.04} position={[0, 1.3, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#141822" metalness={0.8} roughness={0.35} />
      </RoundedBox>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[0, 0.3 + i * 0.19, 0.505]}>
          <planeGeometry args={[0.72, 0.15]} />
          <meshStandardMaterial color="#232a38" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
      <instancedMesh ref={ref} args={[null, null, LEDS]} position={[0, 0, 0.52]}>
        <boxGeometry args={[0.05, 0.03, 0.01]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

// Backend: server racks pump requests through glass pipes over the line.
export default function BackendMachine({ color }) {
  const pulses = useRef([]);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.0, 2.6, -2.4),
    new THREE.Vector3(-1.6, 3.6, -1.4),
    new THREE.Vector3(0, 3.35, 0),
    new THREE.Vector3(1.6, 3.6, -1.4),
    new THREE.Vector3(2.0, 2.6, -2.4),
  ]), []);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.08, 12, false), [curve]);
  const glow = useMemo(() => new THREE.Color(color).multiplyScalar(5), [color]);
  const okSign = textTexture('200ok', ['200 OK'], { w: 256, h: 96, size: 56, color: '#34d399' });
  const goTag = textTexture('gotag', ['Go'], { w: 128, h: 96, size: 60, color: '#67e8f9' });
  const p = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    pulses.current.forEach((m, i) => {
      if (!m) return;
      const u = (factory.t * 0.35 + i / PULSES) % 1;
      curve.getPointAt(u, p);
      m.position.copy(p);
    });
  });

  return (
    <group>
      <Rack position={[-2.0, 0, -2.6]} color={color} />
      <Rack position={[2.0, 0, -2.6]} color={color} />
      <mesh geometry={tube}>
        <meshPhysicalMaterial transmission={1} roughness={0.05} thickness={0.1} color="#e9e4ff" />
      </mesh>
      {Array.from({ length: PULSES }, (_, i) => (
        <mesh key={i} ref={(el) => { pulses.current[i] = el; }}>
          <sphereGeometry args={[0.055, 12, 8]} />
          <meshBasicMaterial color={glow} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, 3.75, 0.2]}>
        <planeGeometry args={[0.9, 0.34]} />
        <meshBasicMaterial map={okSign} transparent color={[2, 2, 2]} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh position={[2.0, 2.85, -2.08]}>
        <planeGeometry args={[0.36, 0.27]} />
        <meshBasicMaterial map={goTag} transparent color={[2, 2, 2]} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}
