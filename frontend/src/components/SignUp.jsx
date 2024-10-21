import React from "react";
import { toast } from "react-hot-toast";
import {
  UserIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { registerCompany } from "../services/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useAuthRedirect from "../hooks/useAuthRedirect";

const SignUp = () => {
  const navigate = useNavigate();

  useAuthRedirect("/dashboard");

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      companyName: "",
      companyEmail: "",
      employeeSize: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(
          /^\+[1-9]\d{1,14}$/,
          "Phone number must include a valid country code and be digits only"
        )
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits"),
      companyName: Yup.string().required("Company name is required"),
      companyEmail: Yup.string()
        .email("Invalid email format")
        .required("Company email is required"),
      employeeSize: Yup.number()
        .required("Employee size is required")
        .min(1, "Employee size must be at least 1"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await registerCompany(values);
        console.log(response);

        formik.resetForm();
        toast.success(response.data.message);
        console.log("Response:", response.data);
        navigate("/otp-verification", { state: response.data.id });
      } catch (error) {
        toast.error(error.response?.data?.error || "An error occurred.");
        console.error("Error:", error.response?.data);
      }
    },
  });

  return (
    <div className="w-full flex justify-center mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12 w-4/6 items-center">
        <div className="md:w-1/2">
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3 text-center">Sign Up</h2>
            <p className="text-gray-600 mb-3 text-center">
              Lorem Ipsum is simply dummy text.
            </p>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                ) : null}
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone no. with country code"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                ) : null}
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.companyName && formik.errors.companyName ? (
                  <p className="text-red-500 text-sm">
                    {formik.errors.companyName}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="Company Email"
                  value={formik.values.companyEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.companyEmail && formik.errors.companyEmail ? (
                  <p className="text-red-500 text-sm">
                    {formik.errors.companyEmail}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UsersIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  name="employeeSize"
                  placeholder="Employee Size"
                  value={formik.values.employeeSize}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.employeeSize && formik.errors.employeeSize ? (
                  <p className="text-red-500 text-sm">
                    {formik.errors.employeeSize}
                  </p>
                ) : null}
              </div>

              <p className="text-xs text-gray-500 mt-4">
                By clicking on proceed you will accept our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </p>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
              >
                Proceed
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Already a user?
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
