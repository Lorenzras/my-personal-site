'use client';

import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor, Scroll, ScrollControls, Sparkles } from '@react-three/drei';
import { stations } from '@/content/site';
import Lighting from './scene/Lighting';
import Effects from './scene/Effects';
import Hall from './scene/Hall';
import Conveyor from './scene/Conveyor';
import WorkItems from './scene/WorkItems';
import Station from './scene/Station';
import Showroom from './scene/Showroom';
import Mascot from './scene/Mascot';
import CameraRig from './scene/CameraRig';
import { Intake, Dock } from './scene/Ends';
import { cameraKeys, stationX, SHOWROOM_X } from './scene/layout';
import { isLowTier } from './scene/store';
import Overlay from './Overlay';
import ProjectModal from './ProjectModal';
import SpeedControl from './SpeedControl';

export default function Factory() {
  const [selected, setSelected] = useState(null);
  const [low, setLow] = useState(() => isLowTier());
  const dpr = useMemo(() => (low ? [1, 1.25] : [1, 1.5]), [low]);

  return (
    <>
      <Canvas
        flat
        shadows
        dpr={dpr}
        camera={{ position: [7, 5, 11], fov: 42 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        className="canvas"
      >
        <PerformanceMonitor onDecline={() => setLow(true)} />
        <color attach="background" args={['#07090f']} />
        <fog attach="fog" args={['#07090f', 18, 48]} />
        <Lighting low={low} />

        <ScrollControls pages={cameraKeys.length} damping={0.2}>
          <CameraRig />
          <Hall low={low} />
          <Intake />
          <Mascot position={[1.6, 0, 2.1]} rotation={[0, -0.3, 0]} />
          <Conveyor />
          <WorkItems />
          {stations.map((s, i) => (
            <Station key={s.id} x={stationX(i)} station={s} index={i} low={low} />
          ))}
          <Showroom onSelect={setSelected} />
          <Dock />
          <Sparkles count={low ? 40 : 80} scale={[SHOWROOM_X + 30, 6, 14]} position={[SHOWROOM_X / 2, 3, -2]} size={1.5} speed={0.25} color="#cbd5e1" opacity={0.25} />
          <Scroll html style={{ width: '100%' }}>
            <Overlay onSelect={setSelected} />
          </Scroll>
        </ScrollControls>
        <Effects low={low} />
        <AdaptiveDpr />
      </Canvas>
      <SpeedControl />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
