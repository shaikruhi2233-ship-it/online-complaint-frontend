import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-5">
      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>
            <FaUserCircle className="me-2" />
            My Profile
          </h3>
        </div>

        <div className="card-body">

          <div className="mb-3">
            <h5>
              <FaUser className="me-2 text-primary" />
              Name
            </h5>
            <p>{user?.name}</p>
          </div>

          <div className="mb-3">
            <h5>
              <FaEnvelope className="me-2 text-primary" />
              Email
            </h5>
            <p>{user?.email}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;