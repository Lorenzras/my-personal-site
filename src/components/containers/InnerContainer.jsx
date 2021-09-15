import PropTypes from 'prop-types';

const InnerContainer = ({ children }) => (
  <div className="md:container md:mx-16 font-sans ">
    {children}
  </div>
);

InnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InnerContainer;
