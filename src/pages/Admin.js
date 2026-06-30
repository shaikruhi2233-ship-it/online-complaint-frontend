import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");

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

  const deleteComplaint = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/complaints/${id}`
      );

      fetchComplaints();

      alert("Complaint Deleted Successfully");
    } catch (err) {
      alert("Delete Failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        {
          status:
            status === "Pending"
              ? "Resolved"
              : "Pending",
        }
      );

      fetchComplaints();
    } catch (err) {
      alert("Status Update Failed");
    }
  };

  const filtered = complaints.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <FaClipboardList size={40} />
              <h3>{total}</h3>
              <p>Total Complaints</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning shadow">
            <div className="card-body text-center">
              <FaClock size={40} />
              <h3>{pending}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <FaCheckCircle size={40} />
              <h3>{resolved}</h3>
              <p>Resolved</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-dark text-white shadow">
            <div className="card-body text-center">
              <FaUsers size={40} />
              <h3>1</h3>
              <p>Admin</p>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          Complaint Management
        </div>

        <div className="card-body">

          <div className="input-group mb-3">

            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              className="form-control"
              placeholder="Search Complaint..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>
                    <div className="table-responsive">

            <table className="table table-bordered table-hover">

              <thead className="table-primary">

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Complaint</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filtered.length === 0 ? (

                  <tr>
                    <td colSpan="6" className="text-center">
                      No Complaints Found
                    </td>
                  </tr>

                ) : (

                  filtered.map((item) => (

                    <tr key={item._id}>

                      <td>{item.name}</td>

                      <td>{item.email}</td>

                      <td>{item.subject}</td>

                      <td>{item.complaint}</td>

                      <td>

                        <button
                          className={
                            item.status === "Resolved"
                              ? "btn btn-success btn-sm"
                              : "btn btn-warning btn-sm"
                          }
                          onClick={() =>
                            updateStatus(
                              item._id,
                              item.status
                            )
                          }
                        >
                          {item.status}
                        </button>

                      </td>

                      <td>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteComplaint(item._id)
                          }
                        >
                          <FaTrash className="me-1" />
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;