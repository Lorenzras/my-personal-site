'use client';

import withMotion from './withMotion';
import { Process } from '../Sections';

// One file per island so each loads only its own code.
export default withMotion(Process);
