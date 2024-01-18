import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardWrapper from '../sitebar/DashboardWrapper';
const MainAdmin = () => {
  const { pathname } = useLocation();

  console.log(pathname, 'this is header');

  return (
    <>
      <DashboardWrapper />
    </>
  );
};

export default MainAdmin;
