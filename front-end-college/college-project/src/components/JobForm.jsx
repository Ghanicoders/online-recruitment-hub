import React, { useState } from "react";
import axios from "../api/axios";
import { getUser } from "../utils/auth"; // adjust if needed

const JobForm = () => {
  const user = getUser();
  console.log("User:", user);

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    employer: user ? { id: user.id } : null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJob((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to post a job.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/jobs", {
        ...job,
        employer: { id: user.id },
      });

      alert(`Job posted: ${res.data.title}`);

      setJob({
        title: "",
        description: "",
        location: "",
        employer: { id: user.id },
      });
    } catch (err) {
      console.error(err);
      alert("Error posting job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Post a Job</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="Enter job title"
                value={job.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Job Description
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Describe the job"
                value={job.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="form-control"
                placeholder="Job location"
                value={job.location}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
