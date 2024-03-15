import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../ApiSlices/authSlice';

const PersistLoginRoute = ({ children }) => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isAuthorized) {
      setShowMessage(true);
      const timeout = setTimeout(() => {
        setShowMessage(false);
        navigate('/Profile', { replace: true }); // Redirect after 2 seconds
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isAuthorized, location, navigate]); // Include navigate in the dependencies array

  return (
    <>
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-green-200 border border-green-500 text-green-700 px-6 py-4 rounded-lg relative z-50"
               role="alert">
            <strong className="font-bold">You are already signed in.</strong>
            <span className="block sm:inline">Redirecting you to your profile...</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default PersistLoginRoute;
