import PropTypes from 'prop-types';

const InnerContainer = ({ id, children }) => (
  <div
    id={id}
    className="
    flex
    flex-wrap
    content-center
    justify-center
    my-40 sm:my-36 md:my-32 lg:my-28
    max-w-5xl
    mx-auto
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
