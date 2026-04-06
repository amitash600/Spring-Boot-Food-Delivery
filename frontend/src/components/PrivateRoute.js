import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
  console.log("PrivateRoute - loading:", loading);
  console.log("PrivateRoute - user:", user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-primary-600 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
