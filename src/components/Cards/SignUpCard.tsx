import React from 'react';
import Student from '../../images/cards/StudentSignUp.jpg';
import Teacher from '../../images/cards/TeacherSignUp.jpg';
import Company from '../../images/cards/CompanySignUp.jpg';

const SignUpCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen mt-15">
      <div className="flex flex-col sm:flex-row justify-center sm:space-x-4">
        {/* Student Card */}
        <div className="max-w-sm mb-4 sm:mb-0 bg-white dark:bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src={Student} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Join as a Student</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Explore educational opportunities and connect with other students.</p>
            <a href="/auth/signup/Student"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-cyan-900 dark:hover:bg-cyan-700 dark:focus:ring-cyan-400">
              Join Now
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>

        {/* Teacher Card */}
        <div className="max-w-sm mb-4 sm:mb-0 bg-white dark:bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src={Teacher} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Join as a Teacher</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Share your knowledge and experience by teaching and mentoring students.</p>
            <a href="/auth/signup/Teacher"
              className="inline-flex items-center px-3 py-2 text-sm font-medium
               text-center text-white bg-red-800 rounded-lg hover:bg-red-600
               ocus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-cyan-900
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-400">
              Join Now
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company Card */}
        <div className="max-w-sm bg-white border dark:bg-black border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src={Company} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Join as a Company</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Collaborate with educational institutions and find potential talents.</p>
            <a href="/auth/signUp/Company"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-cyan-900 dark:hover:bg-cyan-700 dark:focus:ring-cyan-400">
              Join Now
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
