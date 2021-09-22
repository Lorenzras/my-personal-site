/* eslint-disable no-param-reassign */
import { motion, useAnimation } from 'framer-motion';

import { useInView } from 'react-intersection-observer';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const reveal = {
  hidden: {
    x: 50,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    x: 0,
    transition: {
      duration: 3,
    },
  },
};

export const reveal2 = {
  hidden: {
    opacity: 0.5,
    x: -50,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
    },
  },
};

export const reveal3 = {
  hidden: {
    opacity: 0.5,
    y: 50,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
    },
  },
};

const Reveal = ({ children, variants }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ trackVisibility: true, delay: 100 });
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    if (!inView) {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  variants: PropTypes.object,
};

Reveal.defaultProps = {
  variants: reveal,
};

export default Reveal;
