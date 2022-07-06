import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTokenWithExpiry } from '../../apollo/helpers/HandleToken';
import UserAvatar from '../_common/Avatar';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useHistory();

  return (
    <>
      <nav
        style={{ width: 'inherit' }}
        className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            >
              <img
                src="/static/icons/logo-sofiatech.webP"
                width="180px"
                alt=""
              />
              <p style={{ display: 'none' }}>logo</p>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
              name="fa-bars"
            >
              <i className="fas fa-bars" />
            </button>
          </div>
          <div
            className={`lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none${
              navbarOpen ? ' block' : ' hidden'
            }`}
            id="example-navbar-warning"
          >
            {!getTokenWithExpiry() ? (
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="flex items-center">
                  <a
                    className="text-xs font-bold py-2 outline-none focus:outline-none lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    href="#home"
                    style={{ fontSize: 14, marginRight: 16 }}
                  >
                    Home
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-xs font-bold py-2 outline-none focus:outline-none lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    href="#about"
                    style={{ fontSize: 14, marginRight: 16 }}
                  >
                    About us
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-xs font-bold py-2 outline-none focus:outline-none lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    href="#contact"
                    style={{ fontSize: 14, marginRight: 16 }}
                  >
                    Contact
                  </a>
                </li>
                <li className="flex items-center">
                  <button
                    className="text-xs text-blue-400 font-bold px-4 py-2 outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    style={{ fontSize: 14 }}
                    onClick={() => location.push('/sign-up')}
                  >
                    Sign up
                  </button>
                </li>

                <li className="flex items-center">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    style={{ fontSize: 14 }}
                    onClick={() => location.push('/sign-in')}
                  >
                    Sign in
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="flex items-center">
                  <a
                    className="text-xs font-bold py-2 outline-none focus:outline-none lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    href="#home"
                    style={{ fontSize: 14, marginRight: 16 }}
                  >
                    Home
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-xs font-bold py-2 outline-none focus:outline-none lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    href="#about"
                    style={{ fontSize: 14, marginRight: 16 }}
                  >
                    About us
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-xs font-bold mr-3 py-2 outline-none focus:outline-none lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    href="#contact"
                    style={{ fontSize: 14, marginRight: 16 }}
                  >
                    Contact
                  </a>
                  {getTokenWithExpiry() && (
                    <a className="text-gray-600 block" href="/settings">
                      <div className="items-center flex ml-3">
                        <UserAvatar size="40px" userAvatar />
                      </div>
                    </a>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
