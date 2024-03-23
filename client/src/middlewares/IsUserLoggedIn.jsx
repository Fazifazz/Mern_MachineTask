import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { ClientUtils } from '../Util/ClientUrls';

function IsLoggedUser() {
  const { token } = useSelector((state) => state.Auth);
  return token ? <Outlet /> : <Navigate to={ClientUtils.Login} />;
}

export default IsLoggedUser;




