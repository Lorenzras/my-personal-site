import PropTypes from 'prop-types';

const TitleMini = ({ children }) => (
  <div className="text-yellow-600 font-semibold text-sm tracking-wider text-center mb-2">
    {children}
  </div>
);

TitleMini.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleMini;
