import PropTypes from 'prop-types';

const TextTyped = ({ children }) => (
  <span>
    {children}
  </span>
);

TextTyped.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TextTyped;
