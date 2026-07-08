import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";

const API = "http://localhost:5000/api";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    const filtered = complaints.filter(
      (item) =>
        item.subject.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()) ||
        item.location?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredComplaints(filtered);
  }, [search, complaints]);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API}/complaints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(res.data);
      setFilteredComplaints(res.data);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to fetch complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="container mt-5">
        <h4 className="text-center">Loading...</h4>
      </div>
    );

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Complaints</h2>

        <button
          className="btn btn-primary"
          onClick={fetchComplaints}
        >
          Refresh
        </button>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <FaSearch />
        </span>

        <input
          type="text"
          className="form-control"
          placeholder="Search by Subject, Category, Status or Location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredComplaints.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center"
                >
                  No Complaints Found
                </td>
              </tr>
            ) : (
              filteredComplaints.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.category}</td>
                  <td>{item.subject}</td>
                  <td>{item.location}</td>

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
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <Link
                      to={`/complaint/${item._id}`}
                      className="btn btn-info btn-sm"
                    >
                      <FaEye className="me-1" />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ComplaintList;