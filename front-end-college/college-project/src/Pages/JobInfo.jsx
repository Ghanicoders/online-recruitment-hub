import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { isLoggedIn, getUser } from "../utils/auth";
import axios from "../api/axios";
import NavBar from "../Components/NavBar";

const JobInfo = () => {
  const location = useLocation();
  const job = location.state?.job;

  const [applied, setApplied] = useState(false);
  const user = isLoggedIn() ? getUser() : null;

  const handleApply = async () => {
    if (!user) {
      alert("Please log in to apply.");
      return;
    }

    if (applied) {
      alert("You have already applied for this job.");
      return;
    }

    try {
      await axios.post("/applications/", {
        job: { id: job.id },
        jobSeeker: { id: user.id },
      });
      alert("✅ Successfully applied!");
      setApplied(true);
    } catch (err) {
      console.error("Apply error:", err);
      alert("❌ Could not apply. Try again later.");
    }
  };

  if (!job) {
    return <p className="text-center mt-5">Job not found. Please go back.</p>;
  }

  return (
    <>
      <NavBar />
      <div>
        <h2>Here is job info...</h2>
      </div>
      <div className="container mt-4 mb-5">
        <h2>{job.title}</h2>
        <p className="text-muted">{job.location}</p>
        <p>{job.description}</p>
      </div>

      {/* Bottom Apply Button */}
      <div className="fixed-bottom bg-white py-3 border-top">
        <div className="container text-center">
          <button
            className="btn btn-primary w-50"
            onClick={handleApply}
            disabled={applied}
          >
            {!user ? "Login to Apply" : applied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default JobInfo;
