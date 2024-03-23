import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.Auth);
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Welcome {user?.name}</h1>
      </div>

      <div className="flex items-center">
        
        {/* Profile image */}
        <img
          src={`/${user?.profile}`}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
      </div>
    </nav>
  );
};

export default Navbar;
