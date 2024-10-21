import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/apiService";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const OtpVerification = () => {
  const location = useLocation();
  const id = location.state;

  const navigate = useNavigate();

  const [emailOTP, setEmailOTP] = useState("");
  const [mobileOTP, setMobileOTP] = useState("");
  const [emailOTPStatus, setEmailOTPStatus] = useState(null);
  const [mobileOTPStatus, setMobileOTPStatus] = useState(null);

  const handleVerify = async (type) => {
    if (type === "email") {
      if (emailOTP.length !== 6)
        return toast.error("Email OTP must be exactly 6 characters");
      if (emailOTP === "") return toast.error("Email OTP is Required");
    } else {
      if (mobileOTP.length !== 6)
        return toast.error("Mobile OTP must be exactly 6 characters");
      if (mobileOTP === "") return toast.error("Mobile OTP is Required");
    }

    const otp = type === "email" ? emailOTP : mobileOTP;
    const data = {
      type: type,
      otp: otp,
      id: id,
    };

    try {
      const response = await verifyOtp(data);
      console.log(`Verification successful for ${type} OTP:`, response.data);
      toast.success(`Verification successful for ${type} OTP:`);

      if (response.data.token) {
        Cookies.set("company", response.data.token, {
          secure: true,
          sameSite: "Strict",
          expires: 1,
        });
      }

      if (response.data.userName) {
        localStorage.setItem("userName", response.data.userName);
      }

      if (type === "email") {
        setEmailOTP("");
        setEmailOTPStatus("verified");
      } else {
        setMobileOTP("");
        setMobileOTPStatus("verified");
      }

      if (response.data.token) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (type === "email") {
        setEmailOTPStatus("error");
      } else {
        setMobileOTPStatus("error");
      }
      console.error(`Error verifying ${type} OTP:`, error);
      toast.error(`Error verifying ${type} OTP:`);
    }
  };

  return (
    <div className="min-h-[75vh] bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-12 w-4/6 items-center">
        <div className="md:w-1/2">
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
          <p className="text-gray-600 mb-6 text-center">
            Lorem Ipsum is simply dummy text
          </p>
          <form className="space-y-4">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <span className="pl-3 pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="emailOTP"
                  className="flex-grow px-3 py-2 focus:outline-none"
                  value={emailOTP}
                  onChange={(e) => setEmailOTP(e.target.value)}
                  placeholder={
                    emailOTPStatus === "verified"
                      ? "Email OTP Verified"
                      : "Email OTP"
                  }
                  disabled={emailOTPStatus === "verified"}
                />
                {emailOTPStatus === "verified" && (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                )}
              </div>
              {emailOTPStatus !== "verified" && (
                <button
                  type="button"
                  onClick={() => handleVerify("email")}
                  className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Verify
                </button>
              )}
            </div>
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <span className="pl-3 pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="mobileOTP"
                  className="flex-grow px-3 py-2 focus:outline-none"
                  value={mobileOTP}
                  onChange={(e) => setMobileOTP(e.target.value)}
                  placeholder={
                    mobileOTPStatus === "verified"
                      ? "Mobile OTP Verified"
                      : "Mobile OTP"
                  }
                  disabled={mobileOTPStatus === "verified"}
                />
                {mobileOTPStatus === "verified" && (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                )}
              </div>
              {mobileOTPStatus !== "verified" && (
                <button
                  type="button"
                  onClick={() => handleVerify("mobile")}
                  className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Verify
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
