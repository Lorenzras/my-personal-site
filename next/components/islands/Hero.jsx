'use client';

import withMotion from './withMotion';
import Hero from '../Hero';

// One file per island so each loads only its own code.
export default withMotion(Hero);
