import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form.name, form.email, form.password, form.role);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <h4 className="text-center mb-3 text-primary">Register</h4>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
