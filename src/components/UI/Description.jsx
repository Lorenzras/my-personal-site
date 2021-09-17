import PropTypes from 'prop-types';

const Description = ({ maxWidth, children }) => (
  <div className={`text-base mx-auto text-green-800 text-center max-w-${maxWidth}`}>
    <p>
      {children}
    </p>

  </div>
);

Description.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
};

Description.defaultProps = {
  maxWidth: 'none',
};

export default Description;
