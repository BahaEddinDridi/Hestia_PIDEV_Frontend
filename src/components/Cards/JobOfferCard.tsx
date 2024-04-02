import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobOfferCard = ({ job }) => {
  const navigate = useNavigate();
  const [daysAgo, setDaysAgo] = useState('');
  const {
    jobImage,
    jobCommpanyName,
    jobTitle,
    jobPost,
    salary,
    jobRequiredExperience,
    jobfield,
    jobLocation,
    jobStartDate,
    jobApplicationDeadline,
  } = job;
  const isJobExpired = () => {
    const today = new Date();
    const deadlineDate = new Date(jobApplicationDeadline);
    return today > deadlineDate;
  };
  useEffect(() => {
    const today = new Date();
    const postedDate = new Date(jobStartDate);
    const differenceInTime = today.getTime() - postedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    setDaysAgo(`${differenceInDays} days ago`);
  }, [jobStartDate]);
  const handleApplyNow = () => {
    navigate(`/Offers/Jobs/${job._id}`);
  };
  return (
    <div
      className="block rounded-lg bg-white border-red-600 border text-surface shadow-secondary-1 shadow-md
      dark:bg-surface-dark dark:text-white">
      <div
        className="border-b-2 rounded-t-lg bg-gradient-to-r from-red-800 to-red-500 text-center font-bold text-white border-neutral-100 px-6 py-3 dark:border-white/10">
        Job
      </div>
      <div className="p-4 sm:p-6 ">
        <div className="mb-5 flex items-center justify-start space-x-2">
          <img
            src={jobImage}
            alt="Company Logo"
            className="w-10 h-10 mr-4 rounded-full object-cover"
          />
          <span className="text-xl font-medium text-gray-600">{jobCommpanyName}</span>
        </div>

        <h5 className="mb-2 text-xl font-medium leading-tight">{jobTitle}</h5>
        <p className="mb-4 text-base">
          {jobPost}
        </p>
        <div className="flex-wrap flex space-y-2 items-end space-x-2 mb-5">
          <span
            className="text-xs inline-flex items-center h-8 font-bold leading-none
            uppercase px-3 py-1 bg-red-100 text-red-700 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
            {salary} DT</span>
          <span
            className="text-xs inline-flex items-center font-bold h-8
            leading-none uppercase px-3 py-1 bg-red-100 text-red-700 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>

            {jobRequiredExperience}</span>

          <span
            className="text-xs inline-flex items-center text-center font-bold leading-none h-8
            uppercase px-3 py-1 bg-red-100 text-red-700 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>

            {jobfield}</span>
          <span
            className="text-xs inline-flex items-center font-bold h-8
            leading-none uppercase px-3 py-1 bg-red-100 text-red-700 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {jobLocation}</span>
        </div>

        <div className="mt-auto flex justify-end">

          <div
            className={` ${isJobExpired() ? 'opacity-60 pointer-events-none' : ''}`}
          >
            {/* Job card content */}
            <button
              type="button"
              className={`w-30 bg-black h-12 my-3 flex items-center justify-center 
              rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out 
              shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full 
              before:w-full before:h-full before:bg-gradient-to-r before:from-red-800 before:to-red-400 
              before:transition-all before:duration-500 
              before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff] 
              ${isJobExpired() ? 'bg-gray-600' : ''}`}
              onClick={handleApplyNow}
              disabled={isJobExpired()}
            >
              {isJobExpired() ? 'Expired' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
      <div
        className='border-t-2 rounded-b-lg bg-gradient-to-r from-red-800 to-red-500 border-neutral-100 text-white font-bold
        text-center px-6 py-3 text-surface/75 dark:border-white/10 dark:text-neutral-300'
      >

        {daysAgo}
      </div>
    </div>
  );
};

export default JobOfferCard;
