'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { stations } from '@/content/site';
import { beltTexture } from './textures';
import { BELT_START, BELT_END, BELT_LENGTH, stationX } from './layout';
import { factory } from './store';

export const BELT_SPEED = 1.5;
const MID = BELT_START + BELT_LENGTH / 2;
const ROLLER_GAP = 0.5;
const ROLLERS = Math.floor(BELT_LENGTH / ROLLER_GAP);
const steel = { color: '#aab2c0', metalness: 0.9, roughness: 0.3 };
const gunmetal = { color: '#2b3240', metalness: 0.8, roughness: 0.35 };

// C-channel side frame profile.
function useChannel() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.lineTo(0.14, 0); s.lineTo(0.14, 0.04); s.lineTo(0.04, 0.04);
    s.lineTo(0.04, 0.26); s.lineTo(0.14, 0.26); s.lineTo(0.14, 0.3); s.lineTo(0, 0.3);
    const g = new THREE.ExtrudeGeometry(s, { depth: BELT_LENGTH, bevelEnabled: false });
    g.rotateY(Math.PI / 2);
    g.translate(-BELT_LENGTH / 2, 0, 0);
    return g;
  }, []);
}

export default function Conveyor() {
  const belt = useRef();
  const rollers = useRef();
  const channel = useChannel();
  const map = useMemo(() => {
    const t = beltTexture().clone();
    t.repeat.set(BELT_LENGTH / 1.2, 1);
    t.needsUpdate = true;
    return t;
  }, []);
  const rail = useMemo(
    () => new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(-BELT_LENGTH / 2, 0, 0), new THREE.Vector3(BELT_LENGTH / 2, 0, 0)), 1, 0.035, 8),
    [],
  );

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1) * BELT_SPEED * factory.speed;
    map.offset.x -= d / 1.2;
    if (rollers.current) rollers.current.children.forEach((r) => { r.rotation.y -= d / 0.06; });
  });

  return (
    <group position={[MID, 0, 0]}>
      {/* side frames */}
      {[-1.05, 1.05].map((z) => (
        <mesh key={z} geometry={channel} position={[0, 0.32, z]} rotation={[0, z < 0 ? 0 : Math.PI, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...gunmetal} />
        </mesh>
      ))}
      {/* belt */}
      <mesh ref={belt} position={[0, 0.66, 0]} receiveShadow>
        <boxGeometry args={[BELT_LENGTH, 0.03, 1.8]} />
        <meshStandardMaterial map={map} roughness={0.8} color="#cfd3da" />
      </mesh>
      {/* visible rollers under the belt edge */}
      <Instances ref={rollers} limit={ROLLERS}>
        <cylinderGeometry args={[0.06, 0.06, 2.0, 12]} />
        <meshStandardMaterial {...steel} />
        {Array.from({ length: ROLLERS }, (_, i) => (
          <Instance key={i} position={[-BELT_LENGTH / 2 + i * ROLLER_GAP, 0.56, 0]} rotation={[Math.PI / 2, 0, 0]} />
        ))}
      </Instances>
      {/* amber rails */}
      {[-1.02, 1.02].map((z) => (
        <mesh key={z} geometry={rail} position={[0, 0.74, z]}>
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} metalness={0.4} roughness={0.35} />
        </mesh>
      ))}
      {/* A-frame legs */}
      <Instances limit={Math.ceil(BELT_LENGTH / 3) * 4} castShadow>
        <boxGeometry args={[0.08, 0.42, 0.08]} />
        <meshStandardMaterial {...gunmetal} />
        {Array.from({ length: Math.ceil(BELT_LENGTH / 3) }, (_, i) => (
          [-0.95, 0.95].flatMap((z) => [-0.15, 0.15].map((r) => (
            <Instance key={`${i}${z}${r}`} position={[-BELT_LENGTH / 2 + 0.5 + i * 3 + r * 0.6, 0.2, z]} rotation={[0, 0, r]} />
          )))
        ))}
      </Instances>
      {/* glowing lane lights per station segment */}
      {stations.map((s, i) => (
        <mesh key={s.id} position={[stationX(i) + 4.5 - MID, 0.36, 1.2]}>
          <boxGeometry args={[8.6, 0.03, 0.03]} />
          <meshBasicMaterial color={new THREE.Color(s.color).multiplyScalar(4)} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
