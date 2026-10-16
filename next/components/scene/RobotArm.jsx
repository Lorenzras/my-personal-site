'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { factory } from './store';

const steel = { color: '#aab2c0', metalness: 0.85, roughness: 0.3 };

function useBaseGeometry() {
  return useMemo(() => {
    const pts = [[0, 0], [0.62, 0], [0.62, 0.06], [0.5, 0.12], [0.42, 0.14], [0.4, 0.22], [0.34, 0.3], [0, 0.3]]
      .map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 32);
  }, []);
}

function Joint({ color, r = 0.17 }) {
  const glow = useMemo(() => new THREE.Color(color).multiplyScalar(4), [color]);
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[r, r, 0.34, 24]} />
        <meshStandardMaterial color="#1f2433" metalness={0.7} roughness={0.3} />
      </mesh>
      {[-0.175, 0.175].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[r * 0.7, 0.02, 8, 24]} />
          <meshBasicMaterial color={glow} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

// 4-axis industrial arm with capsule links. `tool` is rendered at the wrist.
// `cycle(t)` returns [baseYaw, shoulder, elbow, wrist] in radians.
export default function RobotArm({ color, phase = 0, tool = null, cycle, ...props }) {
  const base = useRef();
  const shoulder = useRef();
  const elbow = useRef();
  const wrist = useRef();
  const baseGeo = useBaseGeometry();

  useFrame(() => {
    const t = factory.t * 1.4 + phase;
    const [yaw, sh, el, wr] = cycle
      ? cycle(t)
      : [Math.sin(t * 0.5) * 0.6, -0.5 + Math.sin(t) * 0.25, 1.4 + Math.sin(t + 1) * 0.35, 0.4];
    base.current.rotation.y = yaw;
    shoulder.current.rotation.z = sh;
    elbow.current.rotation.z = el;
    wrist.current.rotation.z = wr;
  });

  return (
    <group {...props}>
      <mesh geometry={baseGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#2b3240" metalness={0.8} roughness={0.35} />
      </mesh>
      <group ref={base} position={[0, 0.3, 0]}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.34, 0.36, 24]} />
          <meshStandardMaterial color={color} metalness={0.35} roughness={0.35} />
        </mesh>
        <group ref={shoulder} position={[0, 0.42, 0]}>
          <Joint color={color} />
          <mesh position={[0, 0.8, 0]} castShadow>
            <capsuleGeometry args={[0.13, 1.3, 4, 16]} />
            <meshStandardMaterial color={color} metalness={0.35} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <capsuleGeometry args={[0.145, 0.9, 4, 16]} />
            <meshStandardMaterial {...steel} />
          </mesh>
          <group ref={elbow} position={[0, 1.6, 0]}>
            <Joint color={color} r={0.14} />
            <mesh position={[0, 0.6, 0]} castShadow>
              <capsuleGeometry args={[0.1, 1.0, 4, 16]} />
              <meshStandardMaterial color={color} metalness={0.35} roughness={0.35} />
            </mesh>
            <group ref={wrist} position={[0, 1.2, 0]}>
              <Joint color={color} r={0.1} />
              <group position={[0, 0.12, 0]}>{tool}</group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export function Gripper({ color }) {
  const ref = useRef();
  useFrame(() => {
    const o = 0.08 + (Math.sin(factory.t * 3) + 1) * 0.04;
    if (ref.current) {
      ref.current.children[0].position.x = -o;
      ref.current.children[1].position.x = o;
    }
  });
  return (
    <group ref={ref}>
      {[-1, 1].map((d) => (
        <mesh key={d} position={[d * 0.1, 0.16, 0]} castShadow>
          <boxGeometry args={[0.05, 0.3, 0.16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  );
}
