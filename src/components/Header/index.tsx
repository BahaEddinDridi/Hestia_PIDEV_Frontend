import { Link } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import SearchBar from './seachbar';
import Logo_PIDEV from '../../images/logo/Logo_PIDEV.png';
import { useState, useEffect } from 'react';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {


  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          {/* <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>*/}
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />

          </Link>
        </div>
        <Link to="/Profile/offer">
        <img src={Logo_PIDEV} className='w-20 h-10' />
        </Link>
        <SearchBar />

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-3 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Dark Mode Toggler --> */}
            <li className="relative">
              <Link
                to="/home"  // Assurez-vous d'ajuster le chemin vers votre page d'accueil
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
              >
                <svg
                  className="fill-current duration-300 ease-in-out"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1.54297L1 9.54297L2.41421 10.9572L9 4.37148L15.5858 10.9572L17 9.54297L9 1.54297ZM3 11.5429V16.5429C3 16.768 3.10536 16.9796 3.29289 17.2071C3.48043 17.4346 3.73886 17.5429 4 17.5429H5V12.5429C5 12.2365 5.17555 11.9426 5.46447 11.7573L9 8.77148L12.5355 11.7573C12.8245 11.9426 13 12.2365 13 12.5429V17.5429H14C14.2611 17.5429 14.5196 17.4346 14.7071 17.2071C14.8946 16.9796 15 16.768 15 16.5429V11.5429L9 5.14297L3 11.5429Z"
                    fill=""
                  />
                </svg>
              </Link>
            </li>

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}


            {/* <!-- User Area --> */}
            <DropdownUser />
            {/* <!-- User Area --> */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
