import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="overflow-x-hidden">
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
