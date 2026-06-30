import React from "react";
import ComplaintForm from "../components/ComplaintForm";

function ComplaintPage() {
  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-lg-10">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">

              <h2>📝 Register Complaint</h2>

            </div>

            <div className="card-body">

              <ComplaintForm />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintPage;