import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
     await axios.post(
  "http://localhost:5000/api/auth/register",
  {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  }
);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-success text-white text-center">
              <h2>
                <FaUserPlus className="me-2" />
                Register
              </h2>
            </div>

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    <FaUser className="me-2 text-success" />
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <FaEnvelope className="me-2 text-success" />
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <FaLock className="me-2 text-success" />
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    <FaLock className="me-2 text-success" />
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                </div>

                <button
                  className="btn btn-success w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    "Registering..."
                  ) : (
                    <>
                      <FaUserPlus className="me-2" />
                      Register
                    </>
                  )}
                </button>

              </form>

              <hr />

              <p className="text-center">
                Already have an account?

                <Link
                  to="/login"
                  className="ms-2 fw-bold text-decoration-none"
                >
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;