import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { sendOtpAPI } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Login = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [serverOtp, setServerOtp] = useState(null);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  useAuthRedirect("/dashboard");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateOtp = (otp) => {
    if (!otp) {
      setOtpError("OTP is required");
      return false;
    } else if (otp.length !== 6) {
      setOtpError("OTP must be exactly 6 digits");
      return false;
    }
    setOtpError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      if (!validateEmail(email)) return;

      try {
        const response = await sendOtpAPI({ email });

        console.log(response.data);

        setUserName(response.data.userName);
        setToken(response.data.token);
        setServerOtp(`${response.data.otp}`);
        setOtpSent(true);
        toast.success("OTP sent to your email!");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error sending OTP");
      }
    } else {
      if (!validateOtp(otp)) return;

      if (otp === serverOtp) {
        toast.success("OTP verified successfully!");
        console.log(token);

        if (token) {
          Cookies.set("company", token, {
            secure: true,
            sameSite: "Strict",
            expires: 1,
          });
        }

        if (userName) {
          localStorage.setItem("userName", userName);
        }
        navigate("/dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    }
  };

  return (
    <div className="w-full flex justify-center mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12 w-4/6 items-center">
        <div className="md:w-1/2">
          <p className="text-gray-600">
            Welcome back! Please log in to your account to access the dashboard
            and other features.
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3 text-center">Log In</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={otpSent}
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </div>

              {otpSent && (
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {otpError && (
                    <p className="text-red-500 text-sm">{otpError}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
              >
                {otpSent ? "Verify OTP" : "Send OTP"}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Already a user?
              <Link to="/" className="text-blue-600 hover:underline">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
