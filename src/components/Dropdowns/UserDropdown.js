import React from 'react';
import { createPopper } from '@popperjs/core';
import { Link } from 'react-router-dom';
import { clearToken } from '../../apollo/helpers/HandleToken';
import UserAvatar from '../../components/_common/Avatar';

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-gray-600 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex ml-3">
          <UserAvatar size="40px" border userAvatar />
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={`${
          dropdownPopoverShow ? 'block ' : 'hidden '
        }bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`}
      >
        <Link
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          to="/settings"
        >
          My Profile
        </Link>
        <div className="h-0 my-2 border border-solid border-gray-200" />
        <a
          href="#pablo"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          onClick={clearToken}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
