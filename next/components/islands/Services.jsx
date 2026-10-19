'use client';

import { domMax } from '../motion';
import withMotion from './withMotion';
import { Services } from '../Sections';

// One file per island so each loads only its own code.
// Uses shared-layout animations (layoutId), so it needs domMax.
export default withMotion(Services, domMax);
