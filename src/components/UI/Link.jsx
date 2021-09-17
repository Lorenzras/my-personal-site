import PropTypes from 'prop-types';

const Link = ({ href, children }) => (
  <div className="text-gray-800">
    <a
      href={href}
      className="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </a>
  </div>
);

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
