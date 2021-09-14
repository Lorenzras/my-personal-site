import links from '../../utils/links';
import Link from '../UI/Link';

const NavMenu = () => links().map(({ url, text }) => <Link key={text} href={url}>{text}</Link>);

export default NavMenu;
