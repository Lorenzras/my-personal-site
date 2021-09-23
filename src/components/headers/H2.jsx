import PropTypes from 'prop-types';
import Reveal from '../animations/Reveal';

const H2 = ({ children }) => (
  <Reveal>
    <h2 className="text-2xl text-center font-semibold mb-4 font-serif">
      {children}
    </h2>
  </Reveal>
);

H2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default H2;
