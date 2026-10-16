'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Scroll, ScrollControls, Sparkles } from '@react-three/drei';
import { stations } from '@/content/site';
import Conveyor from './scene/Conveyor';
import Crates from './scene/Crates';
import Station from './scene/Station';
import Showroom from './scene/Showroom';
import CameraRig from './scene/CameraRig';
import { Intake, Dock } from './scene/Ends';
import { cameraKeys, stationX, SHOWROOM_X } from './scene/layout';
import Overlay from './Overlay';
import ProjectModal from './ProjectModal';

export default function Factory() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [9, 7, 13], fov: 45 }}
        gl={{ antialias: true }}
        className="canvas"
      >
        <color attach="background" args={['#0a0c12']} />
        <fog attach="fog" args={['#0a0c12', 22, 55]} />
        <ambientLight intensity={0.6} />
        <hemisphereLight args={['#9fb4ff', '#1a1208', 0.9]} />
        <directionalLight
          position={[10, 14, 8]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-40}
          shadow-camera-right={80}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        <ScrollControls pages={cameraKeys.length} damping={0.2}>
          <CameraRig />
          <Intake />
          <Conveyor />
          <Crates />
          {stations.map((s, i) => (
            <Station key={s.id} x={stationX(i)} color={s.color} index={i} />
          ))}
          <Showroom onSelect={setSelected} />
          <Dock />
          <Sparkles count={120} scale={[SHOWROOM_X + 20, 6, 14]} position={[SHOWROOM_X / 2, 3, -2]} size={2} speed={0.3} color="#fbbf24" opacity={0.4} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[400, 400]} />
            <meshStandardMaterial color="#141824" roughness={0.9} />
          </mesh>
          <gridHelper args={[400, 200, '#26304a', '#1b2233']} position={[0, 0.002, 0]} />
          <Scroll html style={{ width: '100%' }}>
            <Overlay onSelect={setSelected} />
          </Scroll>
        </ScrollControls>
        <AdaptiveDpr pixelated />
      </Canvas>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
