import { createSlice } from "@reduxjs/toolkit";
import { user_api } from "../Util/api";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "./LoadingSlice";
import { userRequest } from "../Helper/instance";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
  message: "",
  user: JSON.parse(localStorage.getItem("userInfo")) || {},
  token: JSON.parse(localStorage.getItem("UserToken")) || null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("UserToken", JSON.stringify(action.payload.token));
      state.token = action.payload.token;
      state.message = action.payload.success;
    },

    loginReject: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMsg = action.payload.error;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("UserToken");
      localStorage.removeItem("userInfo");
      state.token = null;
      state.user = {};
    },
  },
});

export const loginThunk = (data) => async (dispatch) => {
  try {
    dispatch(showLoading());
    dispatch(loginPending());
    const res = await userRequest({
      url: user_api.verifyLogin,
      method: "post",
      data: data,
    });
    dispatch(hideLoading());
    if (res.data.success) {
      toast.success(res.data.success);
      dispatch(loginSuccess(res.data));
    } else {
      toast.error(res.data.error);
      dispatch(loginReject(res.data));
    }
  } catch (error) {
    dispatch(loginReject(error));
  }
};

  
export const {
  loginPending,
  loginSuccess,
  loginReject,
  logoutUser,
} = AuthSlice.actions;
export default AuthSlice.reducer;
