import React, { useState, useEffect } from "react";
import { mockDoctors } from "../services/mockData";
import { paginate } from "../utils/pagination";
import toast from "react-hot-toast";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const pageSize = 3;

  useEffect(() => {
    setDoctors(mockDoctors);
  }, []);

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const pagedData = paginate(filtered, pageSize, page);

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const newDoctor = {
      id: doctors.length + 1,
      name: form.name.value,
      specialization: form.specialization.value,
      phone: form.phone.value,
      email: form.email.value,
    };
    setDoctors([...doctors, newDoctor]);
    toast.success("Doctor added successfully!");
    form.reset();
  };

  const handleDelete = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
    toast.success("Doctor deleted successfully!");
  };

  const handleEdit = (doctor) => setEditingDoctor(doctor);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedDoctor = {
      ...editingDoctor,
      name: form.name.value,
      specialization: form.specialization.value,
      phone: form.phone.value,
      email: form.email.value,
    };
    setDoctors(doctors.map((d) => (d.id === editingDoctor.id ? updatedDoctor : d)));
    toast.success("Doctor updated successfully!");
    setEditingDoctor(null);
  };

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="p-4">
      <h4 className="mb-3 text-primary">Doctor Management</h4>

      {/* Add / Edit Form */}
      <form onSubmit={editingDoctor ? handleUpdate : handleAdd} className="row g-3 mb-4">
        <div className="col-md-3">
          <input name="name" className="form-control" placeholder="Name" required defaultValue={editingDoctor?.name || ""} />
        </div>
        <div className="col-md-3">
          <input name="specialization" className="form-control" placeholder="Specialization" required defaultValue={editingDoctor?.specialization || ""} />
        </div>
        <div className="col-md-2">
          <input name="phone" className="form-control" placeholder="Phone" required defaultValue={editingDoctor?.phone || ""} />
        </div>
        <div className="col-md-3">
          <input name="email" className="form-control" placeholder="Email" required defaultValue={editingDoctor?.email || ""} />
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-primary w-100">
            {editingDoctor ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search doctor..."
          className="form-control"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Doctor Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.specialization}</td>
              <td>{doc.phone}</td>
              <td>{doc.email}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(doc)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doc.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <p>Page {page} of {totalPages}</p>
        <div>
          <button className="btn btn-outline-secondary btn-sm me-2" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <button className="btn btn-outline-secondary btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
