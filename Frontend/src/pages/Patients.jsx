import React, { useState, useEffect } from "react";
import { mockPatients } from "../services/mockData";
import { paginate } from "../utils/pagination";
import toast from "react-hot-toast";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingPatient, setEditingPatient] = useState(null);

  const pageSize = 3;

  useEffect(() => {
    setPatients(mockPatients);
  }, []);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.address.toLowerCase().includes(search.toLowerCase())
  );

  const pagedData = paginate(filtered, pageSize, page);

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPatient = {
      id: patients.length + 1,
      name: form.name.value,
      age: parseInt(form.age.value),
      gender: form.gender.value,
      phone: form.phone.value,
      address: form.address.value,
    };
    setPatients([...patients, newPatient]);
    toast.success("Patient added successfully!");
    form.reset();
  };

  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
    toast.success("Patient deleted successfully!");
  };

  const handleEdit = (patient) => setEditingPatient(patient);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedPatient = {
      ...editingPatient,
      name: form.name.value,
      age: parseInt(form.age.value),
      gender: form.gender.value,
      phone: form.phone.value,
      address: form.address.value,
    };
    setPatients(patients.map((p) => (p.id === editingPatient.id ? updatedPatient : p)));
    toast.success("Patient updated successfully!");
    setEditingPatient(null);
  };

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="p-4">
      <h4 className="mb-3 text-primary">Patient Management</h4>

      {/* Add / Edit Form */}
      <form onSubmit={editingPatient ? handleUpdate : handleAdd} className="row g-3 mb-4">
        <div className="col-md-2">
          <input name="name" className="form-control" placeholder="Name" required defaultValue={editingPatient?.name || ""} />
        </div>
        <div className="col-md-1">
          <input name="age" type="number" className="form-control" placeholder="Age" required defaultValue={editingPatient?.age || ""} />
        </div>
        <div className="col-md-2">
          <select name="gender" className="form-select" required defaultValue={editingPatient?.gender || ""}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="col-md-2">
          <input name="phone" className="form-control" placeholder="Phone" required defaultValue={editingPatient?.phone || ""} />
        </div>
        <div className="col-md-4">
          <input name="address" className="form-control" placeholder="Address" required defaultValue={editingPatient?.address || ""} />
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-primary w-100">
            {editingPatient ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search patient..."
          className="form-control"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Patient Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.phone}</td>
              <td>{p.address}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>
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

export default Patients;
