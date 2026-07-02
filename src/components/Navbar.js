import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaListAlt,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Navbar on Login, Register & Admin Login pages
  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin-login"
  ) {
    return null;
  }

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    user = null;
  }

  const isAdmin = localStorage.getItem("admin") === "true";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <NavLink className="navbar-brand fw-bold" to="/home">
          Complaint System
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                <FaHome className="me-1" />
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/complaint">
                <FaClipboardList className="me-1" />
                Complaint
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/complaints">
                <FaListAlt className="me-1" />
                Complaint List
              </NavLink>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  <FaUserShield className="me-1" />
                  Admin Dashboard
                </NavLink>
              </li>
            )}

          </ul>

          <span className="text-white ms-3 me-3">
            {isAdmin
              ? "Welcome, Admin"
              : user
              ? `Welcome, ${user.name}`
              : ""}
          </span>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;