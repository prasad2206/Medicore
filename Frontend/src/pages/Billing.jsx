import React, { useState } from "react";
import toast from "react-hot-toast";

function Billing() {
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ patientName: "", amount: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.patientName || !form.amount) {
      toast.error("Please fill all fields!");
      return;
    }

    const newBill = {
      id: bills.length + 1,
      patientName: form.patientName,
      amount: parseFloat(form.amount),
      date: new Date().toLocaleDateString(),
    };

    setBills([...bills, newBill]);
    toast.success("Bill generated successfully!");
    setForm({ patientName: "", amount: "" });
  };

  const handleDelete = (id) => {
    setBills(bills.filter((b) => b.id !== id));
    toast.success("Bill removed!");
  };

  const total = bills.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="p-4">
      <h4 className="text-primary mb-3">Billing Management</h4>

      <form onSubmit={handleAdd} className="row g-3 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
          />
        </div>
        <div className="col-md-5">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add Bill
          </button>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Amount (₹)</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.length > 0 ? (
            bills.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.patientName}</td>
                <td>{b.amount}</td>
                <td>{b.date}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No bills generated
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-3 text-end">
        <h5>Total Revenue: ₹{total.toFixed(2)}</h5>
      </div>
    </div>
  );
}

export default Billing;
