import React, { useState } from 'react';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import DarkModeSwitcher from './DarkModeSwitcher';
import Logo_PIDEV from '../../images/logo/Logo_PIDEV.png';
import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';
const HomeNavBar = ({signUpRef}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  let Links =[
    {name:t('HOME'),link:"/"},
    {name:t('ABOUT US'),link:"/AboutUs"},
    {name:t('CONTACT US'),link:"/"},
  ];
  // let Links =[
  //   {name:"HOME",link:"/"},
  //   {name:"ABOUT US",link:"/AboutUs"},
  //   {name:"CONTACT US",link:"/"},
  // ];
  let [open, setOpen] =useState(false);

  const handleSignInClick = () => {
    navigate('/auth/signin')
  };
  const handleSignUpClick = () => {
    // Scroll to the SignUpCard section
    signUpRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className='shadow-md w-full fixed top-0 left-0 '>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7
      dark:bg-black'>
        {/* logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <img className=" h-18 w-auto" src={Logo_PIDEV} alt="Logo" />
        </div>
        {/* Menu icon */}
        <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
          {
            open ? <XMarkIcon/> : <Bars3BottomRightIcon />
          }
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white dark:bg-black md:z-auto z-[-1] left-0 w-full 
          md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
          {
            Links.map((link) => (
              <li className='md:ml-10 md:my-0 my-7 font-semibold'>
                <a href={link.link} className='text-gray-800 hover:text-red-800 duration-500'>{link.name}</a>
              </li>))
          }
          <button type="button"
                  onClick={handleSignUpClick}
                  className="text-white md:ml-8 bg-gradient-to-r from-red-900 via-red-700 to-red-500 hover:bg-gradient-to-br
              focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg
              dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2
              dark:from-cyan-950 dark:via-cyan-700 dark:to-cyan-500">
            {t('Sign Up')}
          </button>
          <button type="button"
                  onClick={handleSignInClick}
                  className="text-white bg-gradient-to-r from-red-900 via-red-700 to-red-500 hover:bg-gradient-to-br
              focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg
              dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2
              dark:from-cyan-950 dark:via-cyan-700 dark:to-cyan-500">
            {t('Sign In')}
          </button>
          <DarkModeSwitcher/>

        </ul>
      </div>
    </div>
  );
};

export default HomeNavBar;