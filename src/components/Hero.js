import React from "react";
import { FaClipboardList } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero-section">

      <div className="container">

        <div className="row align-items-center">

          {/* Left Side */}

          <div className="col-lg-6">

            <h1>
              Online Complaint
              <br />
              Management System
            </h1>

            <p className="mt-4">
              Register your complaints quickly and track
              their progress anytime, anywhere.
            </p>

            <div className="mt-4">

              <a
                href="#complaint-form"
                className="btn btn-warning btn-lg"
              >
                Register Complaint
              </a>

              <a
                href="#complaint-list"
                className="btn btn-outline-light btn-lg"
              >
                View Complaints
              </a>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 text-center">

            <div className="hero-icon">

              <FaClipboardList
                size={220}
                color="white"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;