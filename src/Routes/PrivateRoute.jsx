import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/signIn"></Navigate>;
};

export default PrivateRoute;