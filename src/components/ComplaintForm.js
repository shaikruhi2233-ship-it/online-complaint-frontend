import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaList,
  FaTag,
  FaMapMarkerAlt,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";

const API = "http://localhost:5000/api";

function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    category: "",
    subject: "",
    location: "",
    complaint: "",
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
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/complaints`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Submitted Successfully!");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        category: "",
        subject: "",
        location: "",
        complaint: "",
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to submit complaint."
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>
            <FaPaperPlane className="me-2" />
            Register Complaint
          </h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2" />
                Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaEnvelope className="me-2" />
                Email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaPhone className="me-2" />
                Mobile
              </label>

              <input
                type="text"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaList className="me-2" />
                Category
              </label>

              <select
                className="form-control"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option>Water Supply</option>
                <option>Electricity</option>
                <option>Roads</option>
                <option>Drainage</option>
                <option>Sanitation</option>
                <option>Others</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaTag className="me-2" />
                Subject
              </label>

              <input
                type="text"
                className="form-control"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaMapMarkerAlt className="me-2" />
                Location
              </label>

              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaCommentDots className="me-2" />
                Complaint
              </label>

              <textarea
                className="form-control"
                rows="5"
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              <FaPaperPlane className="me-2" />
              Submit Complaint
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default ComplaintForm;