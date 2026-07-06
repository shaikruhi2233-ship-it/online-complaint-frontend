import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const API =
  "https://online-complaint-registration-production.up.railway.app/api";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/complaints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(res.data);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Invalid Token. Please login again.");
      }
    }
  };

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  return (
    <div className="container my-5">

      <div className="text-center mb-4">
        <h2 className="fw-bold">
          Complaint Dashboard
        </h2>
        <p className="text-muted">
          Overview of Complaint Statistics
        </p>
      </div>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card dashboard-card bg-primary text-white shadow">
            <div className="card-body text-center">
              <FaClipboardList size={45} />
              <h5 className="mt-3">Total Complaints</h5>
              <h2>{totalComplaints}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card dashboard-card bg-warning text-dark shadow">
            <div className="card-body text-center">
              <FaClock size={45} />
              <h5 className="mt-3">Pending</h5>
              <h2>{pendingComplaints}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card dashboard-card bg-success text-white shadow">
            <div className="card-body text-center">
              <FaCheckCircle size={45} />
              <h5 className="mt-3">Resolved</h5>
              <h2>{resolvedComplaints}</h2>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;