import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaSignInAlt,
} from "react-icons/fa";

const API = "http://localhost:5000";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        formData
      );

      // Check whether the logged-in user is an admin
      if (res.data.user.role !== "admin") {
        alert("Access Denied. Admin Only.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      localStorage.setItem("admin", "true");

      alert("Admin Login Successful");

      navigate("/admin");

    } catch (err) {
      alert(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-danger text-white text-center">
              <h2>
                <FaUserShield className="me-2" />
                Admin Login
              </h2>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                >
                  <FaSignInAlt className="me-2" />
                  Admin Login
                </button>

              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;