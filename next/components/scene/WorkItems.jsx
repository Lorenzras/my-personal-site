'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { browserTexture, formTexture, paperTexture, parcelTexture } from './textures';
import { BELT_START, BELT_LENGTH, stationX } from './layout';
import { BELT_SPEED } from './Conveyor';
import { factory } from './store';

const COUNT = 30;
const TOP = 0.68;

// The work item changes form at each station, so you can follow one task
// down the line: paper → stamped form → data orb → API capsule → UI → parcel.
const FORMS = [
  { id: 'paper', until: stationX(0) },
  { id: 'form', until: stationX(1) },
  { id: 'orb', until: stationX(2) },
  { id: 'capsule', until: stationX(3) },
  { id: 'window', until: stationX(4) },
  { id: 'parcel', until: Infinity },
];

function useForms() {
  return useMemo(() => {
    const paper = new THREE.BoxGeometry(0.72, 0.02, 0.52);
    const form = new RoundedBoxGeometry(0.72, 0.07, 0.52, 2, 0.025);
    const orb = new THREE.IcosahedronGeometry(0.2, 1);
    const capsule = new THREE.CylinderGeometry(0.24, 0.24, 0.56, 6);
    capsule.rotateZ(Math.PI / 2);
    const win = new RoundedBoxGeometry(0.8, 0.56, 0.05, 2, 0.02);
    const parcel = new RoundedBoxGeometry(0.62, 0.46, 0.62, 3, 0.05);
    return {
      paper: [paper, new THREE.MeshStandardMaterial({ map: paperTexture(), roughness: 0.9 })],
      form: [form, new THREE.MeshStandardMaterial({ map: formTexture(), roughness: 0.5 })],
      orb: [orb, new THREE.MeshStandardMaterial({ color: '#f472b6', emissive: '#f472b6', emissiveIntensity: 3, toneMapped: false, flatShading: true })],
      capsule: [capsule, new THREE.MeshStandardMaterial({ color: '#7c6ae6', emissive: '#a78bfa', emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.25, flatShading: true })],
      window: [win, new THREE.MeshStandardMaterial({ map: browserTexture(), emissiveMap: browserTexture(), emissive: '#ffffff', emissiveIntensity: 1.2, roughness: 0.3 })],
      parcel: [parcel, new THREE.MeshStandardMaterial({ map: parcelTexture(), roughness: 0.75 })],
    };
  }, []);
}

export const ITEM_SPACING = BELT_LENGTH / COUNT;

// 0..1 phase of the item stream at world x; 0 means an item is right there.
export function itemPhase(xWorld) {
  const p = (xWorld - BELT_START - factory.t * BELT_SPEED) / ITEM_SPACING;
  return p - Math.floor(p);
}

const dummy = new THREE.Object3D();
const hidden = new THREE.Matrix4().makeScale(0, 0, 0);

export default function WorkItems() {
  const forms = useForms();
  const refs = useRef({});
  const seeds = useMemo(() => Array.from({ length: COUNT }, () => Math.random()), []);

  useFrame(() => {
    const t = factory.t * BELT_SPEED;
    const counts = {};
    FORMS.forEach((f) => { counts[f.id] = 0; });

    for (let i = 0; i < COUNT; i += 1) {
      const s = seeds[i];
      const x = BELT_START + (((i / COUNT) * BELT_LENGTH + t) % BELT_LENGTH);
      const form = FORMS.find((f) => x < f.until).id;
      // lift as it passes under each station
      let lift = 0;
      for (let k = 0; k < 5; k += 1) {
        const d = x - stationX(k);
        if (d > -0.6 && d < 0.6) lift = Math.cos((d / 0.6) * (Math.PI / 2)) * 0.25;
      }
      // fade in at the start and out at the end
      const edge = Math.min(1, (x - BELT_START) / 1.2, (BELT_START + BELT_LENGTH - x) / 1.2);
      const sc = Math.max(0, edge);
      const wob = Math.sin(factory.t * 3 + s * 10) * 0.02;
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(sc);
      switch (form) {
        case 'paper':
          dummy.position.set(x, TOP + 0.03 + lift, (s - 0.5) * 0.3);
          dummy.rotation.set(wob * 3 + (s - 0.5) * 0.15, (s - 0.5) * 0.9, (s - 0.5) * 0.12);
          break;
        case 'form':
          dummy.position.set(x, TOP + 0.05 + lift, 0);
          dummy.rotation.set(0, wob, 0);
          break;
        case 'orb':
          dummy.position.set(x, TOP + 0.35 + lift + Math.sin(factory.t * 4 + s * 6) * 0.06, 0);
          dummy.rotation.set(factory.t + s, factory.t * 1.3, 0);
          break;
        case 'capsule':
          dummy.position.set(x, TOP + 0.25 + lift, 0);
          dummy.rotation.set(factory.t * 2 + s * 6, 0, 0);
          break;
        case 'window':
          dummy.position.set(x, TOP + 0.33 + lift, 0);
          dummy.rotation.set(0, -0.35 + wob, 0);
          break;
        default:
          dummy.position.set(x, TOP + 0.23 + lift, 0);
          dummy.rotation.set(0, wob, 0);
      }
      dummy.updateMatrix();
      const mesh = refs.current[form];
      if (mesh) {
        mesh.setMatrixAt(counts[form], dummy.matrix);
        counts[form] += 1;
      }
    }
    FORMS.forEach((f) => {
      const mesh = refs.current[f.id];
      if (!mesh) return;
      for (let j = counts[f.id]; j < COUNT; j += 1) mesh.setMatrixAt(j, hidden);
      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return FORMS.map((f) => (
    <instancedMesh
      key={f.id}
      ref={(el) => { refs.current[f.id] = el; }}
      args={[forms[f.id][0], forms[f.id][1], COUNT]}
      castShadow
      frustumCulled={false}
    />
  ));
}
