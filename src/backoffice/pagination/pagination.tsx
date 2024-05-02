import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalUsers: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, totalUsers }) => {
    const usersPerPage = 4;
    const totalPages = Math.ceil(totalUsers / usersPerPage);
  
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <a
            href="#"
            className={`flex items-center justify-center px-3 py-2 text-sm leading-tight ${
              i === currentPage ? 'border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' :
              'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    // useEffect(() => {
    //   fetch(`http://192.168.33.10:3001/dashboard/count`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setTotalUsers(data.count);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }, []);
    return (
    <section className="flex items-center bg-gray-50 dark:bg-strokedark">
        <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
          {/* <!-- Start coding here --> */}
          <div className="relative overflow-hidden bg-white rounded-b-lg shadow-md dark:bg-strokedark">
            <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0 dark:bg-strokedark"
                aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
                  className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * 4 + 1}-{(currentPage - 1) * 4 + 4}</span> of {' '}<span
                  className="font-semibold text-gray-900 dark:text-white">{totalUsers}</span></span>
              <ul className="inline-flex items-stretch -space-x-px dark:bg-strokedark">
                <li>
                  <a href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-strokedark dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}>
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-strokedark dark:border-strokedark dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{pages}</a>
                </li>
                
                <li>
                  <a href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-strokedark dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => {
                        const nextPage = currentPage + 1;
                        if (nextPage <= totalPages) {
                          setCurrentPage(nextPage);
                        }
                      }}>
                    <span className="sr-only">Next</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

);
};

export default Pagination;

