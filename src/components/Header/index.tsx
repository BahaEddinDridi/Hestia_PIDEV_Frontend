import { Link, useNavigate } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import SearchBar from './seachbar';
import Logo_PIDEV from '../../images/logo/Logo_PIDEV.png';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../ApiSlices/authSlice';
import { useSendLogoutMutation } from '../../ApiSlices/authApiSlice';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {

  const currentRole=useSelector(selectCurrentRole);
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

        </div>
        <Link to="/">
        <img src={Logo_PIDEV} className='w-26 h-14'  alt="Logo"/>
        </Link>
        <ul className="flex items-center gap-3 2xsm:gap-4">
          <li className="relative">
            <Link to="/Feed">
            <div className="relative"
            >
              <button
                className="group flex justify-center border-[0.5px] border-stroke p-2 rounded-md
                drop-shadow-xl text-gray-2 bg-red-600
                   from-gray-800 to-black font-semibold hover:translate-y-3 hover:rounded-[50%]
                    transition-all duration-500 hover:from-[#331029] hover:to-[#310413] "
              >
                <svg
                  className="fill-current duration-300 ease-in-out"
                  width="24"
                  height="24"
                  viewBox="0 0 18 18"
                  fill="none"

                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1.54297L1 9.54297L2.41421 10.9572L9 4.37148L15.5858 10.9572L17 9.54297L9 1.54297ZM3 11.5429V16.5429C3 16.768 3.10536 16.9796 3.29289 17.2071C3.48043 17.4346 3.73886 17.5429 4 17.5429H5V12.5429C5 12.2365 5.17555 11.9426 5.46447 11.7573L9 8.77148L12.5355 11.7573C12.8245 11.9426 13 12.2365 13 12.5429V17.5429H14C14.2611 17.5429 14.5196 17.4346 14.7071 17.2071C14.8946 16.9796 15 16.768 15 16.5429V11.5429L9 5.14297L3 11.5429Z"
                    fill=""
                  />
                </svg>
                <span
                  className="absolute opacity-0 text-red-900 group-hover:opacity-100 group-hover:text-gray-700
                    group-hover:text-sm group-hover:-translate-y-10 duration-700">Home</span>
              </button>
            </div>
            </Link>
          </li>
          {currentRole === 'jobSeeker' && (
            <li>
              <Link to="/Offers">
                <button
                  className="group flex justify-center border-[0.5px] border-stroke p-2 rounded-md drop-shadow-xl
                  text-gray-2 bg-red-600
                   from-gray-800 to-black font-semibold hover:translate-y-3 hover:rounded-[50%]
                    transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" width="24"
                       height="24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                  <span
                    className="absolute opacity-0 text-red-900 group-hover:opacity-100 group-hover:text-gray-700
                    group-hover:text-sm group-hover:-translate-y-10 duration-700">Offers</span>
                </button>
              </Link>
            </li>
          )}
          {currentRole === 'jobSeeker' && (
            <li>
              <Link to="/Applications">
                <button
                  className="group flex justify-center border-[0.5px] border-stroke p-2 rounded-md drop-shadow-xl
                  text-gray-2 bg-red-600
                   from-gray-800 to-black font-semibold hover:translate-y-3 hover:rounded-[50%]
                    transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" width="24"
                       height="24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                  <span
                    className="absolute opacity-0 text-red-900 group-hover:opacity-100 group-hover:text-gray-700
                    group-hover:text-sm group-hover:-translate-y-10 duration-700">Applications</span>
                </button>
              </Link>
            </li>
          )}
        </ul>
        <SearchBar />

        <div className="flex items-center gap-3 2xsm:gap-7">

          <ul className="flex items-center gap-3 2xsm:gap-4">
          {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Dark Mode Toggler --> */}


            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
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
            {/* <!-- User Area --> */}
            <DropdownUser />
            {/* <!-- User Area --> */}

          </ul>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
