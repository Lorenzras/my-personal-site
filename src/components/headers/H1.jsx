import PropTypes from 'prop-types';

const H1 = ({ children }) => (
  <h1 className="text-4xl text-center font-semibold mb-7 font-serif">
    {children}
  </h1>
);

H1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default H1;
