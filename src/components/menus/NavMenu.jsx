import links from '../../utils/links';
import Link from '../UI/Link';

const NavMenu = ({ menuType }) => links().map(
  ({ url, text }) => <Link key={text + menuType} href={url}>{text}</Link>,
);

export default NavMenu;
