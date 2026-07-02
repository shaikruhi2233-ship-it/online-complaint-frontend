import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="container mt-5 text-center">
        <h3>No Complaint Found</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/complaints")}
        >
          Back
        </button>
      </div>
    );
  }

  const complaint = state;

  return (
    <div className="container mt-5">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-primary text-white text-center">
          <h3>Complaint Details</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th width="30%">Name</th>
                <td>{complaint.name}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{complaint.email}</td>
              </tr>

              <tr>
                <th>Mobile Number</th>
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
                  {new Date(
                    complaint.createdAt
                  ).toLocaleString()}
                </td>
              </tr>

            </tbody>

          </table>

          <div className="text-center">

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

    </div>
  );
}

export default ComplaintDetails;