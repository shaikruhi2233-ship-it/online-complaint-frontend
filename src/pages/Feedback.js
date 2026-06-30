import React, { useState } from "react";
import { FaStar, FaPaperPlane } from "react-icons/fa";

function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitFeedback = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    alert("Thank you for your feedback!");

    setRating(0);
    setComment("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-7">

          <div className="card shadow">

            <div className="card-header bg-primary text-white text-center">
              <h3>Feedback</h3>
            </div>

            <div className="card-body">

              <form onSubmit={submitFeedback}>

                <label className="form-label">
                  Rate Our Service
                </label>

                <div className="mb-4">

                  {[1,2,3,4,5].map((star)=>(
                    <FaStar
                      key={star}
                      size={35}
                      style={{
                        cursor:"pointer",
                        color: star<=rating ? "gold" : "gray"
                      }}
                      onClick={()=>setRating(star)}
                    />
                  ))}

                </div>

                <label className="form-label">
                  Comments
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your feedback..."
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                />

                <button
                  className="btn btn-success mt-4"
                  type="submit"
                >
                  <FaPaperPlane className="me-2"/>
                  Submit Feedback
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Feedback;