import PropTypes from 'prop-types';
import ZoomIn from '../animations/ZoomIn';

const InnerContainer = ({ id, children }) => (
  <div
    id={id}
    className="lazy-div mt-24 max-w-5xl mx-auto"
  >
    <ZoomIn>
      {children}
    </ZoomIn>
  </div>
);

InnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default InnerContainer;
