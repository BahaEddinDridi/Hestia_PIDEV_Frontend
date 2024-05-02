import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { Link } from 'react-router-dom';

const API_URL = 'http://192.168.33.10:3001/recommendation/recommendUser/';
const ITEMS_PER_PAGE = 3; // Number of job offers per page

const Feed: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [recommendedJobOffers, setRecommendedJobOffers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedJobOffers = async () => {
      try {
        const response = await axios.get(`${API_URL}${currentUser._id}`);
        const jobOffers = response.data.jobOffers;
        setTotalPages(Math.ceil(jobOffers.length / ITEMS_PER_PAGE));
        setRecommendedJobOffers(jobOffers);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch recommended job offers');
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchRecommendedJobOffers();
    }
  }, [currentUser]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastOffer = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstOffer = indexOfLastOffer - ITEMS_PER_PAGE;
  const currentOffers = recommendedJobOffers.slice(indexOfFirstOffer, indexOfLastOffer);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-2"
           style={{
             background: "url('src/images/cards/recJob.png')",
             backgroundSize: 'cover',
           }}>
        <h2 className="text-2xl text-center font-semibold text-black mb-2">Recommended Job Offers</h2>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && recommendedJobOffers.length === 0 && (
          <p className="text-gray-600">No job offers found</p>
        )}
      </div>
      <div className="grid grid-cols-1 px-4">
        {!loading && !error && currentOffers.length > 0 && (
          <div>
            {currentOffers.map((jobOffer, index) => (
              <Link to={`/Offers/Jobs/${jobOffer._id}`} ><div key={jobOffer._id}>

            <div
              className="flex flex-col dark:text-white  w-full bg-white
                  dark:bg-neutral-900 p-5 rounded-md mb-3 mt-5 shadow-md hover:scale-105 hover:duration-150 duration-150"
              style={{
                background: 'url(\'src/images/cards/recJob.png\')',
                backgroundSize: 'cover'
              }}
            >
              <div className="flex justify-center">
                <div className="flex items-center space-x-2
                  text-xs h-6 font-bold leading-none
                  uppercase p-1.5 ">
                  <img
                    src={jobOffer.jobImage}
                    alt="Company Logo"
                    className="w-8 h-8 rounded-full shadow-md object-cover"
                  />
                  <span className="text-xl font-medium text-black">{jobOffer.jobCommpanyName}</span>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <h3 className="text-xl text-white font-bold"> {jobOffer.jobTitle}
                </h3>
              </div>
              <div className="flex-wrap grid grid-cols-4 gap-2 items-end mb-2">
                {jobOffer.jobRequiredSkills.map((skill: string, index: number) => (
                  <span key={index} className="text-xs inline-flex items-center h-6 font-bold leading-none
                  uppercase px-1 py-1 bg-gradient-to-r from-[#c1c1c1] text-black shadow-md rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>

                    {skill}
                        </span>
                ))}
                <span
                  className="text-xs inline-flex items-center h-6 font-bold leading-none
            uppercase px-1 py-1 bg-gradient-to-r from-[#c1c1c1] text-black shadow-md rounded-md">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
                  {jobOffer.salary} DT</span>
                <span
                  className="text-xs inline-flex items-center h-6 font-bold leading-none
            uppercase px-1 py-1 bg-gradient-to-r from-[#c1c1c1] text-black shadow-md rounded-md">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>
                  {jobOffer.jobfield}</span>
                <span
                  className="text-xs inline-flex items-center h-6 font-bold leading-none
            uppercase px-1 py-1 bg-gradient-to-r from-[#c1c1c1] text-black shadow-md rounded-md">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
                  {jobOffer.jobLocation}</span>
              </div>
            </div>
          </div></Link>

        ))}
      </div>
      )}
    </div>
  <div className="flex justify-center">
        <nav className="bg-white rounded-lg shadow-md p-4">
          <ul className="flex">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="mx-1">
                <button
                  className={`py-2 px-4 text-gray-600 font-semibold hover:text-gray-800 focus:outline-none ${
                    currentPage === i + 1 ? 'text-gray-800' : ''
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Feed;
