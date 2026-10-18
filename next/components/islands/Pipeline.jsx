'use client';

import withMotion from './withMotion';
import Pipeline from '../Pipeline';

// One file per island so each loads only its own code.
export default withMotion(Pipeline);
