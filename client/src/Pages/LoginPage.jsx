import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons
import { ClientUtils } from "../Util/ClientUrls";
import { loginThunk } from "../Redux/AuthSlice";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center bg-green-200 h-screen">
      <div className="bg-black text-white p-8 rounded shadow-md w-[16rem]  sm:w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">USER LOGIN</h2>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="text-black w-full p-2 border border-gray-300 rounded"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <p className="text-sm font-bold text-red-600">
              {formik.errors.email}
            </p>
          )}
          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-gray-600">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="text-black w-full p-2 border border-gray-300 rounded pr-10"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 mt-6"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FiEyeOff color="black" />
              ) : (
                <FiEye color="black" />
              )}
            </button>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-sm font-bold text-red-600">
              {formik.errors.password}
            </p>
          )}
          <div className="flex items-center justify-center">
            <button className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-green-600">
              Login
            </button>
          </div>
        </form>

        <p className="text-sm">
          Don't have an account?
          <a
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate(ClientUtils.Register)}
          >
            Sign up
          </a>
        </p>
        <div className="text-center">
          <a
            className="text-yellow-300 cursor-pointer"
            onClick={() => navigate(ClientUtils.landing)}
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
