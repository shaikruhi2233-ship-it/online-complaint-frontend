import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer mt-5" id="footer">
      <div className="container">

        <div className="row">

          {/* Project */}

          <div className="col-md-4 mb-4">

            <h4>Complaint Portal</h4>

            <p>
              Online Complaint Management System
              developed using MERN Stack for
              MCA Final Project.
            </p>

          </div>

          {/* Contact */}

          <div className="col-md-4 mb-4">

            <h4>Contact</h4>

            <p>
              <FaEnvelope className="me-2" />
              support@complaintportal.com
            </p>

            <p>
              <FaPhoneAlt className="me-2" />
              +91 9876543210
            </p>

            <p>
              <FaMapMarkerAlt className="me-2" />
              Andhra Pradesh, India
            </p>

          </div>

          {/* Social */}

          <div className="col-md-4 mb-4">

            <h4>Follow Us</h4>

            <a href="/" className="social-icon">
              <FaGithub />
            </a>

            <a href="/" className="social-icon">
              <FaLinkedin />
            </a>

          </div>

        </div>

        <hr />

        <p className="text-center mb-0">
          © 2026 Online Complaint Management System
          | Developed by Ruhi
        </p>

      </div>
    </footer>
  );
}

export default Footer;