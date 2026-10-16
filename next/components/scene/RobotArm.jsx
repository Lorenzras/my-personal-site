'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const steel = { color: '#d7dbe4', metalness: 0.7, roughness: 0.3 };

export default function RobotArm({ color, phase = 0, ...props }) {
  const base = useRef();
  const shoulder = useRef();
  const elbow = useRef();
  const claw = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 1.4 + phase;
    base.current.rotation.y = Math.sin(t * 0.5) * 0.6;
    shoulder.current.rotation.z = -0.5 + Math.sin(t) * 0.25;
    elbow.current.rotation.z = 1.4 + Math.sin(t + 1) * 0.35;
    claw.current.scale.x = 0.8 + (Math.sin(t * 2) + 1) * 0.15;
  });

  return (
    <group {...props}>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.65, 0.3, 24]} />
        <meshStandardMaterial color="#2a3142" metalness={0.6} roughness={0.4} />
      </mesh>
      <group ref={base} position={[0, 0.3, 0]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 0.4, 20]} />
          <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
        </mesh>
        <group ref={shoulder} position={[0, 0.45, 0]}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[0.25, 1.8, 0.25]} />
            <meshStandardMaterial {...steel} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <group ref={elbow} position={[0, 1.8, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.17, 0.17, 0.35, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, 0.7, 0]} castShadow>
              <boxGeometry args={[0.18, 1.4, 0.18]} />
              <meshStandardMaterial {...steel} />
            </mesh>
            <group ref={claw} position={[0, 1.45, 0]}>
              {[-0.12, 0.12].map((x) => (
                <mesh key={x} position={[x, 0.15, 0]}>
                  <boxGeometry args={[0.06, 0.3, 0.2]} />
                  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
