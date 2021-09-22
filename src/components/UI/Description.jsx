import PropTypes from 'prop-types';
import Reveal, { reveal2b } from '../animations/Reveal';

const Description = ({ maxWidth, children }) => (
  <Reveal variants={reveal2b}>
    <div className={`text-base mx-auto text-green-800 text-center max-w-${maxWidth}`}>
      <p>
        {children}
      </p>

    </div>
  </Reveal>
);

Description.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
};

Description.defaultProps = {
  maxWidth: 'none',
};

export default Description;
