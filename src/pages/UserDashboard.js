import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";

const API =
  "https://online-complaint-registration-production.up.railway.app/api";

function UserDashboard() {
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

      const user = JSON.parse(localStorage.getItem("user"));

      const userComplaints = res.data.filter(
        (item) => item.email === user.email
      );

      setComplaints(userComplaints);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to fetch complaints");
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
        User Dashboard
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
              <FaUser size={40} />
              <h5>Welcome</h5>
              <p>
                {JSON.parse(localStorage.getItem("user"))?.name}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default UserDashboard;