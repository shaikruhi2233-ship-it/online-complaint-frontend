import React from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaUserShield,
  FaChartBar,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="text-white text-center py-5"
        style={{
          background:
            "linear-gradient(135deg,#0d6efd,#6610f2)",
          minHeight: "80vh",
        }}
      >
        <div className="container">

          <h1 className="display-4 fw-bold">
            Online Complaint Registration &
            Management System
          </h1>

          <p className="lead mt-3">
            Register complaints, track status,
            and manage them efficiently.
          </p>

          <Link
            to="/complaint"
            className="btn btn-warning btn-lg mt-3"
          >
            Register Complaint
            <FaArrowRight className="ms-2" />
          </Link>

        </div>
      </div>

      {/* Features */}

      <div className="container py-5">

        <h2 className="text-center mb-5">
          Our Features
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">

            <div className="card shadow h-100">

              <div className="card-body text-center">

                <FaClipboardList
                  size={50}
                  className="text-primary mb-3"
                />

                <h4>Complaint Registration</h4>

                <p>
                  Users can easily register
                  complaints online.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow h-100">

              <div className="card-body text-center">

                <FaChartBar
                  size={50}
                  className="text-success mb-3"
                />

                <h4>Track Complaints</h4>

                <p>
                  Track complaint status in
                  real time.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow h-100">

              <div className="card-body text-center">

                <FaUserShield
                  size={50}
                  className="text-danger mb-3"
                />

                <h4>Admin Dashboard</h4>

                <p>
                  Admin can manage complaints
                  efficiently.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Home;