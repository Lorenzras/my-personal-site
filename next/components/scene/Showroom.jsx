'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Float, Outlines, RoundedBox, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { projects, sections } from '@/content/site';
import { textTexture } from './textures';
import { SHOWROOM_X, showroomSlots } from './layout';

const accents = ['#f472b6', '#f59e0b', '#38bdf8', '#a78bfa', '#34d399', '#fb7185'];

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center top>
      <primitive object={scene} />
    </Center>
  );
}

// Built-in exhibits until real 3D project models are added.
function Exhibit({ kind, color, hovered }) {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * (hovered ? 1.6 : 0.5); });
  const glow = useMemo(() => new THREE.Color(color).multiplyScalar(3), [color]);
  const outline = hovered ? <Outlines thickness={2.5} color={color} /> : null;
  let body;
  switch (kind) {
    case 'ore': // clay ore for the RuneScape miner
      body = (
        <group>
          <mesh castShadow>
            <dodecahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial color="#6b7280" flatShading roughness={0.8} />
            {outline}
          </mesh>
          {[[0.25, 0.2, 0.3], [-0.3, 0.1, 0.25], [0.05, 0.35, -0.2]].map((p) => (
            <mesh key={p.join()} position={p}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial color="#c2763a" emissive="#c2763a" emissiveIntensity={0.6} flatShading />
            </mesh>
          ))}
        </group>
      );
      break;
    case 'stroke': // a brush stroke with a hook, for the handwriting classifier
      body = (
        <mesh castShadow>
          <tubeGeometry args={[new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.4, 0.3, 0), new THREE.Vector3(0, 0.25, 0.05), new THREE.Vector3(0.2, -0.2, 0), new THREE.Vector3(0.05, -0.35, 0), new THREE.Vector3(-0.08, -0.22, 0),
          ]), 48, 0.07, 12, false]}
          />
          <meshStandardMaterial color="#111827" emissive={glow} emissiveIntensity={0.4} roughness={0.3} />
          {outline}
        </mesh>
      );
      break;
    case 'calendar': // calendar block for Kintone daily reports
      body = (
        <group>
          <RoundedBox args={[0.7, 0.7, 0.18]} radius={0.05} castShadow>
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
            {outline}
          </RoundedBox>
          <mesh position={[0, 0.27, 0.1]}>
            <boxGeometry args={[0.7, 0.16, 0.02]} />
            <meshBasicMaterial color={glow} toneMapped={false} />
          </mesh>
          {Array.from({ length: 9 }, (_, i) => (
            <mesh key={i} position={[(i % 3) * 0.18 - 0.18, -(Math.floor(i / 3) * 0.14) + 0.05, 0.1]}>
              <boxGeometry args={[0.12, 0.09, 0.02]} />
              <meshStandardMaterial color={i === 4 ? color : '#cbd5e1'} />
            </mesh>
          ))}
        </group>
      );
      break;
    case 'terminal': // legacy app window for the RPA encoder
      body = (
        <RoundedBox args={[0.8, 0.56, 0.12]} radius={0.04} castShadow>
          <meshStandardMaterial color="#1e3a8a" emissive="#1e40af" emissiveIntensity={0.6} roughness={0.3} />
          {outline}
        </RoundedBox>
      );
      break;
    case 'house': // real estate scraper
      body = (
        <group>
          <mesh position={[0, -0.1, 0]} castShadow>
            <boxGeometry args={[0.6, 0.45, 0.5]} />
            <meshStandardMaterial color="#e5e7eb" />
            {outline}
          </mesh>
          <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[0.52, 0.38, 4]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      );
      break;
    default: // chat bubble for Kintone x Chatwork
      body = (
        <group>
          <RoundedBox args={[0.8, 0.5, 0.2]} radius={0.12} castShadow>
            <meshStandardMaterial color={color} roughness={0.3} />
            {outline}
          </RoundedBox>
          <mesh position={[-0.2, -0.3, 0]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.1, 0.18, 3]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      );
  }
  return <group ref={ref}>{body}</group>;
}

function Plinth({ project, position, color, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const geo = useMemo(() => {
    const pts = [[0, 0], [1.05, 0], [1.05, 0.12], [0.92, 0.16], [0.82, 0.2], [0.78, 0.82], [0.9, 0.86], [0.9, 0.94], [0, 0.94]]
      .map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 48);
  }, []);
  const glow = useMemo(() => new THREE.Color(color).multiplyScalar(hovered ? 7 : 4), [color, hovered]);
  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }}
      onClick={(e) => { e.stopPropagation(); onSelect(project); }}
    >
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial color="#161b26" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.86, 0.025, 8, 64]} />
        <meshBasicMaterial color={glow} toneMapped={false} />
      </mesh>
      {/* fake volumetric light cone */}
      <mesh position={[0, 2.6, 0]}>
        <coneGeometry args={[0.9, 3.4, 32, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.07 : 0.025} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <Float speed={2} floatIntensity={0.4} rotationIntensity={0.15}>
        <group position={[0, 1.6, 0]} scale={hovered ? 1.12 : 1}>
          {project.model ? (
            <Suspense fallback={<Exhibit kind={project.exhibit} color={color} />}>
              <Model url={project.model} />
            </Suspense>
          ) : (
            <Exhibit kind={project.exhibit} color={color} hovered={hovered} />
          )}
        </group>
      </Float>
    </group>
  );
}

export default function Showroom({ onSelect }) {
  const sign = textTexture('showroom', [sections.showroom.kicker], { w: 768, h: 128, size: 64, color: '#fbbf24' });
  return (
    <group>
      <mesh position={[SHOWROOM_X, 0.006, -5.3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6.8, 64]} />
        <meshStandardMaterial color="#10141d" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[SHOWROOM_X, 0.008, -5.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.7, 6.8, 96]} />
        <meshBasicMaterial color={[3.5, 2.4, 0.4]} toneMapped={false} />
      </mesh>
      <mesh position={[SHOWROOM_X, 6.2, -9.5]}>
        <planeGeometry args={[6, 1]} />
        <meshBasicMaterial map={sign} transparent color={[1.8, 1.8, 1.8]} toneMapped={false} depthWrite={false} />
      </mesh>
      {projects.map((p, i) => (
        <Plinth key={p.title} project={p} position={showroomSlots[i]} color={accents[i % accents.length]} onSelect={onSelect} />
      ))}
    </group>
  );
}
