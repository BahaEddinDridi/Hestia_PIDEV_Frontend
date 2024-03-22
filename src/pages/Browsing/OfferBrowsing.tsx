import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import OfferCard from '../../components/Cards/OfferCard'; // Assuming you're using React Router for navigation

const OfferBrowsePage = () => {
  // Dummy data for job/internship listings
  const jobListings = [
    { title: "Software Engineer Intern", company: "ABC Corp", location: "New York", type: "Internship", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
  ];

  return (
    <DefaultLayout>

      <div className="max-w-7xl mx-auto px-4">
        <header className="bg-white shadow-lg rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="filters flex">
                <label className="mr-4">
                  Location:
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="ml-2 px-3 py-1.5 border border-gray-300 rounded-md"
                  />
                </label>
                <label className="mr-4">
                  Industry:
                  <input
                    type="text"
                    placeholder="Enter industry"
                    className="ml-2 px-3 py-1.5 border border-gray-300 rounded-md"
                  />
                </label>
                <label>
                  Job Type:
                  <select className="ml-2 px-3 py-1.5 border border-gray-300 rounded-md">
                    <option value="">All</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </label>
              </div>
              <form className="relative flex items-center">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-3 ml-4 w-80 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Job Offers"
                  required
                />
                <button
                  type="submit"
                  className="p-3 text-white bg-blue-700 rounded-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
          </div>
        </header>
        <div className="grid gap-10 mt-10 px-30">
          {/* Render offer cards */}
          {jobListings.map((job, index) => (
            <OfferCard key={index} {...job} />
          ))}
        </div>

      </div>


    </DefaultLayout>
  );
};

export default OfferBrowsePage;
