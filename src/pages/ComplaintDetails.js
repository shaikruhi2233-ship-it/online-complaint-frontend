import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ComplaintDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const complaint = location.state;

  if (!complaint) {
    return (
      <div className="container mt-5 text-center">
        <h3>No Complaint Details Found</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/complaints")}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Complaint Details</h3>
        </div>

        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{complaint.name}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{complaint.email}</td>
              </tr>

              <tr>
                <th>Mobile</th>
                <td>{complaint.mobile}</td>
              </tr>

              <tr>
                <th>Category</th>
                <td>{complaint.category}</td>
              </tr>

              <tr>
                <th>Subject</th>
                <td>{complaint.subject}</td>
              </tr>

              <tr>
                <th>Location</th>
                <td>{complaint.location}</td>
              </tr>

              <tr>
                <th>Complaint</th>
                <td>{complaint.complaint}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>
                  <span
                    className={
                      complaint.status === "Resolved"
                        ? "badge bg-success"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {complaint.status}
                  </span>
                </td>
              </tr>

              <tr>
                <th>Submitted On</th>
                <td>
                  {new Date(complaint.createdAt).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/complaints")}
          >
            <FaArrowLeft className="me-2" />
            Back to Complaint List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;