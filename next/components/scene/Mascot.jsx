'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { factory } from './store';

// Lenz-bot: a rounded little robot with one camera-lens eye (LenzLab) that
// waves at visitors and watches the cursor.
export default function Mascot(props) {
  const root = useRef();
  const head = useRef();
  const arm = useRef();
  const eye = useRef();

  useFrame((state) => {
    const t = factory.t;
    root.current.position.y = Math.abs(Math.sin(t * 3)) * 0.08;
    arm.current.rotation.z = 2.4 + Math.sin(t * 7) * 0.45;
    const px = state.pointer.x;
    const py = state.pointer.y;
    head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, px * 0.7 + 0.3, 0.1);
    head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -py * 0.3, 0.1);
    // blink
    eye.current.scale.y = (t % 4) < 0.12 ? 0.1 : 1;
  });

  return (
    <group {...props}>
      <group ref={root}>
        {/* body */}
        <RoundedBox args={[0.8, 0.7, 0.6]} radius={0.18} position={[0, 0.55, 0]} castShadow>
          <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0.6, 0.305]}>
          <planeGeometry args={[0.36, 0.18]} />
          <meshBasicMaterial color={[3.5, 2.4, 0.4]} toneMapped={false} />
        </mesh>
        {/* wheels */}
        {[-0.3, 0.3].map((x) => (
          <mesh key={x} position={[x, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.12, 20]} />
            <meshStandardMaterial color="#1f2433" />
          </mesh>
        ))}
        {/* waving arm */}
        <group ref={arm} position={[0.42, 0.75, 0]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <capsuleGeometry args={[0.06, 0.38, 4, 12]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        </group>
        <mesh position={[-0.42, 0.55, 0]} rotation={[0, 0, -0.3]} castShadow>
          <capsuleGeometry args={[0.06, 0.3, 4, 12]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* head with lens eye */}
        <group ref={head} position={[0, 1.15, 0]}>
          <RoundedBox args={[0.7, 0.5, 0.55]} radius={0.16} castShadow>
            <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.35} />
          </RoundedBox>
          <mesh position={[0, 0, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.17, 0.19, 0.1, 32]} />
            <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh ref={eye} position={[0, 0, 0.325]}>
            <circleGeometry args={[0.11, 32]} />
            <meshBasicMaterial color={[0.4, 2.6, 4]} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.34, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
            <meshStandardMaterial color="#9ca3af" />
          </mesh>
          <mesh position={[0, 0.46, 0]}>
            <sphereGeometry args={[0.05, 12, 8]} />
            <meshBasicMaterial color={[4, 1, 0.6]} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
