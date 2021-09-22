import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const variants = {
  visible: {
    opacity: 1,
    transition: {

      duration: 1,
    },
  },
  hidden: { opacity: 0 },

};

const TitleMini = ({ children }) => (
  <motion.div
    variants={variants}
    className="text-yellow-600 font-semibold text-sm tracking-wider text-center mb-2"
  >
    {children}
  </motion.div>
);

TitleMini.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleMini;
