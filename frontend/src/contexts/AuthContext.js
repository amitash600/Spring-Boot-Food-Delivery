import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setToken(storedToken);
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${storedToken}`;
          console.log("Restored auth with token:", storedToken);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      console.log("Attempting login with:", credentials);
      console.log("Backend URL:", API_ENDPOINTS.AUTH.LOGIN);

      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

      console.log("Full login response:", response.data);

      // The token is at the root level, not in data.data
      const realToken = response.data.token;
      const userData = response.data.data || response.data;

      if (realToken && userData) {
        const userRole = userData.role || "CUSTOMER";
        const finalUserData = {
          ...userData,
          role: userRole,
        };

        setUser(finalUserData);
        setToken(realToken);
        localStorage.setItem("token", realToken);
        localStorage.setItem("user", JSON.stringify(finalUserData));
        axios.defaults.headers.common["Authorization"] = `Bearer ${realToken}`;

        console.log("Login successful with real token:", finalUserData);
        console.log("Token stored:", realToken);
        return { success: true, user: finalUserData };
      }

      return {
        success: false,
        message: "Invalid response from server - missing token or user data",
      };
    } catch (error) {
      console.error("Login error:", error);

      // For any authentication error, show simple message
      const errorMessage =
        "Invalid username or password. Please check your credentials and try again.";

      console.log("🎯 Error message:", errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
  };

  console.log("AuthContext state:", {
    user: !!user,
    token: !!token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    userRole: user?.role,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
