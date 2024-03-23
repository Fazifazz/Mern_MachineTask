import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";
import { hideLoading, showLoading } from "../Redux/LoadingSlice";
import { userRequest } from "../Helper/instance";
import { user_api } from "../Util/api";

function Home() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  // const { user } = useSelector((state) => state.Auth);  user can be fetch from redux store too by this method

  useEffect(()=>{
    fetchCurrentUserData()
  },[])

  const handleLogout = async (req, res) => {
    dispatch(logoutUser());
  };

  const fetchCurrentUserData = async (req, res) => {
    dispatch(showLoading());
    userRequest({
      url: user_api.fetchUserData,
      method: "get",
    }).then((res) => {
      dispatch(hideLoading());
      if (res.data.success) {
        setUser(res.data.user)
      }
    }).catch((err) => {
      dispatch(hideLoading());
      console.log(err.message);
    })
  };

  return (
    <>
      <Navbar user={user} />
      <div className="flex items-center justify-center bg-green-200 h-screen">
        <div className="bg-black text-white p-8 rounded shadow-md w-[16rem]  sm:w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">Hello {user?.name}...</h2>
          <img
            className="w-32 mx-auto rounded-full  border-2 border-gray-800 "
            src={`/${user?.profile}`}
            alt=""
          />
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
