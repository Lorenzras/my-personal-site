'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { factory } from './store';

// Procedural studio environment (no HDR download) plus one shadow light
// that follows the camera so shadows stay sharp.
export default function Lighting({ low }) {
  const sun = useRef();
  const hemi = useRef();

  useFrame(() => {
    const x = factory.focusX ?? 0;
    const p = factory.power;
    if (sun.current) {
      sun.current.position.set(x + 6, 12, 8);
      sun.current.target.position.set(x, 0, 0);
      sun.current.target.updateMatrixWorld();
      sun.current.intensity = 1.8 * p;
    }
    if (hemi.current) hemi.current.intensity = 0.45 * p;
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={['#b8c6ff', '#20160a', 0.25]} />
      <directionalLight
        ref={sun}
        color="#c8d4ff"
        castShadow
        shadow-mapSize={low ? [512, 512] : [1024, 1024]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0004}
      />
      <Environment frames={1} resolution={256} environmentIntensity={1.1}>
        <color attach="background" args={['#05060a']} />
        <Lightformer form="rect" intensity={4} color="#dfe8ff" scale={[40, 2, 1]} position={[0, 12, 0]} rotation-x={Math.PI / 2} />
        {[-15, 0, 15].map((x) => (
          <Lightformer key={x} form="rect" intensity={1.5} color="#cfd8ff" scale={[2, 20, 1]} position={[x, 4, -12]} />
        ))}
        <Lightformer form="ring" color="#fbbf24" intensity={2} scale={6} position={[-10, 4, 10]} />
        <Lightformer form="circle" color="#38bdf8" intensity={1} scale={8} position={[10, 3, 14]} />
      </Environment>
    </>
  );
}
