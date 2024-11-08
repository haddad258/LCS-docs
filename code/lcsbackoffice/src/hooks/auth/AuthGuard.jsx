import useAuth from 'src/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const hasAuthToken = !!localStorage.getItem('@accessToken');
  if (isAuthenticated && hasAuthToken) return <>{children}</>;
  return <Navigate replace to="/login" state={{ from: pathname }} />;
};
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthGuard;
