import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { mockDoctors, mockPatients } from "../services/mockData";

function Dashboard() {
  const data = [
    { name: "Doctors", count: mockDoctors.length },
    { name: "Patients", count: mockPatients.length },
    { name: "Appointments", count: 5 },
    { name: "Bills", count: 8 },
  ];

  const pieData = [
    { name: "Cardiology", value: 4 },
    { name: "Orthopedics", value: 3 },
    { name: "Neurology", value: 2 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="p-4">
      <h4 className="text-primary mb-4">Dashboard Overview</h4>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="text-center mb-3">System Statistics</h6>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0d6efd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="text-center mb-3">Doctor Specialization Ratio</h6>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
