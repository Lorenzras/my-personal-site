import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="md:mx-16">
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
