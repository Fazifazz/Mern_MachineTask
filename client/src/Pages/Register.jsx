import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ClientUtils } from "../Util/ClientUrls";
import { userRequest } from "../Helper/instance";
import { user_api } from "../Util/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/LoadingSlice";
import toast from "react-hot-toast";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  Cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(showLoading());
      const registerData = values;

      userRequest({
        url: user_api.postRegisterData,
        method: "post",
        data: registerData,
      })
        .then((response) => {
          dispatch(hideLoading());
          if (response.data.success) {
            navigate(ClientUtils.verifyOtp, {
              state: { email: response.data.email },
            });
            toast.success(response.data.success);
          } else {
            toast.error(response.data.error);
            setTimeout(() => {
              setError("");
            }, 2000);
          }
        })
        .catch((err) => {
          dispatch(hideLoading());
          toast.error("something went wrong");
          console.log(err.message);
        });
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-green-200">
      <div className="bg-black text-white p-8 rounded shadow-mdw-[16rem]  sm:w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">USER REGISTER</h2>
        {error ? <p className="text-sm font-bold text-red-600">{error}</p> : ""}
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name:</label>
            <input
              type="name"
              name="name"
              className="text-black w-full p-2 border border-gray-300 rounded"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.name && formik.touched.name && (
            <p className="text-sm font-bold text-red-600">
              {formik.errors.name}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Mobile:</label>
            <input
              type="mobile"
              name="mobile"
              className="text-black w-full p-2 border border-gray-300 rounded"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.mobile && formik.touched.mobile && (
            <p className="text-sm font-bold text-red-600">
              {formik.errors.mobile}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email:</label>
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
          {/* Address input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Address:</label>
            <textarea
              type="text"
              name="address"
              className="text-black w-full p-2 border border-gray-300 rounded"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.address && formik.touched.address && (
            <p className="text-sm font-bold text-red-600">
              {formik.errors.address}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              className="text-black w-full p-2 border border-gray-300 rounded"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-sm font-bold text-red-600">
              {formik.errors.password}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Confirm Password:
            </label>
            <input
              type="password"
              name="Cpassword"
              className="text-black w-full p-2 border border-gray-300 rounded"
              value={formik.values.Cpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.Cpassword && formik.touched.Cpassword && (
            <p className="text-sm font-bold text-red-600">
              {formik.errors.Cpassword}
            </p>
          )}
          <div className="flex items-center justify-center">
            <button className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-green-600">
              Register
            </button>
          </div>
        </form>

        <p className="text-sm">
          Already have an account?
          <a
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate(ClientUtils.Login)}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
