import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="mx-2 md:mx-16">
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
