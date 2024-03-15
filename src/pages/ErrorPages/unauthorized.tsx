import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl text-red-600 font-bold mb-8">Unauthorized Access</h1>
      <p className="text-lg mb-8">
        You do not have the necessary privileges to access this page.
      </p>
      <button
        onClick={handleGoBack}
        className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700 focus:outline-none"
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
