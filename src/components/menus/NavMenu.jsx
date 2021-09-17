import { Link } from 'react-scroll';
import links from '../../utils/links';
// import Link from '../UI/Link';

const NavMenu = ({ menuType, onClose }) => links().map(
  ({ url, text }) => (
    <div
      key={menuType + url}
      className="flex justify-end"
    >
      <Link
        activeClass="active"
        className="hover:bg-gray-600 hover:text-white hover:shadow-lg font-bold py-2 px-4 rounded-lg cursor-pointer transition ease-in duration-200"
        to={url}
        spy
        smooth
        offset={-250}
        duration={500}
        onClick={onClose}
      >
        {text}
      </Link>
    </div>
  ),
);

export default NavMenu;
