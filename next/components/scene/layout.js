import { stations, projects } from '@/content/site';

// World layout along the conveyor (x axis).
export const STATION_GAP = 9;
export const stationX = (i) => (i + 1) * STATION_GAP;
export const LAST_STATION_X = stationX(stations.length - 1);
export const SHOWROOM_X = LAST_STATION_X + 13;
export const DOCK_X = SHOWROOM_X + 13;
export const BELT_START = -6;
export const BELT_END = DOCK_X;
export const BELT_LENGTH = BELT_END - BELT_START;

export const showroomSlots = projects.map((_, i) => {
  const cols = 3;
  const col = i % cols;
  const row = Math.floor(i / cols);
  return [SHOWROOM_X + (col - 1) * 3.4, 0, -3.6 - row * 3.4];
});

// One camera keyframe per scroll page.
const near = [6, 4.6, 9.5];
export const cameraKeys = [
  { x: 0.5, offset: [6.5, 3.6, 10], y: 1.3 },
  ...stations.map((_, i) => ({ x: stationX(i) + 0.8, offset: near, y: 1.4 })),
  { x: SHOWROOM_X + 3.5, offset: [-1, 8, 10], targetZ: -4.6, y: 0.8 },
  { x: DOCK_X, offset: [-4.5, 4, 10], y: 1.8 },
];
