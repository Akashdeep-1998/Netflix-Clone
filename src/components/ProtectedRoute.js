import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(authContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
