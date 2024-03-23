import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientUtils } from '../Util/ClientUrls';

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex h-screen justify-center items-center bg-green-200">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome!</h2>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={()=>navigate(ClientUtils.Login)}>
            Login
          </button>
          <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={()=>navigate(ClientUtils.Register)}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
