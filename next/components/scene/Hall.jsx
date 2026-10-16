'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { stations } from '@/content/site';
import { floorTexture, hazardTexture } from './textures';
import { BELT_START, DOCK_X, stationX } from './layout';
import { factory } from './store';

const HALL_START = BELT_START - 12;
const HALL_END = DOCK_X + 14;
const HALL_LEN = HALL_END - HALL_START;
const HALL_MID = (HALL_START + HALL_END) / 2;
const steel = { color: '#2b3240', metalness: 0.8, roughness: 0.35 };

function Floor({ low }) {
  const map = useMemo(() => {
    const t = floorTexture().clone();
    t.repeat.set(HALL_LEN / 8, 40 / 8);
    t.needsUpdate = true;
    return t;
  }, []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[HALL_MID, 0, 0]} receiveShadow>
      <planeGeometry args={[HALL_LEN, 40]} />
      {low ? (
        <meshStandardMaterial map={map} color="#3a3f4a" metalness={0.4} roughness={0.55} />
      ) : (
        <MeshReflectorMaterial
          map={map}
          resolution={512}
          blur={[300, 100]}
          mixBlur={1}
          mixStrength={1.5}
          mirror={0.5}
          roughness={0.9}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#6b7280"
          metalness={0.5}
        />
      )}
    </mesh>
  );
}

// Yellow walkway lines either side of the belt.
function Walkway() {
  return [-2.6, 2.6].map((z) => (
    <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[HALL_MID, 0.004, z]}>
      <planeGeometry args={[HALL_LEN, 0.08]} />
      <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.25} roughness={0.6} />
    </mesh>
  ));
}

function Walls() {
  const pillars = [];
  for (let x = HALL_START; x <= HALL_END; x += STATION_GAP_PILLAR) pillars.push(x);
  const hz = useMemo(() => {
    const t = hazardTexture().clone();
    t.repeat.set(2, 1);
    t.needsUpdate = true;
    return t;
  }, []);
  return (
    <group>
      {/* back wall */}
      <mesh position={[HALL_MID, 5, -10]} receiveShadow>
        <planeGeometry args={[HALL_LEN, 10]} />
        <meshStandardMaterial color="#0d1018" metalness={0.6} roughness={0.7} />
      </mesh>
      {/* I-beam pillars */}
      <Instances limit={pillars.length * 3} castShadow>
        <boxGeometry />
        <meshStandardMaterial {...steel} />
        {pillars.map((x) => (
          <group key={x} position={[x, 0, -9.4]}>
            <Instance position={[0, 5, 0]} scale={[0.5, 10, 0.12]} />
            <Instance position={[0, 5, -0.3]} scale={[0.12, 10, 0.5]} />
            <Instance position={[0, 5, -0.6]} scale={[0.5, 10, 0.12]} />
          </group>
        ))}
      </Instances>
      {pillars.map((x) => (
        <mesh key={x} position={[x, 0.4, -9.25]}>
          <planeGeometry args={[0.5, 0.8]} />
          <meshStandardMaterial map={hz} />
        </mesh>
      ))}
      {/* catwalk */}
      <mesh position={[HALL_MID, 5.2, -7.6]} castShadow receiveShadow>
        <boxGeometry args={[HALL_LEN, 0.12, 2]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      <mesh position={[HALL_MID, 5.75, -6.65]}>
        <boxGeometry args={[HALL_LEN, 0.05, 0.05]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.3} roughness={0.4} />
      </mesh>
      <Instances limit={Math.ceil(HALL_LEN / 1.5) + 1}>
        <cylinderGeometry args={[0.025, 0.025, 1.1, 6]} />
        <meshStandardMaterial {...steel} />
        {Array.from({ length: Math.ceil(HALL_LEN / 1.5) + 1 }, (_, i) => (
          <Instance key={i} position={[HALL_START + i * 1.5, 5.75, -6.65]} />
        ))}
      </Instances>
    </group>
  );
}
const STATION_GAP_PILLAR = 9;

// One hanging lamp per station; only the lamps near the camera are lit.
function Lamps() {
  const refs = useRef([]);
  const targets = useMemo(() => stations.map(() => new THREE.Object3D()), []);
  const shade = useMemo(() => {
    const pts = [[0.05, 0], [0.12, -0.05], [0.5, -0.45], [0.55, -0.5]].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 24);
  }, []);
  useFrame(() => {
    refs.current.forEach((l, i) => {
      if (!l) return;
      const d = Math.abs((factory.focusX ?? 0) - stationX(i));
      const target = d < 9 ? 60 * factory.power : 0;
      l.intensity += (target - l.intensity) * 0.08;
    });
  });
  return stations.map((s, i) => (
    <group key={s.id} position={[stationX(i), 7.5, 0.4]}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 3, 4]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh geometry={shade}>
        <meshStandardMaterial color="#1f2433" metalness={0.7} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.14, 16, 12]} />
        <meshBasicMaterial color={[6, 5.2, 4]} toneMapped={false} />
      </mesh>
      <primitive object={targets[i]} position={[0, -7.5, -0.4]} />
      <spotLight
        ref={(el) => { refs.current[i] = el; }}
        position={[0, -0.35, 0]}
        target={targets[i]}
        angle={0.6}
        penumbra={0.8}
        decay={1.6}
        distance={14}
        color="#ffe6c4"
        intensity={0}
      />
    </group>
  ));
}

export default function Hall({ low }) {
  return (
    <group>
      <Floor low={low} />
      <Walkway />
      <Walls />
      <Lamps />
    </group>
  );
}
