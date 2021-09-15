import PropTypes from 'prop-types';

const Row = ({ children }) => (
  <div className="flex flex-col">
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Row;
