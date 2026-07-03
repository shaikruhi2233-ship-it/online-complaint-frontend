import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaPaperPlane,
  FaEdit,
  FaMapMarkerAlt,
} from "react-icons/fa";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function ComplaintForm({ editComplaint, setEditComplaint }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    category: "",
    subject: "",
    location: "",
    complaint: "",
  });

  useEffect(() => {
    if (editComplaint) {
      setFormData({
        name: editComplaint.name || "",
        email: editComplaint.email || "",
        mobile: editComplaint.mobile || "",
        category: editComplaint.category || "",
        subject: editComplaint.subject || "",
        location: editComplaint.location || "",
        complaint: editComplaint.complaint || "",
      });
    }
  }, [editComplaint]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      category: "",
      subject: "",
      location: "",
      complaint: "",
    });

    if (setEditComplaint) {
      setEditComplaint(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      if (editComplaint) {
        await axios.put(
          `${API_URL}/complaints/${editComplaint._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Complaint Updated Successfully");
      } else {
        await axios.post(
          `${API_URL}/complaints`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Complaint Submitted Successfully");
      }

      clearForm();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white text-center">
          <h3>
            {editComplaint ? (
              <>
                <FaEdit className="me-2" />
                Update Complaint
              </>
            ) : (
              <>📝 Register Complaint</>
            )}
          </h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2 text-primary" />
                Full Name
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
                <FaEnvelope className="me-2 text-primary" />
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
                📱 Mobile Number
              </label>

              <input
                type="tel"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                📂 Complaint Category
              </label>

              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Internet">Internet</option>
                <option value="Hostel">Hostel</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaTag className="me-2 text-primary" />
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
                <FaMapMarkerAlt className="me-2 text-danger" />
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

            <div className="mb-4">
              <label className="form-label">
                <FaCommentDots className="me-2 text-primary" />
                Complaint
              </label>

              <textarea
                rows="5"
                className="form-control"
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success me-3"
              >
                <FaPaperPlane className="me-2" />
                {editComplaint
                  ? "Update Complaint"
                  : "Submit Complaint"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearForm}
              >
                Clear
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;