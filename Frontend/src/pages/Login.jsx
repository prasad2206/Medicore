import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login
    localStorage.setItem("token", "demo-token");
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={handleLogin}
        className="border p-4 rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <h4 className="text-center mb-3 text-primary">MediCore Login</h4>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
