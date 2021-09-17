import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import NavMenu from '../menus/NavMenu';

const NavMobile = ({ isOpen }) => (
  <Transition
    show={isOpen}
    enter="transition ease-out duration-100 transform"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="transition ease-in duration-75 transform"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
  >
    <div className="md:hidden" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavMenu menuType="mobile" />
      </div>
    </div>
  </Transition>
);

NavMobile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default NavMobile;
