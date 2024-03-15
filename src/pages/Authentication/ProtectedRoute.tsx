import React from 'react';
import { Route, RouteProps, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../ApiSlices/authSlice';
const ProtectedRoute = ({children}) => {
  const isAuthorized = useSelector(selectIsAuthorized);
  let location = useLocation();

  if(!isAuthorized) {
  return <Navigate to="/auth/signin" state={{ from: location}}  replace />
  }
  return children
};

export default ProtectedRoute;
