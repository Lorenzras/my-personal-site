import PropTypes from 'prop-types';
import Reveal from '../animations/Reveal';

const H1 = ({ children }) => (
  <Reveal>
    <h1 className="text-4xl text-center font-semibold mb-4 font-serif">
      {children}
    </h1>
  </Reveal>
);

H1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default H1;
