import PropTypes from 'prop-types';

const B = ({ children }) => <span className="text-xl font-black">{children}</span>;

B.propTypes = {
  children: PropTypes.node.isRequired,
};

export default B;
