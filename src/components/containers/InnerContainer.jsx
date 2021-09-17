import PropTypes from 'prop-types';

const InnerContainer = ({ id, children }) => (
  <div id={id} className="mt-24 max-w-5xl mx-auto">
    {children}
  </div>
);

InnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default InnerContainer;
