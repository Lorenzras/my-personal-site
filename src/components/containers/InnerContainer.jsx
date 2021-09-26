import PropTypes from 'prop-types';

const InnerContainer = ({ id, children }) => (
  <div
    id={id}
    className="
    flex
    flex-wrap
    content-center
    justify-center
    my-36
    px-1
    mx-2 md:mx-24
    "
  >

    {children}

  </div>
);

InnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default InnerContainer;
