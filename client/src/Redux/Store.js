// redux store configuration
import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "./LoadingSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    alerts: LoadingSlice,
    Auth: AuthSlice,
  },
});

export default store;
