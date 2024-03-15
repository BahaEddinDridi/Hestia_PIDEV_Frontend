import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-3xl text-red-600 font-bold mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-800 mb-6 text-center">
          You do not have the necessary privileges to access this page.
        </p>
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700 focus:outline-none"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
