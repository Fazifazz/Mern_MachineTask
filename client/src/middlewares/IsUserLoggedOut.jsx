import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ClientUtils } from "../Util/ClientUrls";

function IsLoggedOutUser() {
  const { token } = useSelector((state) => state.Auth);

  console.log("token",token)

  return !token ? <Outlet /> : <Navigate to={ClientUtils.userHome} />;
}

export default IsLoggedOutUser;
