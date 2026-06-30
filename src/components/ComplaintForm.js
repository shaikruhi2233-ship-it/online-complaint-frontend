import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaPaperPlane,
  FaEdit,
} from "react-icons/fa";

function ComplaintForm({ editComplaint, setEditComplaint }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    complaint: "",
  });

  useEffect(() => {
    if (editComplaint) {
      setFormData({
        name: editComplaint.name || "",
        email: editComplaint.email || "",
        subject: editComplaint.subject || "",
        complaint: editComplaint.complaint || "",
      });
    }
  }, [editComplaint]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      complaint: "",
    });

    if (setEditComplaint) {
      setEditComplaint(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editComplaint) {
        await axios.put(
  `https://online-complaint-registration-production.up.railway.app/api/complaints/${editComplaint._id}`,
  formData
);
        


        alert("Complaint Updated Successfully");
      } else {
        await axios.post(
  "https://online-complaint-registration-production.up.railway.app/api/complaints",
  formData
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
              <>
                📝 Register Complaint
              </>
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

            <div className="mb-4">
              <label className="form-label">
                <FaCommentDots className="me-2 text-primary" />
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