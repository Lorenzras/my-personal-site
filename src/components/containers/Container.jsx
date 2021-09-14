import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="md:container md:mx-auto font-sans">
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
