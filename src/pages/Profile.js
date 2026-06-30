import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaSave,
  FaLock,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      setUser({
        name: loggedUser.name,
        email: loggedUser.email,
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated Successfully");
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">

              <h3>
                <FaUser className="me-2" />
                My Profile
              </h3>

            </div>

            <div className="card-body">

              <div className="mb-3">

                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-4">

                <label className="form-label">
                  <FaEnvelope className="me-2" />
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />

              </div>

              <button
                className="btn btn-success me-3"
                onClick={handleSave}
              >
                <FaSave className="me-2" />
                Save Profile
              </button>

              <button
                className="btn btn-warning"
              >
                <FaLock className="me-2" />
                Change Password
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;