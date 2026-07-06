import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";

const API =
  "https://online-complaint-registration-production.up.railway.app/api";
function ComplaintList() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Unable to fetch complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  const filtered = complaints.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          <h3>Complaint List</h3>
        </div>

        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-responsive">

            <table className="table table-bordered table-hover">

              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Category</th>
                  <th>Subject</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>

                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No Complaints Found
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item._id}>

                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.category}</td>
                      <td>{item.subject}</td>
                      <td>{item.location}</td>

                      <td>
                        {new Date(item.createdAt).toLocaleString()}
                      </td>

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
                          className="btn btn-info btn-sm"
                          onClick={() =>
                            navigate(`/complaint/${item._id}`, {
                              state: item,
                            })
                          }
                        >
                          <FaEye />
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

export default ComplaintList;