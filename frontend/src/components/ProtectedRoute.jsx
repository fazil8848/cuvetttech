import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("company");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
