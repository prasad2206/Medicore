import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <span className="navbar-brand fw-bold text-primary">MediCore HMS</span>
      <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
