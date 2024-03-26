import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobOfferCard = ({ job }) => {
  const navigate = useNavigate();
  const {
    jobTitle,
    jobPost,
    salary,
    jobRequiredExperience,
    jobfield,
    jobLocation,
  } = job;
  const handleApplyNow = () => {
    // Redirect to the job offer details page
    navigate(`/Offers/${job._id}`);
  };
  return (
    <div
      className="block rounded-lg bg-white  text-surface shadow-secondary-1
      dark:bg-surface-dark dark:text-white">
      <div
        className="border-b-2 text-center border-neutral-100 px-6 py-3 dark:border-white/10">
        Job
      </div>
      <div className="p-4 sm:p-6">
        <div className="mb-5 flex items-left text-right justify-start space-x-2">
          <img
            src=""
            alt="Company Logo"
            className="w-6 h-6 rounded-full"
          />
          <span className="mb-5 text-sm font-medium text-gray-600">Company Name</span>
        </div>
        <h5 className="mb-2 text-xl font-medium leading-tight">{jobTitle}</h5>
        <p className="mb-4 text-base">
          {jobPost}
        </p>
        <div className="flex space-x-2 mb-2">
  <span
    className="rounded-[6px] flex  flex-wrap justify-center items-center bg-neutral-700 px-2 py-2
    font-bold leading-none text-white dark:bg-[#2c0f14] dark:text-danger-500 text-center">{salary}</span>
          <span
            className="rounded-[6px] flex-wrap justify-center items-center bg-neutral-700 px-2 py-2
    font-bold leading-none flex  text-white dark:bg-[#2c0f14] dark:text-danger-500 text-center">{jobRequiredExperience}</span>
          <span
            className="rounded-[6px] flex-wrap justify-center items-center bg-neutral-700 px-2 py-2
    font-bold leading-none text-white flex  dark:bg-[#2c0f14] dark:text-danger-500 text-center">{jobfield}</span>
          <span
            className="rounded-[6px] flex-wrap justify-center items-center bg-neutral-700 px-2 py-2
    font-bold leading-none flex  text-white dark:bg-[#2c0f14] dark:text-danger-500 text-center">{jobLocation}</span>
        </div>

        <div className="text-right">
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs
          font-medium uppercase leading-normal text-white shadow-primary-3 transition
          duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300
          focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2
          dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong
          dark:active:shadow-dark-strong"
            onClick={handleApplyNow}
          >
            Apply Now
          </button>
        </div>
      </div>
      <div
        className="border-t-2 border-neutral-100 text-center px-6 py-3 text-surface/75 dark:border-white/10 dark:text-neutral-300">
        2 days ago (when it was posted)
      </div>
    </div>
  );
};

export default JobOfferCard;
