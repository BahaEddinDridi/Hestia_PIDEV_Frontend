import React from 'react';

const OfferCard = () => {
  return (
    <div
      className="block rounded-lg bg-white  text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
      <div
        className="border-b-2 text-center border-neutral-100 px-6 py-3 dark:border-white/10">
        Job/Internship
      </div>
      <div className="p-6">
        <div className="mb-5 flex items-left text-right justify-start space-x-2">
          <img
            src=""
            alt="Company Logo"
            className="w-6 h-6 rounded-full"
          />
          <span className="mb-5 text-sm font-medium text-gray-600">Company Name</span>
        </div>
        <h5 className="mb-2 text-xl font-medium leading-tight">Special title treatment</h5>
        <p className="mb-4 text-base">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <div className="flex space-x-2 mb-2">
         <span
           className="rounded-[6px] items-center bg-neutral-700 px-2 py-2
            font-bold leading-none text-white dark:bg-[#2c0f14] dark:text-danger-500">Salary</span>
          <span
            className="rounded-[6px] items-center bg-neutral-700 px-2 py-2
            font-bold leading-none text-white dark:bg-[#2c0f14] dark:text-danger-500">Experience Level</span>
          <span
            className="rounded-[6px] items-center bg-neutral-700 px-2 py-2
            font-bold leading-none text-white dark:bg-[#2c0f14] dark:text-danger-500">Industry</span>
          <span
            className="rounded-[6px] items-center bg-neutral-700 px-2 py-2
            font-bold leading-none text-white dark:bg-[#2c0f14] dark:text-danger-500">Location</span>
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

export default OfferCard;
