import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectCurrentUser } from '../../ApiSlices/authSlice';

const API_URL = 'http://localhost:3001/recommendation/recommendUser/';
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
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Job Offers</h2>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && recommendedJobOffers.length === 0 && (
          <p className="text-gray-600">No job offers found</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6">
        {!loading && !error && currentOffers.length > 0 && (
          <div>
            {currentOffers.map((jobOffer, index) => (
              <div key={jobOffer._id} className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{jobOffer.jobTitle}</h3>
                <p className="text-red-500 font-semibold mb-2">Company:</p>
                <p className="text-gray-600 mb-2">{jobOffer.jobCommpanyName}</p>
                <p className="text-red-500 font-semibold mb-2">Address:</p>
                <p className="text-gray-600 mb-2">{jobOffer.jobAdress}</p>
                <p className="text-gray-600 mb-2">Description: {jobOffer.jobDescription}</p>
                <p className="text-red-500 font-semibold mb-2">Salary:</p>
                <p className="text-gray-600 mb-2">${jobOffer.salary}</p>
                <p className="text-gray-600 mb-2">Applicants: {jobOffer.jobApplications.length}</p>
                {/* Add more details as needed */}
              </div>
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
