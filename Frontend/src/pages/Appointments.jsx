import React, { useState, useEffect } from "react";
import { mockDoctors, mockPatients } from "../services/mockData";
import toast from "react-hot-toast";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    patientId: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.doctorId || !form.patientId || !form.date || !form.time) {
      toast.error("Please fill all fields!");
      return;
    }

    const doctor = mockDoctors.find((d) => d.id === parseInt(form.doctorId));
    const patient = mockPatients.find((p) => p.id === parseInt(form.patientId));

    const newAppointment = {
      id: appointments.length + 1,
      doctorName: doctor.name,
      patientName: patient.name,
      date: form.date,
      time: form.time,
    };

    setAppointments([...appointments, newAppointment]);
    setForm({ doctorId: "", patientId: "", date: "", time: "" });
    toast.success("Appointment scheduled successfully!");
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
    toast.success("Appointment cancelled!");
  };

  return (
    <div className="p-4">
      <h4 className="text-primary mb-3">Appointments</h4>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            value={form.doctorId}
            onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
          >
            <option value="">Select Doctor</option>
            {mockDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
          >
            <option value="">Select Patient</option>
            {mockPatients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="col-md-2">
          <input
            type="time"
            className="form-control"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>

        <div className="col-md-1">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </form>

      {/* Appointment Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.doctorName}</td>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(a.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No appointments scheduled
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
