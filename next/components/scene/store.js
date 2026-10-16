// Shared, mutable factory state read inside useFrame (no re-renders).
export const factory = {
  speed: 1, // belt speed multiplier, set from the overlay
  t: 0, // factory time, advances at `speed`
  power: 0, // 0 → 1 during the power-up intro
};

// Phones, small screens and `?quality=low` get the lighter render path.
export const isLowTier = () => {
  if (typeof window === 'undefined') return false;
  const q = new URLSearchParams(window.location.search).get('quality');
  if (q) return q === 'low';
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
};
