import React from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  const handleLogout = async (req, res) => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-green-200 h-screen">
        <div className="bg-black text-white p-8 rounded shadow-md w-[16rem]  sm:w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">USER HOME</h2>
          <div>
            <p className="text-md font-semibold ">Name: {user?.name}</p>
            <p className="text-md font-semibold ">Email: {user?.email}</p>
            <p className="text-md font-semibold mb-6">
              Address: {user?.address}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-green-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
