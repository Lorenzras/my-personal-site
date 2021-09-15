import PropTypes from 'prop-types';

const InnerContainer = ({ children }) => (
  <div className="mt-12">
    {children}
  </div>
);

InnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InnerContainer;
