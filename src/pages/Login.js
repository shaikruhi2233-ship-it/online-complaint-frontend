import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    setLoading(true);

    try {
      const res = await axios.post(
        "https://online-complaint-registration-production.up.railway.app/api/auth/login",
        formData
      );

      // Save Token
      localStorage.setItem("token", res.data.token);

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      navigate("/home");

    } catch (error) {
      console.log("Login Error:", error);

      if (error.response) {
        console.log("Response:", error.response.data);
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">

              <h2>
                <FaSignInAlt className="me-2" />
                Login
              </h2>

            </div>

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    <FaEnvelope className="me-2 text-primary" />
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

                <div className="mb-4">

                  <label className="form-label">
                    <FaLock className="me-2 text-primary" />
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

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    "Logging in..."
                  ) : (
                    <>
                      <FaSignInAlt className="me-2" />
                      Login
                    </>
                  )}
                </button>

              </form>

              <hr />

              <p className="text-center">

                Don't have an account?

                <Link
                  to="/register"
                  className="ms-2 text-decoration-none fw-bold"
                >
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;