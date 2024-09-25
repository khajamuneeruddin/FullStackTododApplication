import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ children }) => {
  const token = Cookies.get("jwtToken");
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
