import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InternshipOfferCard = ({internship}) => {
  const navigate = useNavigate();
  const [daysAgo, setDaysAgo] = useState('');


  const {
    interTitle,
    interPost,
    interfield,
    interImage,
    interLocation,
    interCommpanyName,
    interRequiredEducation,
    interStartDate,
    interApplicationDeadline
  } = internship;

  const isInternshipExpired = () => {
    const today = new Date();
    const deadlineDate = new Date(interApplicationDeadline);
    return today > deadlineDate;
  };
  useEffect(() => {
    const today = new Date();
    const postedDate = new Date(interStartDate);
    const differenceInTime = today.getTime() - postedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    setDaysAgo(`${differenceInDays} days ago`);
  }, [interStartDate]);
  const handleApplyNow = () => {
    navigate(`/Offers/Internships/${internship._id}`);
  };
  return (
    <div
      className="block rounded-lg bg-white text-surface shadow-secondary-1 shadow-md
      dark:bg-surface-dark dark:text-white"
      style={{
        background: "url('src/images/cards/internshipCard.png')",
        backgroundSize: 'cover',
      }}
    >
      <div className="rounded-t-lg font-bold text-white text-xl border-neutral-100 p-6">
        <div className="grid grid-cols-2 gap-4">
          {/* First grid container for logo and company name */}
          <div className="flex items-center bg-gradient-to-r from-white space-x-2 text-xs h-12 font-bold leading-none
            uppercase p-1.5  shadow-md rounded-full">
            <img
              src={interImage}
              alt="Company Logo"
              className="w-10 h-10 rounded-full shadow-md object-cover"
            />
            <span className="text-xl font-medium text-black">{interCommpanyName}</span>
          </div>
        </div>
      </div>


      <div className="p-4 sm:p-6 "
      >
        <h5 className="mb-2 text-xl text-center font-medium leading-tight">{interTitle}</h5>
        <p className="mb-4 text-center text-xl ">
          {interPost}
        </p>
        <div className="flex-wrap flex  space-y-2 items-end space-x-2 mb-5">
          <span
            className="text-xs inline-flex items-center font-bold h-8
            leading-none uppercase px-3 py-1 bg-gradient-to-r from-[#c1c1c1] text-black shadow-md  rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>

            {interRequiredEducation}</span>

          <span
            className="text-xs inline-flex items-center shadow-md text-center font-bold leading-none h-8
            uppercase px-3 py-1 bg-gradient-to-r from-[#c1c1c1] text-black rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>

            {interfield}</span>
          <span
            className="text-xs inline-flex items-center shadow-md font-bold h-8
            leading-none uppercase px-3 py-1 bg-gradient-to-r from-[#c1c1c1] text-black rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {interLocation}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <div
              className="rounded-b-lg text-[#5d58ce] text-lg font-bold text-center
              text-surface/75 dark:border-white/10 dark:text-neutral-300">
              {daysAgo}
            </div>
          </div>
          <div className={`flex items-center justify-end ${isInternshipExpired() ? 'opacity-60 pointer-events-none' : ''}`}>
            {/* Button container */}
            <button
              type="button"
              className={`w-30 bg-black h-12 flex items-center justify-center 
      rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out 
      shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full 
      before:w-full before:h-full before:bg-gradient-to-r before:from-[#5d58ce] before:to-[#7176ee] 
      before:transition-all before:duration-500 
      before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 text-[#fff] 
      ${isInternshipExpired() ? 'bg-gray-600' : ''}`}
              onClick={handleApplyNow}
              disabled={isInternshipExpired()}
            >
              {isInternshipExpired() ? 'Expired' : 'Apply Now'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InternshipOfferCard;
