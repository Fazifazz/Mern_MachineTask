import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import { ClientUtils } from "./ClientUrls";
import { Toaster } from "react-hot-toast";
import Register from "../Pages/Register";
import OtpPage from "../Pages/Otp";
import LoginPage from "../Pages/LoginPage";
import Home from "../Pages/Home";
import IsLoggedOutUser from "../middlewares/IsUserLoggedOut";
import IsLoggedUser from "../middlewares/IsUserLoggedIn";

function AppRoutes() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {/* loading spinner ui */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-100 bg-opacity-90">
          <div className="text-blue-500 flex justify-center items-center">
            <svg
              className="animate-spin h-16 w-16 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.292-1.29-8.544-3.544l1.414-1.414z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      {/* toast ui */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* landing route can be accessable by anyone */}
        <Route path={ClientUtils.landing} element={<LandingPage />} />
        {/* no token needed for these routes */}
        <Route element={<IsLoggedOutUser />}>
          <Route path={ClientUtils.Register} element={<Register />} />
          <Route path={ClientUtils.verifyOtp} element={<OtpPage />} />
          <Route path={ClientUtils.Login} element={<LoginPage />} />
        </Route>
        {/* token needed for these routes */}
        <Route element={<IsLoggedUser />}>
          <Route path={ClientUtils.userHome} element={<Home />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default AppRoutes;
