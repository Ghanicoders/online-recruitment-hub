import React, { useState } from "react";
import axios from "../api/axios";
import NavBar from "../Components/NavBar";
import { getUser } from "../utils/auth"; // Make sure this path is correct

const JobPosting = () => {
  const user = getUser();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    employer: user ? { id: user.id } : null,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "EMPLOYER") {
      setMessage("❌ Only employers can post jobs.");
      setMessageType("danger");
      return;
    }

    try {
      await axios.post("/jobs", {
        ...job,
        employer: { id: user.id }, // Ensure correct employer ID
      });

      setMessage("✅ Job posted successfully!");
      setMessageType("success");

      setJob({
        title: "",
        description: "",
        location: "",
        employer: { id: user.id },
      });
    } catch (err) {
      console.error("Error posting job:", err);
      setMessage("❌ Failed to post job.");
      setMessageType("danger");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">Post a New Job</h2>

        {message && (
          <div className={`alert alert-${messageType}`}>{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={job.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="4"
              value={job.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={job.location}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Post Job
          </button>
        </form>
      </div>
    </>
  );
};

export default JobPosting;
