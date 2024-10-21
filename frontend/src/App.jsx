import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import OtpVerification from "./components/OtpVerification";
import Dashboard from "./components/Dashboard";
import CreateInterview from "./components/CreateInterview";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />{" "}
          <Route
            path="/create-interview"
            element={<ProtectedRoute element={<CreateInterview />} />}
          />{" "}
        </Routes>
      </Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "bg-gray-800 text-white",
          style: {
            border: "1px solid #4F46E5",
            borderRadius: "8px",
          },
          duration: 3000,
        }}
      />
    </Router>
  );
}

export default App;
