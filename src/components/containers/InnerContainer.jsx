import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';

const InnerContainer = ({ id, children }) => {
  const controls = useAnimation();
  const rootRef = useRef();
  const onScreen = useOnScreen(rootRef);
  useEffect(() => {
    if (onScreen) {
      controls.start({
        y: 0,
        opacity: 1,
        zoom: 1.2,
        transition: {
          duration: 1,
          ease: 'easeOut',
        },
      });
    }
  }, [controls, onScreen]);
  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      id={id}
      className="lazy-div mt-24 max-w-5xl mx-auto"
    >
      {children}
    </motion.div>
  );
};

InnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default InnerContainer;
