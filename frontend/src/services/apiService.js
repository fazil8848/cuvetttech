import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: apiUrl || "https://cuvett-backend.onrender.com/api/",
});

API.interceptors.request.use((req) => {
  const token = Cookies.get("company");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerCompany = (data) => API.post("/auth/register", data);
export const verifyOtp = (data) => API.post("/auth/verify_otp", data);
export const loginCompany = (data) => API.post("/auth/login", data);
export const sendOtpAPI = (data) => API.post("/auth/sendOTP", data);
export const logout = () => API.post("/auth/logout");

export const getJobsAPI = () => API.get(`/jobs/get-jobs`);
export const createJobAPI = (data) => API.post("/jobs/add-new-job", data);

export const sendEmailAPI = (jobId, emails) => {
  return API.post("/jobs/send-email", { jobId, emails });
};
