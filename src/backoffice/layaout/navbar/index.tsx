import { Link,useNavigate } from 'react-router-dom';
import DropdownMessage from '../../../components/Header/DropdownMessage';
import DropdownNotification from '../../../components/Header/DropdownNotification';
import DropdownUser from './DropDownAdmin';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from '../../../components/Header/DarkModeSwitcher';
import SearchBar from '../../../components/Header/seachbar';
import { useSendLogoutMutation } from '../../../ApiSlices/authApiSlice';
import { useState, useEffect } from 'react';


const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [sendLogout, { isLoading }] = useSendLogoutMutation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // @ts-ignore
      await sendLogout();
      console.log('Logout successful');
      navigate('/auth/signin');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
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
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            {/* <img src={LogoIcon} alt="Logo" /> */}
            
          </Link>
        </div>

        {/* <SearchBar/> */}


        <div className="flex items-center gap-3 2xsm:gap-7 ml-[750px]">

       
          <ul className="flex items-center gap-2 2xsm:gap-4 ">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
            <li>
              <button
                className="group flex items-center justify-start w-9 h-9 bg-red-600 rounded-full
                 cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-26
                 hover:rounded-xxl active:translate-x-1 active:translate-y-1"
                onClick={() => setShowConfirmation(true)}
              >
                <div
                  className="flex items-center justify-center w-full transition-all duration-300
                  group-hover:justify-start group-hover:px-3"
                >
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path
                      d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9
                      406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                    ></path>
                  </svg>
                </div>
                <div
                  className="absolute right-5 transform translate-x-full opacity-0 text-white text-sm font-semibold
                  transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  Logout
                </div>
              </button>

            </li>
         
          {showConfirmation && (
            <div className="fixed inset-80 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="bg-white p-6 rounded-md shadow-md">
                <p>Are you sure you want to log out?</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="px-4 py-2 mr-2 text-gray-600 hover:text-gray-900 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
         
          </ul>
          
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
          </div>
      </div>
    </header>
  );
};

export default Header;
