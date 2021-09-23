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
    mx-auto
    px-1
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
