import { stations, projects } from '@/content/site';

// World layout along the conveyor (x axis).
export const STATION_GAP = 8;
export const stationX = (i) => (i + 1) * STATION_GAP;
export const SHOWROOM_X = stationX(stations.length) + 11;
export const DOCK_X = SHOWROOM_X + 13;
export const BELT_START = -6;
export const BELT_END = DOCK_X + 2;

export const showroomSlots = projects.map((_, i) => {
  const cols = 3;
  const col = i % cols;
  const row = Math.floor(i / cols);
  return [SHOWROOM_X + (col - 1) * 3.2, 0, -3.2 - row * 3.2];
});

// One camera keyframe per scroll page: [target x, camera offset].
const near = [7, 6.5, 10];
export const cameraKeys = [
  { x: 0, offset: [9, 7, 13] },
  ...stations.map((_, i) => ({ x: stationX(i), offset: near })),
  { x: SHOWROOM_X + 3.5, offset: [-1, 9, 10], targetZ: -4.5 },
  { x: DOCK_X, offset: [8, 6, 11] },
];
