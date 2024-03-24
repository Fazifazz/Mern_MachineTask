// to make HTTP requests
// keep  request and response handling logic clean and centralized.

import { API_BASE_URL } from "../config/api";
import axios from "axios";
const user = axios.create({ baseURL: API_BASE_URL });
import { toast } from "react-hot-toast";

export const userRequest = async ({ ...options }) => {
  //the Authorization header
  user.defaults.headers.common.Authorization = JSON.parse(
    localStorage.getItem("UserToken")
  );
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log("axios interceptor", error);
    toast.error(error.response?.data.error);
    return error;
  };
  return user(options).then(onSuccess).catch(onError);
};
