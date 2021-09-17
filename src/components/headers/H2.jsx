import PropTypes from 'prop-types';

const H2 = ({ children }) => (
  <h2 className="text-2xl text-center font-semibold mb-4 font-serif">
    {children}
  </h2>
);

H2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default H2;
