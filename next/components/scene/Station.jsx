'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { signTexture, hazardTexture } from './textures';
import { factory } from './store';
import RpaMachine from './machines/RpaMachine';
import AiMachine from './machines/AiMachine';
import BackendMachine from './machines/BackendMachine';
import FrontendMachine from './machines/FrontendMachine';
import CloudMachine from './machines/CloudMachine';

const MACHINES = {
  rpa: RpaMachine,
  ai: AiMachine,
  backend: BackendMachine,
  frontend: FrontendMachine,
  cloud: CloudMachine,
};

// Rounded arch portal over the belt, extruded from a 2D shape.
function usePortal() {
  return useMemo(() => {
    const w = 1.6;
    const h = 3.0;
    const r = 0.5;
    const outer = new THREE.Shape();
    outer.moveTo(-w, 0);
    outer.lineTo(-w, h - r);
    outer.quadraticCurveTo(-w, h, -w + r, h);
    outer.lineTo(w - r, h);
    outer.quadraticCurveTo(w, h, w, h - r);
    outer.lineTo(w, 0);
    outer.lineTo(w - 0.28, 0);
    outer.lineTo(w - 0.28, h - r - 0.1);
    outer.quadraticCurveTo(w - 0.28, h - 0.28, w - r - 0.1, h - 0.28);
    outer.lineTo(-w + r + 0.1, h - 0.28);
    outer.quadraticCurveTo(-w + 0.28, h - 0.28, -w + 0.28, h - r - 0.1);
    outer.lineTo(-w + 0.28, 0);
    outer.closePath();
    const g = new THREE.ExtrudeGeometry(outer, { depth: 0.4, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 });
    g.translate(0, 0, -0.2);
    g.rotateY(Math.PI / 2);
    return g;
  }, []);
}

const scanVertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const scanFragment = /* glsl */ `
  uniform vec3 uColor; uniform float uTime;
  varying vec2 vUv;
  void main() {
    float lines = step(0.5, fract(vUv.y * 40.0 - uTime * 2.0)) * 0.35;
    float sweep = smoothstep(0.08, 0.0, abs(fract(uTime * 0.35) - vUv.y));
    float edge = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
    float a = (0.12 + lines * 0.25 + sweep) * edge;
    gl_FragColor = vec4(uColor * (1.0 + sweep * 3.0), a);
  }
`;

function Scanner({ color }) {
  const mat = useRef();
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color(color) }, uTime: { value: 0 } }), [color]);
  useFrame(() => { if (mat.current) mat.current.uniforms.uTime.value = factory.t; });
  return (
    <mesh position={[0, 1.7, 0]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[2.0, 2.0]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={scanVertex}
        fragmentShader={scanFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

// Holographic bilingual station sign.
function HoloSign({ index, station }) {
  const mat = useRef();
  const map = signTexture(String(index + 1).padStart(2, '0'), station.label, station.jp, station.color);
  useFrame(({ clock }) => {
    if (!mat.current) return;
    const flicker = Math.sin(clock.elapsedTime * 40 + index) > 0.97 ? 0.5 : 1;
    mat.current.opacity = factory.power * flicker;
  });
  return (
    <mesh position={[1.4, 4.3, -2.6]} rotation={[-0.08, -0.2, 0]}>
      <planeGeometry args={[3.2, 1]} />
      <meshBasicMaterial ref={mat} map={map} color={[2.2, 2.2, 2.2]} transparent toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

export default function Station({ x, station, index, low }) {
  const portal = usePortal();
  const glow = useMemo(() => new THREE.Color(station.color).multiplyScalar(5), [station.color]);
  const hz = useMemo(() => {
    const t = hazardTexture().clone();
    t.repeat.set(1, 1);
    t.needsUpdate = true;
    return t;
  }, []);
  const Machine = MACHINES[station.id];

  return (
    <group position={[x, 0, 0]}>
      <mesh geometry={portal} castShadow receiveShadow>
        <meshStandardMaterial color="#2b3240" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* glowing inner trim */}
      <mesh position={[0, 2.75, 0]}>
        <boxGeometry args={[0.44, 0.04, 2.4]} />
        <meshBasicMaterial color={glow} toneMapped={false} />
      </mesh>
      {[-1.48, 1.48].map((z) => (
        <mesh key={z} position={[0, 0.25, z]}>
          <boxGeometry args={[0.42, 0.5, 0.3]} />
          <meshStandardMaterial map={hz} />
        </mesh>
      ))}
      <Scanner color={station.color} />
      <HoloSign index={index} station={station} />
      <pointLight position={[0, 2.2, 0.6]} color={station.color} intensity={5} distance={6} decay={1.6} />
      {Machine && <Machine color={station.color} index={index} low={low} x={x} />}
    </group>
  );
}
