import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaFileInvoice, FaHome } from "react-icons/fa";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    "list-group-item list-group-item-action " + (isActive ? "active" : "");

  return (
    <div
      className="bg-white border-end"
      style={{ width: "240px", minHeight: "100vh" }}
    >
      <div className="list-group list-group-flush">
        <NavLink to="/dashboard" className={linkClass}>
          <FaHome className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/doctors" className={linkClass}>
          <FaUserMd className="me-2" /> Doctors
        </NavLink>
        <NavLink to="/patients" className={linkClass}>
          <FaUserInjured className="me-2" /> Patients
        </NavLink>
        <NavLink to="/appointments" className={linkClass}>
          <FaCalendarAlt className="me-2" /> Appointments
        </NavLink>
        <NavLink to="/billing" className={linkClass}>
          <FaFileInvoice className="me-2" /> Billing
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
