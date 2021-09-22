import { motion, useAnimation } from 'framer-motion';

import { useInView } from 'react-intersection-observer';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ZoomIn = ({ children }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    if (!inView) {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const zoomIn = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.5,
        staggerChildre: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={zoomIn}
      className="flex flex-col"
    >
      {children}
    </motion.div>
  );
};

ZoomIn.propTypes = {
  children: PropTypes.node.isRequired,

};

export default ZoomIn;
