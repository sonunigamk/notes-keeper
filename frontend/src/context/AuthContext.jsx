import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/url";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when app loads
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const res = await axiosInstance.get("/users/me");
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/users/login", { email, password });
      setUser(res.data);
      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Register Function
  const register = async (name, email, password) => {
    try {
      const res = await axiosInstance.post("/users/register", { name, email, password });
      setUser(res.data);
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      setUser(null);
      toast.success("Logged out");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};