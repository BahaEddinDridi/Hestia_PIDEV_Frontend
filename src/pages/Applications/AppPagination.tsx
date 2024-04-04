import React from 'react';

const AppPagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination flex items-center  justify-between">

      <button onClick={handlePrev} disabled={currentPage === 1}
              className="cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Back">
        <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24"
             className="stroke-white mr-4">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5"
                d="M11 6L5 12M5 12L11 18M5 12H19"></path>
        </svg>
      </button>
      <span className="text-lg text-white mr-4">{currentPage}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}
              className="cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Next">
        <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24"
             className="stroke-white ml-4">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" fill="none"
                d="M9 18l6-6-6-6M15 12H3"></path>
        </svg>
      </button>
    </div>
  );
};

export default AppPagination;
