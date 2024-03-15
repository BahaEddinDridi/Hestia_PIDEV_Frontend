import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentRole, selectIsAuthorized } from '../../../ApiSlices/authSlice';


const AdminRoute = ({ children }) => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const userRole = useSelector(selectCurrentRole);
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/Unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
