import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';



const BrowsingHeader = ({ activeTab, onTabChange }) => {
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown20pen, setDropdown20pen] = useState(false);
  const [dropdown30pen, setDropdown30pen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown1Open(false);
        setDropdown20pen(false);
        setDropdown30pen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const locations = [
    'Tunis', 'Ariana', 'Ben Arous', 'Mannouba', 'Bizerte', 'Nabeul', 'Béja', 'Jendouba',
    'Zaghouan', 'Siliana', 'Le Kef', 'Sousse', 'Monastir', 'Mahdia', 'Kasserine',
    'Sidi Bouzid', 'Kairouan', 'Gafsa', 'Sfax', 'Gabès', 'Médenine', 'Tozeur', 'Kebili', 'Ttataouine'
  ];
  const toggleDropdown1 = () => {
    setDropdown1Open(!dropdown1Open);
    setDropdown20pen(false);
    setDropdown30pen(false);
  };
  const toggleDropdown2 = () => {
    setDropdown20pen(!dropdown20pen);
    setDropdown1Open(false);
    setDropdown30pen(false);
  };
  const toggleDropdown3 = () => {
    setDropdown30pen(!dropdown30pen);
    setDropdown1Open(false);
    setDropdown20pen(false);
  };


  return (
    <div className="max-w-7xl mx-auto px-4">
      <header className="bg-white shadow-lg rounded-lg items-center">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="relative pr-5">
              <button
                className="overflow-hidden w-24 p-2 h-10 bg-red-800 text-white border-none rounded-md text-sm font-bold cursor-pointer relative z-10 group"
                onClick={onTabChange}
              >
                {activeTab ? (
                  <>
                    Jobs
                    <span
                      className="absolute w-36 h-32 -top-8 -left-2 bg-red-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
                    <span
                      className="absolute w-36 h-32 -top-8 -left-2 bg-red-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
                    <span
                      className="absolute w-36 h-32 -top-8 -left-2 bg-red-800 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
                    <span
                      className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-3 z-10">Internships</span>
                  </>
                ) : (
                  <>
                    Internships
                    <span
                      className="absolute w-36 h-32 -top-8 -left-2 bg-red-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
                    <span
                      className="absolute w-36 h-32 -top-8 -left-2 bg-red-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
                    <span
                      className="absolute w-36 h-32 -top-8 -left-2 bg-red-800 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
                    <span
                      className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-8 z-10">Jobs</span>
                  </>
                )}
              </button>
              <div
                className="h-10 absolute w-full -top-px bg-transparent border-gray-300 border-t-0 rounded-md"></div>
            </div>
            <div className="inline-block mr-4" ref={dropdownRef}>
              <button
                className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={toggleDropdown1}
              >
                Location
              </button>
              {dropdown1Open && (
                <div
                  className="absolute mt-2 w-56 h-36 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    {locations.sort().map((option, index) => (
                      <button key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="inline-block mr-4" ref={dropdownRef}>
              <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                      onClick={toggleDropdown2}>
                Experience Level
              </button>
              {dropdown20pen && (
                <div
                  className="absolute mt-2 w-56 h-36 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</button>
                  </div>
                </div>
              )}
            </div>
            <div className="inline-block mr-4" ref={dropdownRef}>
              <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                      onClick={toggleDropdown3}>
                Industry
              </button>
              {dropdown30pen && (
                <div
                  className="absolute mt-2 w-56 h-36 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</button>
                  </div>
                </div>
              )}
            </div>
            <div className="max-w-lg mx-auto">
              <form className="flex items-center">
                <div className="relative w-150 mr-4">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <input type="text"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Search Offers..." required />
                </div>
                <button
                  className="relative border hover:border-red-600 duration-500 group cursor-pointer text-sky-50 overflow-hidden h-11 w-40 rounded-md bg-red-500 p-2 flex justify-center items-center font-extrabold">
                  <div
                    className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-red-700 delay-150 group-hover:delay-150"></div>
                  <div
                    className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-red-800 delay-150 group-hover:delay-200"></div>
                  <div
                    className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-red-900 delay-150 group-hover:delay-300"></div>
                  <div className="flex items-center"> {/* Added a flex container */}
                    <p className="z-10 flex items-center"> {/* Added flex and items-center to the paragraph */}
                      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                           viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                      Search
                    </p>
                  </div>
                </button>

              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default BrowsingHeader;
