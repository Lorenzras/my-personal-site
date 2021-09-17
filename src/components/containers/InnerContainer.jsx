import PropTypes from 'prop-types';

const InnerContainer = ({ children }) => (
  <div className="mt-24 max-w-5xl mx-auto">
    {children}
  </div>
);

InnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InnerContainer;
