import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${id}`, {
        status: "Resolved",
      });
      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/complaints/${id}`);
      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;
  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        Admin Dashboard
      </h2>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card bg-primary text-white text-center">
            <div className="card-body">
              <h5>Total Complaints</h5>
              <h2>{total}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning text-dark text-center">
            <div className="card-body">
              <h5>Pending</h5>
              <h2>{pending}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white text-center">
            <div className="card-body">
              <h5>Resolved</h5>
              <h2>{resolved}</h2>
            </div>
          </div>
        </div>

      </div>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {complaints.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.subject}</td>
              <td>{item.complaint}</td>

              <td>
                <span
                  className={
                    item.status === "Resolved"
                      ? "badge bg-success"
                      : "badge bg-warning text-dark"
                  }
                >
                  {item.status}
                </span>
              </td>

              <td>

                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(item._id)}
                >
                  Resolve
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteComplaint(item._id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Admin;