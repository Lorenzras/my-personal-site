'use client';

import { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '@/content/site';
import { SHOWROOM_X, showroomSlots } from './layout';

const accents = ['#38bdf8', '#a78bfa', '#f59e0b', '#f472b6', '#34d399', '#fb7185'];

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center top>
      <primitive object={scene} scale={1} />
    </Center>
  );
}

// Default exhibit until a real 3D project model is added.
function Placeholder({ color }) {
  const ref = useRef();
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.6;
    ref.current.rotation.x += dt * 0.2;
  });
  return (
    <mesh ref={ref} position={[0, 0.7, 0]} castShadow>
      <icosahedronGeometry args={[0.55, 0]} />
      <meshStandardMaterial color={color} flatShading metalness={0.3} roughness={0.25} />
    </mesh>
  );
}

function Pedestal({ project, position, color, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }}
      onClick={(e) => { e.stopPropagation(); onSelect(project); }}
      scale={hovered ? 1.08 : 1}
    >
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 1, 0.9, 32]} />
        <meshStandardMaterial color="#1f2433" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.91, 0]}>
        <cylinderGeometry args={[0.87, 0.87, 0.03, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.5 : 1} toneMapped={false} />
      </mesh>
      <Float speed={2} floatIntensity={0.4} rotationIntensity={0.2}>
        <group position={[0, 0.9, 0]}>
          {project.model ? (
            <Suspense fallback={<Placeholder color={color} />}>
              <Model url={project.model} />
            </Suspense>
          ) : (
            <Placeholder color={color} />
          )}
        </group>
      </Float>
    </group>
  );
}

export default function Showroom({ onSelect }) {
  const [target] = useState(() => new THREE.Object3D());
  return (
    <group>
      <mesh position={[SHOWROOM_X, 0.005, -4.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6.5, 48]} />
        <meshStandardMaterial color="#151925" metalness={0.3} roughness={0.6} />
      </mesh>
      <primitive object={target} position={[SHOWROOM_X, 0, -4.8]} />
      <spotLight position={[SHOWROOM_X, 9, 0]} angle={0.7} penumbra={0.6} intensity={60} decay={1.5} target={target} />
      {projects.map((p, i) => (
        <Pedestal
          key={p.title}
          project={p}
          position={showroomSlots[i]}
          color={accents[i % accents.length]}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}
