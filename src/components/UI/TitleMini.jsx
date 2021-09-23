import PropTypes from 'prop-types';
import Reveal, { reveal2 } from '../animations/Reveal';

const TitleMini = ({ children }) => (
  <Reveal variants={reveal2}>
    <div
      className="text-yellow-600 font-semibold text-sm tracking-wider text-center mb-2"
    >
      {children}
    </div>
  </Reveal>
);

TitleMini.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleMini;
