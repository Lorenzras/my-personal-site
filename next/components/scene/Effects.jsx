'use client';

import { EffectComposer, Bloom, ToneMapping, Vignette, SMAA, Noise, N8AO } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

export default function Effects({ low }) {
  if (low) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={0.8} radius={0.6} resolutionScale={0.5} />
        <ToneMapping mode={ToneMappingMode.AGX} />
        <Vignette offset={0.25} darkness={0.7} />
      </EffectComposer>
    );
  }
  return (
    <EffectComposer multisampling={0}>
      <N8AO halfRes aoRadius={1.2} intensity={2.5} distanceFalloff={1} />
      <SMAA />
      <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={0.9} radius={0.7} />
      <ToneMapping mode={ToneMappingMode.AGX} />
      <Vignette offset={0.25} darkness={0.75} />
      <Noise opacity={0.025} premultiply />
    </EffectComposer>
  );
}
