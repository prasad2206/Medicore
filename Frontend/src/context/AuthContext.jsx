import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Context create
const AuthContext = createContext();

// Custom hook for easy use
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);   // user = { name, email, role }
  const [token, setToken] = useState(null); // mock token for now

  // On page refresh, restore from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Mock login (replace with real API later)
  const login = (email, password) => {
    // Simple mock validation
    if (email === "admin@medi.com" && password === "admin123") {
      const userData = { name: "Admin User", email, role: "admin" };
      const mockToken = "mock-jwt-admin-token";
      setUser(userData);
      setToken(mockToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", mockToken);
      toast.success("Login successful (Admin)");
      navigate("/dashboard");
    } else if (email === "doctor@medi.com" && password === "doctor123") {
      const userData = { name: "Dr. John", email, role: "doctor" };
      const mockToken = "mock-jwt-doctor-token";
      setUser(userData);
      setToken(mockToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", mockToken);
      toast.success("Login successful (Doctor)");
      navigate("/appointments");
    } else if (email === "reception@medi.com" && password === "recep123") {
      const userData = { name: "Reception Staff", email, role: "receptionist" };
      const mockToken = "mock-jwt-recep-token";
      setUser(userData);
      setToken(mockToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", mockToken);
      toast.success("Login successful (Receptionist)");
      navigate("/patients");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  // Mock register (for now)
  const register = (name, email, password, role) => {
    toast.success(`Registered successfully as ${role}`);
    navigate("/");
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
