import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLegacyEcommercePath } from './data/content';
import NotFound from './pages/NotFound';

const CatchAll = () => {
  const location = useLocation();
  if (isLegacyEcommercePath(location.pathname)) {
    return <Navigate to={`/app${location.pathname}${location.search}`} replace />;
  }
  return <NotFound />;
};

export default CatchAll;
