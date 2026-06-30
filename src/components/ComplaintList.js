import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaSearch } from "react-icons/fa";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "https://online-complaint-registration-production.up.railway.app/api/complaints"
      );
      setComplaints(res.data);
    } catch (err) {
      alert("Unable to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const deleteComplaint = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;

    try {
      await axios.delete(
        `https://online-complaint-registration-production.up.railway.app/api/complaints/${id}`
      );
      fetchComplaints();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://online-complaint-registration-production.up.railway.app/api/complaints/${id}`,
        { status }
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

  if (loading)
    return (
      <div className="text-center mt-5">
        <h4>Loading...</h4>
      </div>
    );

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
                  <th>Subject</th>
                  <th>Complaint</th>
                  <th>Status</th>
                  <th>Delete</th>
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
                        <select
                          className="form-select"
                          value={item.status}
                          onChange={(e) =>
                            updateStatus(item._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteComplaint(item._id)}
                        >
                          <FaTrash />
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