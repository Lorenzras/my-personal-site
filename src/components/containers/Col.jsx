import PropTypes from 'prop-types';

const Col = ({ children }) => (
  <div className="flex flex-col ">
    {children}
  </div>
);

Col.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Col;
