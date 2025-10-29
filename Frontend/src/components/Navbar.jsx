import React from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <span className="navbar-brand fw-bold text-primary">MediCore HMS</span>
      <div className="ms-auto d-flex align-items-center">
        {user && (
          <span className="me-3 text-muted">
            {user.name} ({user.role})
          </span>
        )}
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
